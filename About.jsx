import { motion } from 'framer-motion'

export default function LoadingSpinner({ text = 'Analyzing...' }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-primary-200 dark:border-primary-900 border-t-primary-500 rounded-full"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-sm font-medium text-gray-600 dark:text-gray-400"
      >
        {text}
      </motion.p>
    </div>
  )
}
