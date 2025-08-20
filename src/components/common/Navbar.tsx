import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Wine, Shield, Upload, BarChart3 } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: '首頁', href: '/', icon: Wine },
    { name: 'Gallery', href: '/gallery', icon: BarChart3 },
    { name: '存放威士忌', href: '/upload', icon: Upload },
    { name: '管理中心', href: '/admin', icon: Shield },
  ]

  return (
    <nav className="bg-dark-900/95 backdrop-blur-md border-b border-dark-600/20 sticky top-0 z-50">
      <div className="max-width section-padding">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center">
                <Wine className="w-6 h-6 text-dark-900" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-bold gradient-text">
                  CaskChain
                </span>
                <span className="text-xs text-gray-400 -mt-1">
                  威士忌倉儲平台
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gold-500/20 text-gold-400 shadow-lg'
                      : 'text-gray-300 hover:text-gold-400 hover:bg-dark-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-gold-400 p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#333333]/20 mt-2 pt-2"
          >
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-gold-500/20 text-gold-400'
                        : 'text-gray-300 hover:text-gold-400 hover:bg-dark-800/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar