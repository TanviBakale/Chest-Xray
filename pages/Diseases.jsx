import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { BsSearch, BsExclamationTriangle, BsShieldCheck, BsInfoCircle } from 'react-icons/bs'
import LoadingSpinner from '../components/LoadingSpinner'

const severityColors = {
  'None': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  'Low': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'Moderate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  'Moderate to High': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  'High': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  'Variable': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
}

export default function Diseases() {
  const [diseases, setDiseases] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    axios.get('/api/diseases')
      .then(({ data }) => setDiseases(data))
      .catch(() => setDiseases([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = diseases.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Chest Disease Information
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Comprehensive information about chest conditions detectable through X-ray analysis
          </p>

          <div className="relative max-w-md mx-auto">
            <BsSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search diseases..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
            />
          </div>
        </motion.div>

        {loading ? (
          <LoadingSpinner text="Loading disease information..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((disease, idx) => (
              <motion.div
                key={disease.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelected(selected?.name === disease.name ? null : disease)}
                className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 card-hover ${
                  selected?.name === disease.name
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                    : 'border-gray-200/50 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 hover:border-primary-300 dark:hover:border-primary-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {disease.name}
                  </h3>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${severityColors[disease.severity] || severityColors.Moderate}`}>
                    {disease.severity}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                  {disease.description}
                </p>

                <AnimatePresence>
                  {selected?.name === disease.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4 overflow-hidden"
                    >
                      {disease.common_symptoms?.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                            <BsExclamationTriangle className="w-4 h-4 mr-1.5 text-amber-500" />
                            Symptoms
                          </h4>
                          <ul className="list-disc list-inside space-y-1">
                            {disease.common_symptoms.map((s, i) => (
                              <li key={i} className="text-sm text-gray-600 dark:text-gray-400">{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {disease.treatment && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                            <BsShieldCheck className="w-4 h-4 mr-1.5 text-green-500" />
                            Treatment
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{disease.treatment}</p>
                        </div>
                      )}

                      {disease.risk_factors?.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                            <BsInfoCircle className="w-4 h-4 mr-1.5 text-primary-500" />
                            Risk Factors
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {disease.risk_factors.map((rf, i) => (
                              <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                {rf}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
