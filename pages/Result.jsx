import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BsArrowLeft, BsShieldCheck, BsExclamationTriangle, BsInfoCircle, BsArrowRight } from 'react-icons/bs'

const severityColors = {
  None: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  'Low': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'Moderate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  'High': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  'Variable': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
}

export default function Result() {
  const location = useLocation()
  const { result, imageUrl } = location.state || {}

  if (!result) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">No results to display.</p>
          <Link
            to="/upload"
            className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-white gradient-bg hover:shadow-lg transition-all"
          >
            Upload an X-Ray
            <BsArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    )
  }

  const severity = result.disease_info?.severity || 'Unknown'
  const severityClass = severityColors[severity] || severityColors.Moderate
  const isNormal = result.prediction === 'Normal'

  const sortedPredictions = [...result.all_predictions].sort((a, b) => b.confidence - a.confidence)
  const topPredictions = sortedPredictions.slice(0, 5)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/upload"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
          >
            <BsArrowLeft className="mr-2" /> Back to Upload
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Uploaded X-Ray</h2>
              <div className="relative">
                <img
                  src={imageUrl}
                  alt="X-ray"
                  className="w-full rounded-xl bg-gray-900/5 dark:bg-gray-900"
                />
              </div>

              <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                Processing time: {result.processing_time_ms?.toFixed(0)}ms
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Primary Diagnosis</h2>

              <div className={`p-4 rounded-xl ${isNormal ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'}`}>
                <div className="flex items-start space-x-3">
                  {isNormal ? (
                    <BsShieldCheck className="w-6 h-6 text-green-500 mt-1" />
                  ) : (
                    <BsExclamationTriangle className="w-6 h-6 text-amber-500 mt-1" />
                  )}
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {result.prediction}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Confidence: <span className="font-semibold">{(result.confidence * 100).toFixed(1)}%</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">Severity: </span>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${severityClass}`}>
                  {severity}
                </span>
              </div>

              {!isNormal && result.disease_info?.description && (
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {result.disease_info.description}
                </p>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Predictions</h2>
              <div className="space-y-3">
                {topPredictions.map((pred, idx) => (
                  <div
                    key={pred.condition}
                    className={`p-3 rounded-xl ${
                      idx === 0
                        ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                        : 'bg-gray-50 dark:bg-gray-900/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${idx === 0 ? 'text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>
                        {pred.condition}
                      </span>
                      <span className={`text-xs font-semibold ${idx === 0 ? 'text-primary-600' : 'text-gray-500'}`}>
                        {(pred.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(pred.confidence * 100).toFixed(1)}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className={`h-full rounded-full ${
                          idx === 0
                            ? 'bg-gradient-to-r from-primary-500 to-primary-400'
                            : 'bg-gray-400 dark:bg-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {!isNormal && result.disease_info && (
              <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  <BsInfoCircle className="inline w-5 h-5 mr-2 text-primary-500" />
                  Disease Information
                </h2>

                <div className="space-y-4">
                  {result.disease_info.common_symptoms?.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Common Symptoms</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {result.disease_info.common_symptoms.map((s, i) => (
                          <li key={i} className="text-sm text-gray-600 dark:text-gray-400">{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.disease_info.treatment && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Treatment</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{result.disease_info.treatment}</p>
                    </div>
                  )}

                  {result.disease_info.risk_factors?.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Risk Factors</h3>
                      <div className="flex flex-wrap gap-2">
                        {result.disease_info.risk_factors.map((rf, i) => (
                          <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            {rf}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
