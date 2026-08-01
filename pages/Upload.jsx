import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import toast from 'react-hot-toast'
import { BsUpload, BsX, BsImage, BsArrowRight, BsExclamationTriangle } from 'react-icons/bs'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Upload() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onDrop = useCallback((acceptedFiles) => {
    const f = acceptedFiles[0]
    if (f) {
      setFile(f)
      setPreview(URL.createObjectURL(f))
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    maxFiles: 1,
    onDropRejected: () => toast.error('Please upload a valid image file (PNG, JPG)'),
  })

  const removeFile = () => {
    setFile(null)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
  }

  const handleSubmit = async () => {
    if (!file) {
      toast.error('Please select an image first')
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const { data } = await axios.post('/api/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      navigate('/result', { state: { result: data, imageUrl: preview } })
    } catch (err) {
      toast.error(err.response?.data?.error || 'Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Upload Chest X-Ray
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Upload a chest X-ray image for AI-powered disease classification
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8">
            <AnimatePresence mode="wait">
              {!preview ? (
                <motion.div
                  key="dropzone"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  {...getRootProps()}
                  className={`relative flex flex-col items-center justify-center p-12 md:p-20 rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
                    isDragActive
                      ? 'border-primary-500 bg-primary-500/5'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 bg-gray-50 dark:bg-gray-900/50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <motion.div
                    animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                    className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-4"
                  >
                    <BsUpload className={`w-8 h-8 ${isDragActive ? 'text-primary-500' : 'text-gray-400'}`} />
                  </motion.div>
                  {isDragActive ? (
                    <p className="text-lg font-medium text-primary-500">Drop your image here</p>
                  ) : (
                    <>
                      <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Drag & drop your X-ray image here
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">or click to browse</p>
                      <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-500/10">
                        <BsImage className="mr-2" />
                        Supported: PNG, JPG, JPEG
                      </span>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6"
                >
                  <div className="relative group">
                    <img
                      src={preview}
                      alt="X-ray preview"
                      className="w-full max-h-[500px] object-contain rounded-xl bg-gray-900/5 dark:bg-gray-900"
                    />
                    <button
                      onClick={removeFile}
                      className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/90 text-white hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <BsX className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <BsImage className="w-5 h-5 text-primary-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{file?.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file?.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={removeFile}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        Remove
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-6 py-2 rounded-lg text-sm font-semibold text-white gradient-bg hover:shadow-lg hover:shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        {loading ? 'Analyzing...' : 'Analyze Image'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-8 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 text-center"
          >
            <LoadingSpinner text="Analyzing your X-ray with AI..." />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Processing through neural network classification pipeline
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
        >
          <div className="flex items-start space-x-3">
            <BsExclamationTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              This tool is for educational and research purposes only. It should not be used as a substitute
              for professional medical diagnosis. Always consult with qualified healthcare providers.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
