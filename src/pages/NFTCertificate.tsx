import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Share2, Eye, Shield, Copy, ExternalLink, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

const NFTCertificate = () => {
  const { id: _id } = useParams()
  const [copied, setCopied] = useState(false)

  // Mock NFT data
  const nft = {
    tokenId: '001234',
    contractAddress: '0x742d35Cc6473d8b5b5a3f7e7b7b7d7d7d7d7d7d7',
    whiskeyId: '1',
    owner: '0x1234567890123456789012345678901234567890',
    metadata: {
      name: 'The Macallan 25 Years Old Certificate',
      description: '這是一張獨一無二的威士忌存放憑證，證明 The Macallan 25 Years Old 威士忌已安全存放於 CaskChain 專業倉儲中心。此 NFT 憑證具有法律效力，是您威士忌所有權的數位證明。',
      image: '/api/placeholder/600/600',
      attributes: [
        { trait_type: '威士忌名稱', value: 'The Macallan 25 Years Old' },
        { trait_type: '品牌', value: 'The Macallan' },
        { trait_type: '年份', value: '25' },
        { trait_type: '產區', value: 'Speyside, Scotland' },
        { trait_type: '酒精濃度', value: '43.0%' },
        { trait_type: '容量', value: '700ml' },
        { trait_type: '存放日期', value: '2024-01-15' },
        { trait_type: '存放位置', value: 'A區-01架-15號' },
        { trait_type: '狀態', value: 'Excellent' },
        { trait_type: '稀有度', value: 'Legendary' }
      ]
    },
    transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    createdAt: '2024-01-20T14:20:00Z',
    blockNumber: 19234567,
    network: 'Ethereum Mainnet'
  }

  const whiskey = {
    name: 'The Macallan 25 Years Old',
    brand: 'The Macallan',
    estimatedValue: 450000
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('已複製到剪貼板')
    setTimeout(() => setCopied(false), 2000)
  }

  const openEtherscan = () => {
    window.open(`https://etherscan.io/tx/${nft.transactionHash}`, '_blank')
  }

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
          <Link to={`/whiskey/${nft.whiskeyId}`} className="btn-ghost flex items-center space-x-2 w-fit">
            <ArrowLeft className="w-5 h-5" />
            <span>返回威士忌詳情</span>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* NFT Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="card p-8">
              <div className="aspect-square bg-gradient-to-br from-purple-900/30 via-gold-900/30 to-purple-900/30 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* NFT Certificate Design */}
                <div className="absolute inset-4 border-2 border-gold-400/50 rounded-xl"></div>
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                  <div className="text-gold-400 font-bold text-sm">CASKCHAIN</div>
                  <div className="text-purple-400 font-bold text-sm">NFT #{nft.tokenId}</div>
                </div>
                
                <div className="text-center space-y-4 z-10">
                  <div className="text-6xl animate-float">🥃</div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    威士忌數位憑證
                  </h3>
                  <p className="text-gold-400 font-semibold">
                    {whiskey.name}
                  </p>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <div className="text-white text-sm opacity-80">
                    安全存放於 CaskChain
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(nft.createdAt).toLocaleDateString('zh-TW')}
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-12 right-12 w-16 h-16 border border-gold-400 rounded-full"></div>
                  <div className="absolute bottom-12 left-12 w-12 h-12 border border-purple-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => copyToClipboard(window.location.href)}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>分享</span>
              </button>
              <button className="btn-primary flex items-center justify-center space-x-2">
                <Download className="w-4 h-4" />
                <span>下載憑證</span>
              </button>
            </div>
          </motion.div>

          {/* NFT Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-purple-400" />
                <h1 className="text-3xl font-display font-bold text-white">
                  NFT威士忌憑證
                </h1>
              </div>
              
              <h2 className="text-2xl font-bold gradient-text mb-2">
                {nft.metadata.name}
              </h2>
              
              <p className="text-gray-400 leading-relaxed mb-6">
                {nft.metadata.description}
              </p>
            </div>

            {/* Contract Info */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-white mb-4">合約資訊</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Token ID</span>
                    <button
                      onClick={() => copyToClipboard(nft.tokenId)}
                      className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <span className="font-mono">#{nft.tokenId}</span>
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">合約地址</span>
                    <button
                      onClick={() => copyToClipboard(nft.contractAddress)}
                      className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <span className="font-mono text-sm">
                        {nft.contractAddress.slice(0, 6)}...{nft.contractAddress.slice(-4)}
                      </span>
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">交易雜湊</span>
                    <button
                      onClick={openEtherscan}
                      className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <span className="font-mono text-sm">
                        {nft.transactionHash.slice(0, 6)}...{nft.transactionHash.slice(-4)}
                      </span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-dark-600">
                  <div>
                    <span className="text-gray-400 text-sm">區塊編號</span>
                    <div className="text-white font-mono">{nft.blockNumber.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">網路</span>
                    <div className="text-white">{nft.network}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Attributes */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-white mb-4">憑證屬性</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {nft.metadata.attributes.map((attr, index) => (
                  <div key={index} className="bg-dark-700/50 rounded-lg p-3">
                    <div className="text-gray-400 text-sm mb-1">{attr.trait_type}</div>
                    <div className="text-white font-semibold">{attr.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner Info */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-white mb-4">所有權資訊</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">當前擁有者</span>
                  <button
                    onClick={() => copyToClipboard(nft.owner)}
                    className="flex items-center space-x-2 text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    <span className="font-mono text-sm">
                      {nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}
                    </span>
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">鑄造時間</span>
                  <span className="text-white">
                    {new Date(nft.createdAt).toLocaleString('zh-TW')}
                  </span>
                </div>
              </div>
            </div>

            {/* Verification */}
            <div className="card p-6 border border-green-500/30 bg-green-500/5">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">驗證狀態</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>NFT已成功鑄造並上鏈</span>
                </div>
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>威士忌已安全存放於指定位置</span>
                </div>
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>憑證具有法律效力</span>
                </div>
              </div>
            </div>

            {/* Related Whiskey */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-white mb-4">關聯威士忌</h3>
              <Link
                to={`/whiskey/${nft.whiskeyId}`}
                className="flex items-center space-x-4 hover:bg-dark-700/50 rounded-lg p-3 transition-colors group"
              >
                <div className="w-16 h-16 bg-dark-700 rounded-lg flex items-center justify-center text-2xl">
                  🥃
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white group-hover:text-gold-400 transition-colors">
                    {whiskey.name}
                  </h4>
                  <p className="text-gray-400">{whiskey.brand}</p>
                  <p className="text-gold-400 font-semibold">
                    NT$ {whiskey.estimatedValue.toLocaleString()}
                  </p>
                </div>
                <Eye className="w-5 h-5 text-gray-400 group-hover:text-gold-400 transition-colors" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default NFTCertificate