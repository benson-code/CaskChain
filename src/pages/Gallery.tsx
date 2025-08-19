import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, MapPin, Calendar, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

// Mock data
const whiskeyData = [
  {
    id: '1',
    name: 'Macallan 25',
    brand: 'The Macallan',
    age: 25,
    region: 'Speyside',
    category: 'Single Malt',
    image: '/api/placeholder/400/600',
    depositDate: '2024-01-15',
    estimatedValue: 45000,
    status: 'nft_generated',
    nftTokenId: '#001234'
  },
  {
    id: '2',
    name: 'Yamazaki 18',
    brand: 'Suntory',
    age: 18,
    region: 'Japan',
    category: 'Japanese',
    image: '/api/placeholder/400/600',
    depositDate: '2024-02-10',
    estimatedValue: 38000,
    status: 'stored',
    nftTokenId: null
  },
  {
    id: '3',
    name: 'Ardbeg Uigeadail',
    brand: 'Ardbeg',
    age: 0,
    region: 'Islay',
    category: 'Single Malt',
    image: '/api/placeholder/400/600',
    depositDate: '2024-03-05',
    estimatedValue: 8500,
    status: 'nft_generated',
    nftTokenId: '#001235'
  },
  {
    id: '4',
    name: 'Hibiki 21',
    brand: 'Suntory',
    age: 21,
    region: 'Japan',
    category: 'Japanese',
    image: '/api/placeholder/400/600',
    depositDate: '2024-01-28',
    estimatedValue: 55000,
    status: 'nft_generated',
    nftTokenId: '#001236'
  }
]

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('newest')

  const categories = ['all', 'Single Malt', 'Japanese', 'Bourbon', 'Blended', 'Irish']
  const sortOptions = [
    { value: 'newest', label: '最新存放' },
    { value: 'oldest', label: '最早存放' },
    { value: 'value-high', label: '價值高到低' },
    { value: 'value-low', label: '價值低到高' },
    { value: 'name', label: '名稱排序' }
  ]

  const filteredWhiskeys = whiskeyData.filter(whiskey => {
    const matchesSearch = whiskey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         whiskey.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || whiskey.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nft_generated':
        return 'text-green-400 bg-green-400/20'
      case 'stored':
        return 'text-blue-400 bg-blue-400/20'
      case 'pending_nft':
        return 'text-yellow-400 bg-yellow-400/20'
      default:
        return 'text-gray-400 bg-gray-400/20'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'nft_generated':
        return 'NFT已生成'
      case 'stored':
        return '已存放'
      case 'pending_nft':
        return '待生成NFT'
      default:
        return '未知狀態'
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-width section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-white">威士忌</span>
            <span className="gradient-text">收藏畫廊</span>
          </h1>
          <p className="text-xl text-gray-400">
            探索我們專業倉儲的威士忌收藏，每一瓶都有其獨特的故事
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜尋威士忌名稱或品牌..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-lg focus:border-gold-500 focus:outline-none text-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg focus:border-gold-500 focus:outline-none text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? '全部分類' : category}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg focus:border-gold-500 focus:outline-none text-white"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex border border-dark-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 ${viewMode === 'grid' ? 'bg-gold-500 text-dark-900' : 'bg-dark-800 text-gray-400 hover:text-white'} transition-colors`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 ${viewMode === 'list' ? 'bg-gold-500 text-dark-900' : 'bg-dark-800 text-gray-400 hover:text-white'} transition-colors`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-gray-400">
            找到 <span className="text-gold-400 font-semibold">{filteredWhiskeys.length}</span> 瓶威士忌
          </div>
        </motion.div>

        {/* Whiskey Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWhiskeys.map((whiskey, index) => (
                <motion.div
                  key={whiskey.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card card-hover group cursor-pointer"
                >
                  <Link to={`/whiskey/${whiskey.id}`}>
                    <div className="aspect-[3/4] bg-dark-700 rounded-t-2xl overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-gold-900/20 to-gold-800/20 flex items-center justify-center">
                        <div className="text-6xl">🥃</div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-white text-lg mb-1 group-hover:text-gold-400 transition-colors">
                            {whiskey.name}
                          </h3>
                          <p className="text-gray-400 text-sm">{whiskey.brand}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(whiskey.status)}`}>
                          {getStatusText(whiskey.status)}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-400 mb-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{whiskey.region}</span>
                          {whiskey.age > 0 && <span>• {whiskey.age}年</span>}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>存放於 {whiskey.depositDate}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-gold-400 font-bold">
                          NT$ {whiskey.estimatedValue.toLocaleString()}
                        </div>
                        {whiskey.nftTokenId && (
                          <div className="flex items-center space-x-1 text-green-400 text-xs">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{whiskey.nftTokenId}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredWhiskeys.map((whiskey, index) => (
                <motion.div
                  key={whiskey.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 hover:border-gold-500/30 transition-all duration-300"
                >
                  <Link to={`/whiskey/${whiskey.id}`} className="block">
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 bg-dark-700 rounded-lg flex items-center justify-center text-2xl">
                        🥃
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-white text-xl mb-1 hover:text-gold-400 transition-colors">
                              {whiskey.name}
                            </h3>
                            <p className="text-gray-400">{whiskey.brand} • {whiskey.category}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(whiskey.status)}`}>
                            {getStatusText(whiskey.status)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-400 mb-3">
                          <span>{whiskey.region}{whiskey.age > 0 && ` • ${whiskey.age}年`}</span>
                          <span>存放於 {whiskey.depositDate}</span>
                          {whiskey.nftTokenId && (
                            <span className="text-green-400">NFT {whiskey.nftTokenId}</span>
                          )}
                        </div>
                        
                        <div className="text-gold-400 font-bold text-lg">
                          NT$ {whiskey.estimatedValue.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Empty State */}
        {filteredWhiskeys.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">找不到符合條件的威士忌</h3>
            <p className="text-gray-400 mb-6">試試調整搜尋條件或分類篩選</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="btn-ghost"
            >
              清除所有篩選
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Gallery