import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WhiskeyItem, NFTCertificate, User } from '@/types'

// Auth Store
interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User, token: string) => void
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: (user, token) => {
        localStorage.setItem('caskchain_token', token)
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false
        })
      },

      logout: () => {
        localStorage.removeItem('caskchain_token')
        localStorage.removeItem('caskchain_refresh_token')
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false
        })
      },

      updateUser: (userData) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData }
          })
        }
      },

      setLoading: (loading) => set({ isLoading: loading })
    }),
    {
      name: 'caskchain-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)

// Whiskey Store
interface WhiskeyState {
  whiskeys: WhiskeyItem[]
  currentWhiskey: WhiskeyItem | null
  loading: boolean
  error: string | null
  searchTerm: string
  selectedCategory: string
  sortBy: string
  pagination: {
    page: number
    limit: number
    total: number
  }
  
  // Actions
  setWhiskeys: (whiskeys: WhiskeyItem[]) => void
  setCurrentWhiskey: (whiskey: WhiskeyItem | null) => void
  addWhiskey: (whiskey: WhiskeyItem) => void
  updateWhiskey: (id: string, updates: Partial<WhiskeyItem>) => void
  removeWhiskey: (id: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSearchTerm: (term: string) => void
  setSelectedCategory: (category: string) => void
  setSortBy: (sortBy: string) => void
  setPagination: (pagination: Partial<WhiskeyState['pagination']>) => void
  clearFilters: () => void
}

export const useWhiskeyStore = create<WhiskeyState>((set, get) => ({
  whiskeys: [],
  currentWhiskey: null,
  loading: false,
  error: null,
  searchTerm: '',
  selectedCategory: 'all',
  sortBy: 'newest',
  pagination: {
    page: 1,
    limit: 20,
    total: 0
  },

  setWhiskeys: (whiskeys) => set({ whiskeys, error: null }),
  
  setCurrentWhiskey: (whiskey) => set({ currentWhiskey: whiskey }),
  
  addWhiskey: (whiskey) => {
    const whiskeys = get().whiskeys
    set({ whiskeys: [whiskey, ...whiskeys] })
  },
  
  updateWhiskey: (id, updates) => {
    const whiskeys = get().whiskeys
    const updatedWhiskeys = whiskeys.map(w => 
      w.id === id ? { ...w, ...updates } : w
    )
    set({ whiskeys: updatedWhiskeys })
    
    // Update current whiskey if it's the one being updated
    const currentWhiskey = get().currentWhiskey
    if (currentWhiskey?.id === id) {
      set({ currentWhiskey: { ...currentWhiskey, ...updates } })
    }
  },
  
  removeWhiskey: (id) => {
    const whiskeys = get().whiskeys
    set({ whiskeys: whiskeys.filter(w => w.id !== id) })
    
    // Clear current whiskey if it's the one being removed
    const currentWhiskey = get().currentWhiskey
    if (currentWhiskey?.id === id) {
      set({ currentWhiskey: null })
    }
  },
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  
  setSortBy: (sortBy) => set({ sortBy }),
  
  setPagination: (pagination) => {
    const currentPagination = get().pagination
    set({ pagination: { ...currentPagination, ...pagination } })
  },
  
  clearFilters: () => set({
    searchTerm: '',
    selectedCategory: 'all',
    sortBy: 'newest',
    pagination: { page: 1, limit: 20, total: 0 }
  })
}))

// NFT Store
interface NFTState {
  nfts: NFTCertificate[]
  currentNFT: NFTCertificate | null
  loading: boolean
  error: string | null
  mintingProgress: {
    stage: 'idle' | 'uploading' | 'minting' | 'complete' | 'error'
    message?: string
    percentage?: number
  }
  
  // Actions
  setNFTs: (nfts: NFTCertificate[]) => void
  setCurrentNFT: (nft: NFTCertificate | null) => void
  addNFT: (nft: NFTCertificate) => void
  updateNFT: (tokenId: string, updates: Partial<NFTCertificate>) => void
  removeNFT: (tokenId: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setMintingProgress: (progress: NFTState['mintingProgress']) => void
  resetMintingProgress: () => void
}

export const useNFTStore = create<NFTState>((set, get) => ({
  nfts: [],
  currentNFT: null,
  loading: false,
  error: null,
  mintingProgress: {
    stage: 'idle'
  },

  setNFTs: (nfts) => set({ nfts, error: null }),
  
  setCurrentNFT: (nft) => set({ currentNFT: nft }),
  
  addNFT: (nft) => {
    const nfts = get().nfts
    set({ nfts: [nft, ...nfts] })
  },
  
  updateNFT: (tokenId, updates) => {
    const nfts = get().nfts
    const updatedNFTs = nfts.map(n => 
      n.tokenId === tokenId ? { ...n, ...updates } : n
    )
    set({ nfts: updatedNFTs })
    
    const currentNFT = get().currentNFT
    if (currentNFT?.tokenId === tokenId) {
      set({ currentNFT: { ...currentNFT, ...updates } })
    }
  },
  
  removeNFT: (tokenId) => {
    const nfts = get().nfts
    set({ nfts: nfts.filter(n => n.tokenId !== tokenId) })
    
    const currentNFT = get().currentNFT
    if (currentNFT?.tokenId === tokenId) {
      set({ currentNFT: null })
    }
  },
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  setMintingProgress: (mintingProgress) => set({ mintingProgress }),
  
  resetMintingProgress: () => set({
    mintingProgress: { stage: 'idle' }
  })
}))

// Blockchain Store
interface BlockchainState {
  walletAddress: string | null
  isConnected: boolean
  networkId: number | null
  loading: boolean
  error: string | null
  
  // Actions
  setWalletAddress: (address: string | null) => void
  setConnected: (connected: boolean) => void
  setNetworkId: (networkId: number | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  disconnect: () => void
}

export const useBlockchainStore = create<BlockchainState>((set) => ({
  walletAddress: null,
  isConnected: false,
  networkId: null,
  loading: false,
  error: null,

  setWalletAddress: (walletAddress) => set({ walletAddress }),
  
  setConnected: (isConnected) => set({ isConnected }),
  
  setNetworkId: (networkId) => set({ networkId }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  disconnect: () => set({
    walletAddress: null,
    isConnected: false,
    networkId: null,
    error: null
  })
}))

// UI Store (for global UI state)
interface UIState {
  sidebarOpen: boolean
  theme: 'dark' | 'light'
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    timestamp: Date
    read: boolean
  }>
  
  // Actions
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'dark' | 'light') => void
  addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp' | 'read'>) => void
  markNotificationRead: (id: string) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      sidebarOpen: false,
      theme: 'dark',
      notifications: [],

      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      
      setTheme: (theme) => set({ theme }),
      
      addNotification: (notification) => {
        const notifications = get().notifications
        const newNotification = {
          ...notification,
          id: Date.now().toString(),
          timestamp: new Date(),
          read: false
        }
        set({ notifications: [newNotification, ...notifications.slice(0, 49)] }) // Keep max 50
      },
      
      markNotificationRead: (id) => {
        const notifications = get().notifications
        set({
          notifications: notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          )
        })
      },
      
      removeNotification: (id) => {
        const notifications = get().notifications
        set({ notifications: notifications.filter(n => n.id !== id) })
      },
      
      clearNotifications: () => set({ notifications: [] })
    }),
    {
      name: 'caskchain-ui',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen
      })
    }
  )
)

// Export all stores
export {
  useAuthStore,
  useWhiskeyStore,
  useNFTStore,
  useBlockchainStore,
  useUIStore
}