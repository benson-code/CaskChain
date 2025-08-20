import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload as UploadIcon, Camera, User, Info, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface FormData {
  // Whiskey Info
  name: string
  brand: string
  age: number | ''
  vintage: number | ''
  region: string
  category: string
  alcoholContent: number | ''
  volume: number | ''
  description: string
  estimatedValue: number | ''
  
  // Owner Info  
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  
  // Storage Info
  condition: string
  notes: string
  
  // Images
  images: File[]
}

const Upload = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    brand: '',
    age: '',
    vintage: '',
    region: '',
    category: '',
    alcoholContent: '',
    volume: '',
    description: '',
    estimatedValue: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    condition: 'Excellent',
    notes: '',
    images: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = ['Single Malt', 'Blended', 'Bourbon', 'Rye', 'Irish', 'Japanese']
  const regions = ['Speyside', 'Highlands', 'Islay', 'Lowlands', 'Campbeltown', 'Japan', 'Ireland', 'Kentucky', 'Tennessee', 'Other']
  const conditions = ['Excellent', 'Good', 'Fair']

  const steps = [
    { number: 1, title: '威士忌資訊', icon: Info },
    { number: 2, title: '擁有者資訊', icon: User },
    { number: 3, title: '照片上傳', icon: Camera },
    { number: 4, title: '確認送出', icon: CheckCircle }
  ]

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 5) // 限制5張圖片
    }))
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.brand && formData.category && formData.region
      case 2:
        return formData.ownerName && formData.ownerEmail && formData.ownerPhone
      case 3:
        return formData.images.length > 0
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    } else {
      toast.error('請填寫所有必填欄位')
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // 模擬API呼叫
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('威士忌上傳成功！工作人員將盡快處理您的申請。')
      // 重設表單或導航到成功頁面
    } catch (error) {
      toast.error('上傳失敗，請稍後再試')
    } finally {
      setIsSubmitting(false)
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
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-white">威士忌</span>
            <span className="gradient-text">存放申請</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            請填寫以下資訊，我們的專業團隊將為您的威士忌進行安全存放
          </p>
        </motion.div>

        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => {
                const isActive = currentStep === step.number
                const isCompleted = currentStep > step.number
                return (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive ? 'bg-gold-500/20 text-gold-400' : 
                      isCompleted ? 'bg-green-500/20 text-green-400' : 
                      'bg-dark-800 text-gray-500'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isActive ? 'bg-gold-500 text-dark-900' :
                        isCompleted ? 'bg-green-500 text-white' :
                        'bg-dark-600 text-gray-400'
                      }`}>
                        {isCompleted ? <CheckCircle className="w-5 h-5" /> : step.number}
                      </div>
                      <span className="font-medium hidden sm:block">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-8 h-0.5 mx-2 ${
                        currentStep > step.number ? 'bg-green-500' : 'bg-dark-600'
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="card p-8">
            {/* Step 1: Whiskey Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Info className="w-6 h-6 mr-3 text-gold-400" />
                  威士忌基本資訊
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      威士忌名稱 *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                      placeholder="例如：Macallan 25"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      品牌 *
                    </label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                      placeholder="例如：The Macallan"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      年份
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value ? parseInt(e.target.value) : '')}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                      placeholder="25"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      釀造年份
                    </label>
                    <input
                      type="number"
                      value={formData.vintage}
                      onChange={(e) => handleInputChange('vintage', e.target.value ? parseInt(e.target.value) : '')}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                      placeholder="1995"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      產區 *
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => handleInputChange('region', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                    >
                      <option value="">選擇產區</option>
                      {regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      分類 *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                    >
                      <option value="">選擇分類</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      酒精濃度 (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.alcoholContent}
                      onChange={(e) => handleInputChange('alcoholContent', e.target.value ? parseFloat(e.target.value) : '')}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                      placeholder="43.0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      容量 (ml)
                    </label>
                    <input
                      type="number"
                      value={formData.volume}
                      onChange={(e) => handleInputChange('volume', e.target.value ? parseInt(e.target.value) : '')}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                      placeholder="700"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    描述
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-gold-500 focus:outline-none text-white resize-none"
                    placeholder="請描述這瓶威士忌的特色、來源或任何特殊說明..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    估價 (NT$)
                  </label>
                  <input
                    type="number"
                    value={formData.estimatedValue}
                    onChange={(e) => handleInputChange('estimatedValue', e.target.value ? parseInt(e.target.value) : '')}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                    placeholder="45000"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Owner Info */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <User className="w-6 h-6 mr-3 text-gold-400" />
                  擁有者資訊
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      姓名 *
                    </label>
                    <input
                      type="text"
                      value={formData.ownerName}
                      onChange={(e) => handleInputChange('ownerName', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                      placeholder="王大明"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      電子郵件 *
                    </label>
                    <input
                      type="email"
                      value={formData.ownerEmail}
                      onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                      placeholder="example@email.com"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      聯絡電話 *
                    </label>
                    <input
                      type="tel"
                      value={formData.ownerPhone}
                      onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                      placeholder="0912-345-678"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    威士忌狀態
                  </label>
                  <select
                    value={formData.condition}
                    onChange={(e) => handleInputChange('condition', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-gold-500 focus:outline-none text-white"
                  >
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>
                        {condition === 'Excellent' ? '優良' : condition === 'Good' ? '良好' : '普通'}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    備註
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-gold-500 focus:outline-none text-white resize-none"
                    placeholder="任何需要特別說明的事項..."
                  />
                </div>
              </div>
            )}

            {/* Step 3: Image Upload */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Camera className="w-6 h-6 mr-3 text-gold-400" />
                  威士忌照片上傳
                </h2>
                
                <div className="border-2 border-dashed border-dark-600 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <UploadIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg text-gray-300 mb-2">點擊上傳照片</p>
                    <p className="text-sm text-gray-500">支援 JPG、PNG 格式，最多5張照片</p>
                  </label>
                </div>
                
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-dark-700 rounded-lg overflow-hidden">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`威士忌照片 ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-gold-400" />
                  確認資訊
                </h2>
                
                <div className="bg-dark-700/50 rounded-lg p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">威士忌名稱：</span>
                      <span className="text-white">{formData.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">品牌：</span>
                      <span className="text-white">{formData.brand}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">擁有者：</span>
                      <span className="text-white">{formData.ownerName}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">聯絡電話：</span>
                      <span className="text-white">{formData.ownerPhone}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">上傳照片：</span>
                      <span className="text-white">{formData.images.length} 張</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gold-500/10 border border-gold-500/30 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-gold-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gold-400 mb-1">注意事項</h4>
                      <p className="text-sm text-gray-300">
                        提交申請後，我們的工作人員將聯絡您安排存放時間。
                        NFT憑證將在威士忌安全存放後生成。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  currentStep === 1 
                    ? 'bg-dark-700 text-gray-500 cursor-not-allowed'
                    : 'btn-secondary'
                }`}
              >
                上一步
              </button>
              
              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  className="btn-primary px-6 py-3"
                >
                  下一步
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-primary px-8 py-3 flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner w-5 h-5"></div>
                      <span>處理中...</span>
                    </>
                  ) : (
                    <>
                      <span>送出申請</span>
                      <CheckCircle className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Upload