import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Calendar, Star, Shield, Eye, Download, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const WhiskeyDetail = () => {
  const { id: _id } = useParams()

  // Mock data - 實際應用中會從API獲取
  const whiskey = {
    id: '1',
    name: 'The Macallan 25 Years Old',
    brand: 'The Macallan',
    age: 25,
    vintage: 1995,
    region: 'Speyside, Scotland',
    category: 'Single Malt Scotch Whisky',
    alcoholContent: 43.0,
    volume: 700,
    description: '這款 25 年威士忌展現了 Macallan 的卓越工藝，在精選雪莉酒桶中陳年，呈現出豐富的果香和香草氣息，口感醇厚，餘韻悠長。是威士忌收藏家不可錯過的經典之作。',
    estimatedValue: 450000,
    depositDate: '2024-01-15T10:30:00Z',
    owner: {
      name: '王先生',
      email: 'wang@example.com',
      phone: '0912-345-678'
    },
    storageLocation: {
      zone: 'A區',
      rack: '01架',
      position: '15號位置'
    },
    condition: 'Excellent',
    status: 'nft_generated',
    nftTokenId: '#001234',
    nftContractAddress: '0x742d35Cc6473d8b5b5a3f7e7b7b7d7d7d7d7d7d7',
    images: ['/api/placeholder/600/800', '/api/placeholder/600/800', '/api/placeholder/600/800'],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:20:00Z'
  }

  const attributes = [
    { label: '品牌', value: whiskey.brand },
    { label: '年份', value: `${whiskey.age} 年` },
    { label: '釀造年份', value: whiskey.vintage },
    { label: '產區', value: whiskey.region },
    { label: '分類', value: whiskey.category },
    { label: '酒精濃度', value: `${whiskey.alcoholContent}%` },
    { label: '容量', value: `${whiskey.volume}ml` },
    { label: '狀態', value: whiskey.condition === 'Excellent' ? '優良' : whiskey.condition },
    { label: '存放位置', value: `${whiskey.storageLocation.zone}-${whiskey.storageLocation.rack}-${whiskey.storageLocation.position}` },
    { label: '估價', value: `NT$ ${whiskey.estimatedValue.toLocaleString()}` }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="max-width section-padding">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link to="/gallery" className="btn-ghost flex items-center space-x-2 w-fit">
            <ArrowLeft className="w-5 h-5" />
            <span>返回畫廊</span>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="aspect-[3/4] bg-dark-800 rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gold-900/20 to-gold-800/20 flex items-center justify-center">
                <div className="text-8xl animate-float">🥃</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {whiskey.images.slice(1).map((_, index) => (
                <div key={index} className="aspect-square bg-dark-800 rounded-lg flex items-center justify-center text-2xl">
                  🥃
                </div>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-4xl font-display font-bold text-white">
                  {whiskey.name}
                </h1>
                {whiskey.nftTokenId && (
                  <div className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-medium">NFT已生成</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-6 text-gray-400 mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{whiskey.region}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>存放於 {new Date(whiskey.depositDate).toLocaleDateString('zh-TW')}</span>
                </div>
              </div>

              <div className="text-3xl font-bold gradient-text mb-8">
                NT$ {whiskey.estimatedValue.toLocaleString()}
              </div>
            </div>

            {/* Description */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-white mb-4">威士忌介紹</h3>
              <p className="text-gray-300 leading-relaxed">{whiskey.description}</p>
            </div>

            {/* Attributes */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-white mb-4">詳細規格</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {attributes.map((attr, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-dark-700/50 last:border-0">
                    <span className="text-gray-400">{attr.label}</span>
                    <span className="text-white font-medium">{attr.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* NFT Info */}
            {whiskey.nftTokenId && (
              <div className="card p-6 border border-purple-500/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Star className="w-6 h-6 mr-2 text-purple-400" />
                  NFT憑證資訊
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Token ID</span>
                    <span className="text-purple-400 font-mono">{whiskey.nftTokenId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">合約地址</span>
                    <span className="text-purple-400 font-mono text-sm">
                      {whiskey.nftContractAddress?.slice(0, 8)}...{whiskey.nftContractAddress?.slice(-6)}
                    </span>
                  </div>
                  <div className="flex space-x-4 pt-4">
                    <Link
                      to={`/nft/${whiskey.id}`}
                      className="btn-primary flex-1 text-center flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>查看NFT</span>
                    </Link>
                    <button className="btn-secondary flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>下載憑證</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Owner Info */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-white mb-4">擁有者資訊</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">姓名</span>
                  <span className="text-white">{whiskey.owner.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">聯絡電話</span>
                  <span className="text-white">{whiskey.owner.phone}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="btn-secondary flex-1 flex items-center justify-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>分享</span>
              </button>
              <Link to="/admin" className="btn-primary flex-1 text-center flex items-center justify-center">
                管理威士忌
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-display font-bold text-white mb-8">存放歷程</h2>
          <div className="card p-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-bold text-white">NFT憑證生成</h4>
                  <p className="text-gray-400 text-sm">2024年1月20日 14:20</p>
                  <p className="text-gray-300 mt-1">威士忌NFT憑證已成功生成並上鏈</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-bold text-white">威士忌安全存放</h4>
                  <p className="text-gray-400 text-sm">2024年1月15日 15:30</p>
                  <p className="text-gray-300 mt-1">威士忌已安全存放至A區-01架-15號位置</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-bold text-white">申請提交</h4>
                  <p className="text-gray-400 text-sm">2024年1月15日 10:30</p>
                  <p className="text-gray-300 mt-1">威士忌存放申請已提交並通過審核</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default WhiskeyDetail