import { motion } from 'framer-motion'
import { Shield, Package, ArchiveRestore, Image, DollarSign, Camera, Award, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {
  const storageSteps = [
    {
      icon: Image,
      title: '1. 攜帶威士忌至設施',
      description: '客戶安全地將威士忌酒瓶或酒桶運送到我們最先進的恆溫控制儲存設施。'
    },
    {
      icon: DollarSign,
      title: '2. 付款與協議',
      description: '現場完成付款程序並簽署數位儲存協議，確保所有條款清楚透明。'
    },
    {
      icon: Camera,
      title: '3. 拍攝與上傳',
      description: '我們的專業團隊在中性背景下拍攝每瓶威士忌，捕捉所有細節。照片將安全上傳至我們的系統。'
    },
    {
      icon: Award,
      title: '4. 生成NFT證書',
      description: '在區塊鏈上鑄造獨一無二的非同質化代幣（NFT）。此數位證書代表無可爭議的所有權證明，並分配給您。'
    }
  ]

  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat font-serif text-[#E0E0E0]"
      style={{
        backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpioAhFrUjjLd9WrbUov9SpN7yh0XavaSzY6NLz22A4EoXVLSEMDfWu1MLujo45GEclZZdTdOsffTurcHSQdO6gUAGtZ5XvPEUCU7RegxJcq92FDg2eQc7c_aUEHGXKAw21ld011k5nVbdH7Yi5HX8FcaEPvgK_rXWYMAs_YMmIuZVBSFKFFQqORMmCedvo7S_KQwbwQ45UFcrskAaRHrVEVjD5e7RQaWcBJ4M5kThlEO0r2F26a95BUvt-HWC2tLinLPoKuqEdfM')"
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative flex min-h-screen flex-col">
        
        {/* Main Content */}
        <main className="flex flex-1 justify-center py-16 px-4">
          <div className="flex w-full max-w-6xl flex-col items-center">
            
            {/* Hero Section */}
            <div className="text-center mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-bold text-[#E0E0E0] mb-4 leading-tight"
              >
                <div className="mb-2">守護您的傳承。</div>
                <div>與 CaskChain 一同窖藏您的威士忌。</div>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base md:text-lg text-[#A0A0A0] max-w-3xl mx-auto mt-4"
              >
                為您珍貴的威士忌收藏提供安全、恆溫的儲存環境，並透過區塊鏈上的 NFT 憑證驗證所有權。
              </motion.p>
              
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-transparent border border-[#333333]/30 rounded-md p-6 flex flex-col items-center text-center hover:bg-black/10 hover:border-[#f2b90d]/50 transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm"
              >
                <div className="flex items-center justify-center rounded-full bg-black/20 border border-[#333333]/50 w-16 h-16 mb-4 text-[#f2b90d] backdrop-blur-sm">
                  <Shield size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-[#E0E0E0] mb-2">安全儲存</h3>
                <p className="text-base text-[#A0A0A0]">您的珍貴酒桶儲存在我們溫控、高度安全的設施中，全天候監控，以確保最佳的熟成條件。</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-transparent border border-[#333333]/30 rounded-md p-6 flex flex-col items-center text-center hover:bg-black/10 hover:border-[#f2b90d]/50 transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm"
              >
                <div className="flex items-center justify-center rounded-full bg-black/20 border border-[#333333]/50 w-16 h-16 mb-4 text-[#f2b90d] backdrop-blur-sm">
                  <Package size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-[#E0E0E0] mb-2">區塊鏈驗證</h3>
                <p className="text-base text-[#A0A0A0]">每個酒桶都由區塊鏈上的獨特 NFT 代表，提供不可偽造、透明的所有權和來源記錄。</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-transparent border border-[#333333]/30 rounded-md p-6 flex flex-col items-center text-center hover:bg-black/10 hover:border-[#f2b90d]/50 transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm"
              >
                <div className="flex items-center justify-center rounded-full bg-black/20 border border-[#333333]/50 w-16 h-16 mb-4 text-[#f2b90d] backdrop-blur-sm">
                  <ArchiveRestore size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-[#E0E0E0] mb-2">輕鬆領取</h3>
                <p className="text-base text-[#A0A0A0]">透過我們直觀的線上平台，輕鬆管理、交易或安排您的威士忌裝瓶和運送。</p>
              </motion.div>
            </div>

            {/* How It Works Section */}
            <div className="w-full max-w-5xl mx-auto bg-transparent border border-[#333333]/20 rounded-lg p-8 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#E0E0E0]">
                  運作方式：<span className="text-[#f2b90d]">存放您的威士忌</span>
                </h2>
                <p className="text-lg text-[#A0A0A0] max-w-2xl mx-auto">
                  一個無縫且安全的流程，保護您寶貴的收藏。
                </p>
              </motion.div>

              <div className="relative mt-20">
                {/* Timeline line */}
                <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-0.5 bg-[#f2b90d]/30 hidden md:block"></div>
                
                <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                  {storageSteps.map((step, index) => {
                    const Icon = step.icon
                    const isLeft = index % 2 === 0
                    return (
                      <motion.div
                        key={step.title}
                        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className={`flex items-start gap-6 ${!isLeft ? 'md:ml-auto' : ''} ${index % 2 === 1 ? 'md:col-start-2' : ''}`}
                      >
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black/20 border-2 border-[#333333]/50 backdrop-blur-sm">
                            <Icon className="w-8 h-8 text-[#f2b90d]" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#E0E0E0] mb-3 leading-tight">{step.title}</h3>
                          <p className="text-[#A0A0A0] leading-relaxed">{step.description}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="w-full max-w-4xl mx-auto text-center mt-16 bg-transparent border border-[#333333]/20 rounded-lg p-8 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#E0E0E0]">
                  準備開始您的<span className="text-[#f2b90d]">威士忌收藏之旅</span>？
                </h2>
                <p className="text-xl text-[#A0A0A0] mb-8 max-w-2xl mx-auto">
                  加入CaskChain，體驗最專業的威士忌倉儲服務
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link 
                    to="/upload" 
                    className="bg-[#f2b90d] text-[#121212] py-3 px-8 rounded-md font-semibold hover:bg-[#E0A80C] transition-colors duration-300 flex items-center"
                  >
                    立即開始
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <Link 
                    to="/gallery" 
                    className="bg-[#333333] text-[#E0E0E0] py-3 px-8 rounded-md font-medium hover:bg-[#444444] transition-colors duration-300"
                  >
                    查看更多
                  </Link>
                </div>
              </motion.div>
            </div>

          </div>
        </main>

      </div>

      {/* Custom CSS for additional styling */}
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            font-family: 'Noto Serif', serif;
          }
        `
      }} />
      
    </div>
  )
}

export default Home