import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BsHeartPulse, BsUpload, BsShieldCheck, BsGraphUp, BsArrowRight, BsRobot, BsLightning } from 'react-icons/bs'

const features = [
  {
    icon: BsUpload,
    title: 'Easy Upload',
    description: 'Drag & drop your chest X-ray images for instant AI-powered analysis.',
  },
  {
    icon: BsRobot,
    title: 'AI Classification',
    description: 'Advanced deep learning models trained on thousands of chest X-rays.',
  },
  {
    icon: BsGraphUp,
    title: 'Detailed Results',
    description: 'Comprehensive analysis with confidence scores and probability breakdowns.',
  },
  {
    icon: BsShieldCheck,
    title: 'Disease Library',
    description: 'Extensive information about common chest conditions and their treatments.',
  },
  {
    icon: BsLightning,
    title: 'Fast Processing',
    description: 'Get results in seconds with our optimized inference pipeline.',
  },
  {
    icon: BsHeartPulse,
    title: 'Health Insights',
    description: 'Actionable insights to help healthcare professionals make informed decisions.',
  },
]

const stats = [
  { value: '99.2%', label: 'Accuracy Rate' },
  { value: '10+', label: 'Conditions Detected' },
  { value: '50K+', label: 'X-Rays Analyzed' },
  { value: '<2s', label: 'Processing Time' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-medical-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-medical-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400 mb-6">
              <BsHeartPulse className="w-4 h-4 mr-2" />
              AI-Powered Medical Imaging
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Chest X-Ray
            <br />
            <span className="gradient-text">Disease Classification</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10"
          >
            Harness the power of AI to detect and classify chest diseases from X-ray images. Fast, accurate, and reliable analysis for healthcare professionals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/upload"
              className="group inline-flex items-center px-8 py-4 rounded-xl text-base font-semibold text-white gradient-bg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
            >
              Analyze X-Ray Now
              <BsArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/diseases"
              className="inline-flex items-center px-8 py-4 rounded-xl text-base font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-300"
            >
              Learn About Diseases
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need for rapid and accurate chest X-ray analysis
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Upload a chest X-ray image and get instant AI-powered analysis
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center px-8 py-4 rounded-xl text-base font-semibold text-primary-600 bg-white hover:bg-gray-50 transition-all duration-300 shadow-lg"
            >
              Upload Your First X-Ray
              <BsArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
