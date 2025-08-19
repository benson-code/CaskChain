import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Package, Users, Sparkles, Eye, Edit, Trash2, Plus } from 'lucide-react'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('pending')

  const tabs = [
    { id: 'pending', label: '待處理申請', icon: Package, count: 3 },
    { id: 'stored', label: '已存放威士忌', icon: Shield, count: 12 },
    { id: 'nft', label: 'NFT管理', icon: Sparkles, count: 8 },
    { id: 'users', label: '用戶管理', icon: Users, count: 25 }
  ]

  const pendingApplications = [
    {
      id: '1',
      whiskey: 'Macallan 25',
      owner: '王先生',
      phone: '0912-345-678',
      submitDate: '2024-03-15',
      status: 'pending_review'
    },
    {
      id: '2', 
      whiskey: 'Yamazaki 18',
      owner: '李女士',
      phone: '0987-654-321',
      submitDate: '2024-03-14',
      status: 'pending_storage'
    }
  ]

  const storedWhiskeys = [
    {
      id: '1',
      name: 'Macallan 25',
      owner: '王先生',
      location: 'A-01-15',
      storageDate: '2024-01-15',
      status: 'stored',
      nftStatus: 'generated'
    },
    {
      id: '2',
      name: 'Ardbeg Uigeadail', 
      owner: '陳先生',
      location: 'B-03-08',
      storageDate: '2024-02-20',
      status: 'stored',
      nftStatus: 'pending'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_review':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'pending_storage':
        return 'bg-blue-500/20 text-blue-400'
      case 'stored':
        return 'bg-green-500/20 text-green-400'
      case 'generated':
        return 'bg-purple-500/20 text-purple-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending_review':
        return '待審核'
      case 'pending_storage':
        return '待存放'
      case 'stored':
        return '已存放'
      case 'generated':
        return '已生成'
      case 'pending':
        return '待生成'
      default:
        return '未知'
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
            <span className="text-white">後台</span>
            <span className="gradient-text">管理中心</span>
          </h1>
          <p className="text-xl text-gray-400">
            管理威士忌存放申請、NFT憑證生成與用戶資料
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gold-500 text-dark-900 shadow-lg'
                      : 'bg-dark-800 text-gray-400 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    isActive ? 'bg-dark-900/20 text-dark-900' : 'bg-gold-500/20 text-gold-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Pending Applications */}
          {activeTab === 'pending' && (
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Package className="w-6 h-6 mr-3 text-gold-400" />
                待處理申請
              </h2>
              
              <div className="space-y-4">
                {pendingApplications.map((app) => (
                  <div key={app.id} className="bg-dark-700/50 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="text-xl font-bold text-white">{app.whiskey}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                            {getStatusText(app.status)}
                          </span>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
                          <div>擁有者：<span className="text-white">{app.owner}</span></div>
                          <div>聯絡電話：<span className="text-white">{app.phone}</span></div>
                          <div>申請日期：<span className="text-white">{app.submitDate}</span></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="btn-ghost p-2">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="btn-ghost p-2">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button className="btn-primary px-4 py-2">
                          {app.status === 'pending_review' ? '審核通過' : '安排存放'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stored Whiskeys */}
          {activeTab === 'stored' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-gold-400" />
                  已存放威士忌
                </h2>
                <button className="btn-primary flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>新增威士忌</span>
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-600">
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">威士忌</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">擁有者</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">存放位置</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">存放日期</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">NFT狀態</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {storedWhiskeys.map((whiskey) => (
                      <tr key={whiskey.id} className="border-b border-dark-700/50 hover:bg-dark-700/30">
                        <td className="py-4 px-4 text-white font-medium">{whiskey.name}</td>
                        <td className="py-4 px-4 text-gray-300">{whiskey.owner}</td>
                        <td className="py-4 px-4 text-gray-300 font-mono">{whiskey.location}</td>
                        <td className="py-4 px-4 text-gray-300">{whiskey.storageDate}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(whiskey.nftStatus)}`}>
                            {getStatusText(whiskey.nftStatus)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            {whiskey.nftStatus === 'pending' && (
                              <button className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                                生成NFT
                              </button>
                            )}
                            <button className="btn-ghost p-1">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="btn-ghost p-1">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* NFT Management */}
          {activeTab === 'nft' && (
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-gold-400" />
                NFT憑證管理
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="bg-dark-700/50 rounded-lg overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-gold-900/20 to-purple-900/20 flex items-center justify-center text-4xl">
                      🥃
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-white mb-2">Macallan 25 #{String(i + 1).padStart(6, '0')}</h3>
                      <p className="text-gray-400 text-sm mb-3">王先生的收藏</p>
                      <div className="flex items-center justify-between">
                        <span className="text-green-400 text-sm">已生成</span>
                        <button className="btn-ghost text-xs px-2 py-1">
                          查看詳情
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User Management */}
          {activeTab === 'users' && (
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Users className="w-6 h-6 mr-3 text-gold-400" />
                用戶管理
              </h2>
              
              <div className="text-center py-12 text-gray-400">
                <Users className="w-12 h-12 mx-auto mb-4" />
                <p>用戶管理功能開發中...</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Admin