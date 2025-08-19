import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from './components/common/Layout'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Upload from './pages/Upload'
import Admin from './pages/Admin'
import WhiskeyDetail from './pages/WhiskeyDetail'
import NFTCertificate from './pages/NFTCertificate'

function App() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/whiskey/:id" element={<WhiskeyDetail />} />
          <Route path="/nft/:id" element={<NFTCertificate />} />
        </Routes>
      </motion.div>
    </Layout>
  )
}

export default App