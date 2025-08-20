import { ethers } from 'ethers'
import { toast } from 'react-hot-toast'

// Smart contract ABI (simplified for demo)
const CASKCHAIN_NFT_ABI = [
  "function mintWhiskeyNFT(address to, string memory tokenURI) public returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function balanceOf(address owner) public view returns (uint256)",
  "function transferFrom(address from, address to, uint256 tokenId) public",
  "function approve(address to, uint256 tokenId) public",
  "function getApproved(uint256 tokenId) public view returns (address)",
  "function setApprovalForAll(address operator, bool approved) public",
  "function isApprovedForAll(address owner, address operator) public view returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
  "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)"
]

export interface BlockchainConfig {
  chainId: number
  chainName: string
  rpcUrl: string
  blockExplorerUrl: string
  contractAddress: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
}

// Network configurations
export const NETWORKS: Record<string, BlockchainConfig> = {
  ethereum: {
    chainId: 1,
    chainName: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    blockExplorerUrl: 'https://etherscan.io',
    contractAddress: '0x742d35Cc6473d8b5b5a3f7e7b7b7d7d7d7d7d7d7', // Replace with actual contract
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }
  },
  polygon: {
    chainId: 137,
    chainName: 'Polygon Mainnet',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorerUrl: 'https://polygonscan.com',
    contractAddress: '0x742d35Cc6473d8b5b5a3f7e7b7b7d7d7d7d7d7d7', // Replace with actual contract
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    }
  },
  goerli: { // For testing
    chainId: 5,
    chainName: 'Goerli Test Network',
    rpcUrl: 'https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    blockExplorerUrl: 'https://goerli.etherscan.io',
    contractAddress: '0x742d35Cc6473d8b5b5a3f7e7b7b7d7d7d7d7d7d7', // Replace with actual test contract
    nativeCurrency: {
      name: 'GoerliETH',
      symbol: 'ETH',
      decimals: 18
    }
  }
}

const DEFAULT_NETWORK = process.env.NODE_ENV === 'production' ? 'polygon' : 'goerli'

class BlockchainService {
  private provider: ethers.BrowserProvider | null = null
  private signer: ethers.JsonRpcSigner | null = null
  private contract: ethers.Contract | null = null
  private currentNetwork: BlockchainConfig = NETWORKS[DEFAULT_NETWORK]

  constructor() {
    this.initializeProvider()
  }

  private async initializeProvider() {
    if (typeof window !== 'undefined' && window.ethereum) {
      this.provider = new ethers.BrowserProvider(window.ethereum)
      await this.checkNetwork()
    }
  }

  async connectWallet(): Promise<string | null> {
    try {
      if (!window.ethereum) {
        toast.error('請安裝 MetaMask 錢包')
        return null
      }

      await window.ethereum.request({ method: 'eth_requestAccounts' })
      this.provider = new ethers.BrowserProvider(window.ethereum)
      this.signer = await this.provider.getSigner()
      
      const address = await this.signer.getAddress()
      await this.checkNetwork()
      
      toast.success('錢包連接成功')
      return address
    } catch (error: any) {
      console.error('Wallet connection error:', error)
      toast.error('錢包連接失敗')
      return null
    }
  }

  async checkNetwork(): Promise<boolean> {
    try {
      if (!this.provider) return false

      const network = await this.provider.getNetwork()
      const currentChainId = Number(network.chainId)

      if (currentChainId !== this.currentNetwork.chainId) {
        await this.switchNetwork()
        return false
      }

      // Initialize contract
      if (this.signer) {
        this.contract = new ethers.Contract(
          this.currentNetwork.contractAddress,
          CASKCHAIN_NFT_ABI,
          this.signer
        )
      }

      return true
    } catch (error) {
      console.error('Network check error:', error)
      return false
    }
  }

