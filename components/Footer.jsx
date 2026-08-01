import { Link } from 'react-router-dom'
import { BsHeartPulse, BsGithub, BsTwitter, BsLinkedin } from 'react-icons/bs'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BsHeartPulse className="w-6 h-6 text-primary-500" />
              <span className="text-lg font-bold gradient-text">MedScan AI</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-md">
              AI-powered chest X-ray analysis platform for rapid disease classification and medical imaging assistance.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/upload', label: 'Upload X-Ray' },
                { to: '/diseases', label: 'Disease Info' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Connect</h3>
            <div className="flex space-x-3">
              {[
                { icon: BsGithub, href: '#', label: 'GitHub' },
                { icon: BsTwitter, href: '#', label: 'Twitter' },
                { icon: BsLinkedin, href: '#', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200/50 dark:border-gray-800/50">
          <p className="text-center text-sm text-gray-500 dark:text-gray-500">
            &copy; {new Date().getFullYear()} MedScan AI. All rights reserved. Not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
