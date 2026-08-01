import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { BsSend, BsEnvelope, BsGeoAlt, BsClock } from 'react-icons/bs'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields')
      return
    }
    setSending(true)
    try {
      await axios.post('/api/contact', form)
      toast.success('Message sent successfully!')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const contactInfo = [
    { icon: BsEnvelope, label: 'Email', value: 'contact@medscan-ai.com' },
    { icon: BsGeoAlt, label: 'Location', value: 'San Francisco, CA' },
    { icon: BsClock, label: 'Response Time', value: 'Within 24 hours' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-white gradient-bg hover:shadow-lg hover:shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <BsSend className="mr-2" />
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center mb-3">
                  <info.icon className="w-5 h-5 text-primary-500" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{info.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{info.value}</p>
              </div>
            ))}

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-500/10 to-medical-500/10 dark:from-primary-500/5 dark:to-medical-500/5 border border-primary-200/50 dark:border-primary-800/50">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Emergency?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                If you are experiencing a medical emergency, please call emergency services immediately. This platform is for educational and research purposes only.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
