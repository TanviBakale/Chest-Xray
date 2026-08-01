import { motion } from 'framer-motion'
import { BsHeartPulse, BsShieldCheck, BsGraphUp, BsPeople, BsLightning, BsGlobe } from 'react-icons/bs'

const milestones = [
  { year: '2023', title: 'Project Founded', description: 'MedScan AI was conceptualized to democratize chest X-ray analysis.' },
  { year: '2024', title: 'Model Development', description: 'Trained deep learning models on diverse chest X-ray datasets.' },
  { year: '2025', title: 'Platform Launch', description: 'Launched the web platform for public access and research use.' },
  { year: '2026', title: 'Continuous Improvement', description: 'Ongoing model refinement and expansion of detectable conditions.' },
]

const values = [
  { icon: BsShieldCheck, title: 'Accuracy', description: 'Committed to high accuracy through continuous model improvement and validation.' },
  { icon: BsPeople, title: 'Accessibility', description: 'Making AI-powered medical analysis accessible to healthcare professionals worldwide.' },
  { icon: BsLightning, title: 'Speed', description: 'Optimized for rapid inference, delivering results in seconds.' },
  { icon: BsGlobe, title: 'Global Impact', description: 'Supporting healthcare delivery in underserved regions through technology.' },
]

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400 mb-4">
            <BsHeartPulse className="w-4 h-4 mr-2" />
            About MedScan AI
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Advancing Chest X-Ray Analysis with AI
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            MedScan AI is at the forefront of applying artificial intelligence to medical imaging.
            Our platform leverages state-of-the-art deep learning models to assist healthcare professionals
            in the rapid classification and analysis of chest X-ray images.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To provide healthcare professionals with a powerful, accessible AI tool that enhances
              diagnostic capabilities, reduces analysis time, and ultimately improves patient outcomes
              through earlier and more accurate disease detection.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Technology</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Built on cutting-edge convolutional neural networks trained on thousands of labeled chest X-ray
              images. Our models can detect and classify multiple thoracic conditions with high accuracy
              while providing detailed confidence scores for each prediction.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">Timeline</h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
            <div className="space-y-12">
              {milestones.map((m, idx) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
                >
                  <div className="hidden md:block w-1/2" />
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-white dark:border-gray-950" />
                  <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-8 md:pl-0`}>
                    <div className="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50">
                      <span className="text-sm font-bold text-primary-500">{m.year}</span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{m.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{m.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
