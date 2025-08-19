import { motion } from 'framer-motion'
import { Wine, Shield, Sparkles, ArrowRight, CheckCircle, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {
  const features = [
    {
      icon: Wine,
      title: '專業倉儲',
      description: '恆溫恆濕環境，24小時監控系統，確保威士忌完美保存'
    },
    {
      icon: Shield,
      title: 'NFT保障',
      description: '區塊鏈技術生成專屬NFT憑證，防偽防竄改，完全安全'
    },
    {
      icon: Sparkles,
      title: '頂級服務',
      description: 'Airbnb級別的用戶體驗，簡約優雅的操作介面'
    }
  ]

  const stats = [
    { number: '1000+', label: '威士忌收藏' },
    { number: '500+', label: '滿意客戶' },
    { number: '99.9%', label: '安全記錄' },
    { number: '24/7', label: '全天候服務' }
  ]

  const testimonials = [
    {
      name: '王先生',
      role: '威士忌收藏家',
      content: 'CaskChain讓我對收藏威士忌更有信心，NFT憑證給了我額外的保障。',
      rating: 5
    },
    {
      name: '李女士',
      role: '投資顧問',
      content: '專業的倉儲環境和區塊鏈技術，是威士忌投資的最佳選擇。',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gold-500 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold-400 rounded-full filter blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative z-10 text-center section-padding max-width">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
              <span className="text-white">頂級威士忌</span>
              <br />
              <span className="gradient-text">倉儲平台</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              結合區塊鏈NFT技術的專業威士忌倉儲服務<br />
              為您的珍藏提供最安全可靠的保存方案
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link to="/upload" className="btn-primary text-lg px-8 py-4">
                開始存放威士忌
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/gallery" className="btn-secondary text-lg px-8 py-4">
                瀏覽收藏畫廊
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-dark-800/50">
        <div className="max-width section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="gradient-text">為什麼選擇</span> CaskChain
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              我們提供業界領先的威士忌倉儲解決方案，結合最新的區塊鏈技術
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="card card-hover p-8 text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:whiskey-glow transition-all duration-300">
                    <Icon className="w-8 h-8 text-dark-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-dark-800/30">
        <div className="max-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="text-white">服務</span><span className="gradient-text">流程</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6 text-dark-900 font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-4">現場存放</h3>
              <p className="text-gray-400">攜帶威士忌至我們的專業倉儲中心，工作人員協助完成存放手續</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6 text-dark-900 font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-4">專業拍攝</h3>
              <p className="text-gray-400">工作人員進行專業拍攝，記錄威士忌的完整資訊與狀態</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6 text-dark-900 font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-4">NFT憑證</h3>
              <p className="text-gray-400">生成獨一無二的NFT憑證，作為您的數位所有權證明</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="text-white">客戶</span><span className="gradient-text">好評</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-900/20 to-gold-800/20">
        <div className="max-width section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              準備開始您的<span className="gradient-text">威士忌收藏之旅</span>？
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              加入CaskChain，體驗最專業的威士忌倉儲服務
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/upload" className="btn-primary text-lg px-8 py-4">
                立即開始
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/gallery" className="btn-ghost text-lg px-8 py-4">
                查看更多
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home