  async switchNetwork(): Promise<boolean> {
    try {
      if (!window.ethereum) return false

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${this.currentNetwork.chainId.toString(16)}` }],
      })

      return true
    } catch (error: any) {
      // If network doesn't exist, add it
      if (error.code === 4902) {
        return await this.addNetwork()
      }
      
      console.error('Network switch error:', error)
      toast.error('網路切換失敗')
      return false
    }
  }

  async addNetwork(): Promise<boolean> {
    try {
      if (!window.ethereum) return false

      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x${this.currentNetwork.chainId.toString(16)}`,
          chainName: this.currentNetwork.chainName,
          rpcUrls: [this.currentNetwork.rpcUrl],
          nativeCurrency: this.currentNetwork.nativeCurrency,
          blockExplorerUrls: [this.currentNetwork.blockExplorerUrl],
        }],
      })

      return true
    } catch (error) {
      console.error('Add network error:', error)
      toast.error('網路添加失敗')
      return false
    }
  }

  async mintNFT(_whiskeyId: string, metadata: any): Promise<string | null> {
    try {
      if (!this.contract || !this.signer) {
        toast.error('請先連接錢包')
        return null
      }

      const address = await this.signer.getAddress()
      
      // Upload metadata to IPFS (simplified - would use actual IPFS service)
      const metadataURI = await this.uploadToIPFS(metadata)
      
      toast.loading('正在生成 NFT...')

      const tx = await this.contract.mintWhiskeyNFT(address, metadataURI)
      const receipt = await tx.wait()

      // Get token ID from event logs
      const transferEvent = receipt.logs.find(
        (log: any) => log.fragment && log.fragment.name === 'Transfer'
      )
      const tokenId = transferEvent?.args?.[2]

      toast.dismiss()
      toast.success('NFT 生成成功！')
      
      return JSON.stringify({
        tokenId: tokenId?.toString(),
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber
      })
    } catch (error: any) {
      toast.dismiss()
      console.error('NFT mint error:', error)
      
      if (error.code === 'ACTION_REJECTED') {
        toast.error('交易已取消')
      } else {
        toast.error('NFT 生成失敗')
      }
      
      return null
    }
  }

  async uploadToIPFS(_metadata: any): Promise<string> {
    // This is a simplified implementation
    // In production, you would use a proper IPFS service like Pinata or IPFS HTTP API
    
    try {
      // For demo purposes, we'll simulate IPFS upload
      const ipfsHash = `QmExample${Date.now()}`
      return `ipfs://${ipfsHash}`
      
      // Real implementation would look like:
      // const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'pinata_api_key': process.env.PINATA_API_KEY,
      //     'pinata_secret_api_key': process.env.PINATA_SECRET_KEY,
      //   },
      //   body: JSON.stringify(metadata)
      // })
      // const data = await response.json()
      // return `ipfs://${data.IpfsHash}`
    } catch (error) {
      console.error('IPFS upload error:', error)
      throw new Error('Failed to upload metadata to IPFS')
    }
  }

  async getTokenOwner(tokenId: string): Promise<string | null> {
    try {
      if (!this.contract) return null
      
      const owner = await this.contract.ownerOf(tokenId)
      return owner
    } catch (error) {
      console.error('Get token owner error:', error)
      return null
    }
  }

  async getTokenURI(tokenId: string): Promise<string | null> {
    try {
      if (!this.contract) return null
      
      const uri = await this.contract.tokenURI(tokenId)
      return uri
    } catch (error) {
      console.error('Get token URI error:', error)
      return null
    }
  }

  async transferNFT(from: string, to: string, tokenId: string): Promise<boolean> {
    try {
      if (!this.contract || !this.signer) return false

      toast.loading('正在轉移 NFT...')
      
      const tx = await this.contract.transferFrom(from, to, tokenId)
      await tx.wait()
      
      toast.dismiss()
      toast.success('NFT 轉移成功')
      return true
    } catch (error: any) {
      toast.dismiss()
      console.error('NFT transfer error:', error)
      
      if (error.code === 'ACTION_REJECTED') {
        toast.error('交易已取消')
      } else {
        toast.error('NFT 轉移失敗')
      }
      
      return false
    }
  }

  getExplorerUrl(txHash: string): string {
    return `${this.currentNetwork.blockExplorerUrl}/tx/${txHash}`
  }

  getAddressUrl(address: string): string {
    return `${this.currentNetwork.blockExplorerUrl}/address/${address}`
  }

  getTokenUrl(tokenId: string): string {
    return `${this.currentNetwork.blockExplorerUrl}/token/${this.currentNetwork.contractAddress}?a=${tokenId}`
  }

  isWalletConnected(): boolean {
    return !!this.signer
  }

  async getWalletAddress(): Promise<string | null> {
    try {
      if (!this.signer) return null
      return await this.signer.getAddress()
    } catch (error) {
      return null
    }
  }
}

// Singleton instance
export const blockchainService = new BlockchainService()

// React Hook for blockchain operations
export const useBlockchain = () => {
  const connectWallet = () => blockchainService.connectWallet()
  const mintNFT = (whiskeyId: string, metadata: any) => blockchainService.mintNFT(whiskeyId, metadata)
  const transferNFT = (from: string, to: string, tokenId: string) => blockchainService.transferNFT(from, to, tokenId)
  const getTokenOwner = (tokenId: string) => blockchainService.getTokenOwner(tokenId)
  const isWalletConnected = () => blockchainService.isWalletConnected()
  const getWalletAddress = () => blockchainService.getWalletAddress()

  return {
    connectWallet,
    mintNFT,
    transferNFT,
    getTokenOwner,
    isWalletConnected,
    getWalletAddress,
    getExplorerUrl: blockchainService.getExplorerUrl.bind(blockchainService),
    getAddressUrl: blockchainService.getAddressUrl.bind(blockchainService),
    getTokenUrl: blockchainService.getTokenUrl.bind(blockchainService)
  }
}