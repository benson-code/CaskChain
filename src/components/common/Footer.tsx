import { Wine, Shield, Globe, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-dark-800 border-t border-dark-700/50 mt-16">
      <div className="max-width section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center">
                <Wine className="w-6 h-6 text-dark-900" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold gradient-text">
                  CaskChain
                </h3>
                <p className="text-sm text-gray-400">威士忌倉儲NFT平台</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              專業威士忌倉儲服務，結合區塊鏈NFT技術，為您的珍藏威士忌提供最安全可靠的保存方案。
              每一瓶威士忌都有獨一無二的數位憑證，保障您的收藏價值。
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-gold-400" />
                <span>區塊鏈保障</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Globe className="w-4 h-4 text-gold-400" />
                <span>全球服務</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">服務項目</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-gold-400 cursor-pointer transition-colors">威士忌倉儲</li>
              <li className="hover:text-gold-400 cursor-pointer transition-colors">NFT憑證生成</li>
              <li className="hover:text-gold-400 cursor-pointer transition-colors">收藏管理</li>
              <li className="hover:text-gold-400 cursor-pointer transition-colors">價值評估</li>
              <li className="hover:text-gold-400 cursor-pointer transition-colors">保險服務</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">聯絡資訊</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gold-400" />
                <span>info@caskchain.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gold-400" />
                <span>www.caskchain.com</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="font-medium text-white mb-2 text-sm">倉儲地點</h5>
              <p className="text-xs text-gray-400 leading-relaxed">
                台北市信義區<br />
                專業恆溫恆濕倉庫<br />
                24小時安全監控
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-dark-700/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-500">
            © 2024 CaskChain. 版權所有。
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <span className="hover:text-gold-400 cursor-pointer transition-colors">隱私政策</span>
            <span className="hover:text-gold-400 cursor-pointer transition-colors">服務條款</span>
            <span className="hover:text-gold-400 cursor-pointer transition-colors">聯絡我們</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer