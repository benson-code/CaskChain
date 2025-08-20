import axios from 'axios'
import type { WhiskeyItem, NFTCertificate, User } from '@/types'

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.caskchain.com' 
  : 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for authentication
api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('caskchain_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('caskchain_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const whiskeyApi = {
  // Get all whiskeys
  getAll: async (params?: {
    search?: string
    category?: string
    region?: string
    sortBy?: string
    page?: number
    limit?: number
  }) => {
    const response = await api.get<{ data: WhiskeyItem[], total: number }>('/whiskeys', { params })
    return response.data
  },

  // Get whiskey by ID
  getById: async (id: string) => {
    const response = await api.get<{ data: WhiskeyItem }>(`/whiskeys/${id}`)
    return response.data.data
  },

  // Create new whiskey application
  create: async (data: Omit<WhiskeyItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post<{ data: WhiskeyItem }>('/whiskeys', data)
    return response.data.data
  },

  // Update whiskey
  update: async (id: string, data: Partial<WhiskeyItem>) => {
    const response = await api.put<{ data: WhiskeyItem }>(`/whiskeys/${id}`, data)
    return response.data.data
  },

  // Delete whiskey
  delete: async (id: string) => {
    await api.delete(`/whiskeys/${id}`)
  },

  // Upload images
  uploadImages: async (whiskeyId: string, files: File[]) => {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`image_${index}`, file)
    })
    
    const response = await api.post<{ data: { urls: string[] } }>(
      `/whiskeys/${whiskeyId}/images`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data.data.urls
  }
}

export const nftApi = {
  // Get NFT by whiskey ID
  getByWhiskeyId: async (whiskeyId: string) => {
    const response = await api.get<{ data: NFTCertificate }>(`/nft/whiskey/${whiskeyId}`)
    return response.data.data
  },

  // Generate NFT for whiskey
  generate: async (whiskeyId: string) => {
    const response = await api.post<{ data: NFTCertificate }>(`/nft/generate/${whiskeyId}`)
    return response.data.data
  },

  // Get NFT metadata
  getMetadata: async (tokenId: string) => {
    const response = await api.get<{ data: NFTCertificate['metadata'] }>(`/nft/${tokenId}/metadata`)
    return response.data.data
  },

  // Verify NFT ownership
  verifyOwnership: async (tokenId: string, ownerAddress: string) => {
    const response = await api.post<{ data: { isOwner: boolean } }>('/nft/verify', {
      tokenId,
      ownerAddress
    })
    return response.data.data.isOwner
  }
}

export const userApi = {
  // Get current user
  getCurrentUser: async () => {
    const response = await api.get<{ data: User }>('/user/me')
    return response.data.data
  },

  // Update user profile
  updateProfile: async (data: Partial<User>) => {
    const response = await api.put<{ data: User }>('/user/profile', data)
    return response.data.data
  },

  // Get user's whiskey collection
  getWhiskeyCollection: async (userId: string) => {
    const response = await api.get<{ data: WhiskeyItem[] }>(`/user/${userId}/whiskeys`)
    return response.data.data
  }
}

export const adminApi = {
  // Get dashboard stats
  getStats: async () => {
    const response = await api.get<{
      data: {
        totalWhiskeys: number
        totalNFTs: number
        totalUsers: number
        pendingApplications: number
        revenueThisMonth: number
      }
    }>('/admin/stats')
    return response.data.data
  },

  // Get pending applications
  getPendingApplications: async () => {
    const response = await api.get<{ data: WhiskeyItem[] }>('/admin/applications/pending')
    return response.data.data
  },

  // Approve application
  approveApplication: async (whiskeyId: string) => {
    const response = await api.post<{ data: WhiskeyItem }>(`/admin/applications/${whiskeyId}/approve`)
    return response.data.data
  },

  // Reject application
  rejectApplication: async (whiskeyId: string, reason: string) => {
    const response = await api.post<{ data: WhiskeyItem }>(`/admin/applications/${whiskeyId}/reject`, {
      reason
    })
    return response.data.data
  },

  // Get all users
  getAllUsers: async (params?: { page?: number; limit?: number; search?: string }) => {
    const response = await api.get<{ data: User[], total: number }>('/admin/users', { params })
    return response.data
  }
}

export const authApi = {
  // Login
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post<{ 
      data: { 
        user: User
        token: string 
        refreshToken: string 
      } 
    }>('/auth/login', credentials)
    return response.data.data
  },

  // Register
  register: async (userData: { 
    name: string
    email: string
    password: string
    phone: string 
  }) => {
    const response = await api.post<{ 
      data: { 
        user: User
        token: string 
        refreshToken: string 
      } 
    }>('/auth/register', userData)
    return response.data.data
  },

  // Refresh token
  refreshToken: async (refreshToken: string) => {
    const response = await api.post<{ 
      data: { 
        token: string
        refreshToken: string 
      } 
    }>('/auth/refresh', { refreshToken })
    return response.data.data
  },

  // Logout
  logout: async () => {
    await api.post('/auth/logout')
    localStorage.removeItem('caskchain_token')
    localStorage.removeItem('caskchain_refresh_token')
  }
}

export default api