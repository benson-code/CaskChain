import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'

// Mock data
const whiskeyData = [
  {
    id: '87654321',
    name: 'Single Malt Scotch',
    brand: 'Premium Distillery',
    type: 'Single Malt Scotch',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '12345678',
    name: 'Blended Irish Whiskey',
    brand: 'Celtic Spirits',
    type: 'Blended Irish Whiskey',
    image: 'https://images.unsplash.com/photo-1564148962-6ebcd591b8e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '98765432',
    name: 'Bourbon Whiskey',
    brand: 'Kentucky Gold',
    type: 'Bourbon Whiskey',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '23456789',
    name: 'Rye Whiskey',
    brand: 'Heritage Rye Co.',
    type: 'Rye Whiskey',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '34567890',
    name: 'Japanese Whisky',
    brand: 'Yamato Distillery',
    type: 'Japanese Whisky',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '45678901',
    name: 'Canadian Whisky',
    brand: 'Northern Spirits',
    type: 'Canadian Whisky',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
]

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('')


  const filteredWhiskeys = whiskeyData.filter(whiskey => {
    if (!searchTerm) return true
    return whiskey.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
           whiskey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           whiskey.type.toLowerCase().includes(searchTerm.toLowerCase())
  })


  return (
    <div className="min-h-screen bg-[#121212] text-[#e0e0e0]" style={{ fontFamily: '"Noto Serif", serif' }}>
      <main className="container mx-auto flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-[#e0e0e0] mb-8">CaskGallery</h1>
            
            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-[#a0a0a0]" />
                </div>
                <input
                  className="w-full pl-10 pr-4 py-3 bg-[#333333] text-[#e0e0e0] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f2b90d] focus:border-[#f2b90d]"
                  placeholder="Enter Certificate ID"
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Certificates Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredWhiskeys.map((whiskey, index) => (
                <motion.div
                  key={whiskey.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 holographic"
                >
                  <Link to={`/nft/${whiskey.id}`}>
                    <div 
                      className="h-80 w-full bg-cover bg-center" 
                      style={{ backgroundImage: `url("${whiskey.image}")` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-semibold text-[#e0e0e0]">
                        ID: {whiskey.id}
                      </h3>
                      <p className="text-base text-[#a0a0a0]">{whiskey.type}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredWhiskeys.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-[#e0e0e0] mb-2">No certificates found</h3>
                <p className="text-[#a0a0a0] mb-6">Try adjusting your search criteria</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-[#f2b90d] text-[#121212] py-2 px-4 rounded-md hover:bg-[#e0a80c] focus:outline-none focus:ring-2 focus:ring-[#f2b90d] focus:ring-opacity-50"
                >
                  Clear Search
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      
      {/* Add holographic CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .holographic::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          pointer-events: none;
          z-index: 1;
        }
        .holographic:hover::before {
          opacity: 1;
        }
        `
      }} />
    </div>
  )
}

export default Gallery