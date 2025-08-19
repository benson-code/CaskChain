export interface WhiskeyItem {
  id: string
  name: string
  brand: string
  age: number
  vintage?: number
  region: string
  alcoholContent: number
  volume: number
  category: 'Single Malt' | 'Blended' | 'Bourbon' | 'Rye' | 'Irish' | 'Japanese'
  description: string
  images: string[]
  depositDate: Date
  owner: {
    name: string
    email: string
    phone: string
  }
  storageLocation: {
    zone: string
    rack: string
    position: string
  }
  condition: 'Excellent' | 'Good' | 'Fair'
  estimatedValue: number
  nftTokenId?: string
  nftContractAddress?: string
  status: 'stored' | 'pending_nft' | 'nft_generated' | 'retrieved'
  createdAt: Date
  updatedAt: Date
}

export interface NFTCertificate {
  tokenId: string
  contractAddress: string
  whiskeyId: string
  owner: string
  metadata: {
    name: string
    description: string
    image: string
    attributes: Array<{
      trait_type: string
      value: string | number
    }>
  }
  transactionHash: string
  createdAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'staff' | 'customer'
  whiskeyCollection: string[]
  nftCollection: string[]
  createdAt: Date
}

export interface StorageLocation {
  zone: string
  rack: string
  position: string
  occupied: boolean
  whiskeyId?: string
}

export interface UploadProgress {
  percentage: number
  stage: 'uploading' | 'processing' | 'complete' | 'error'
  message?: string
}

export interface BlockchainConfig {
  networkName: string
  chainId: number
  rpcUrl: string
  contractAddress: string
  explorerUrl: string
}