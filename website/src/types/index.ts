export interface User {
  id: string
  username: string
  displayName?: string
  isAdmin: boolean
  isTrusted: boolean
  status: 'pending' | 'active' | 'disabled'
  createdAt: string
}

export interface UserProfile {
  userId: string
  bio?: string
  profilePictureUrl?: string
  backgroundPictureUrl?: string
}

export interface Post {
  id: string
  userId: string
  username: string
  displayName?: string
  profilePictureUrl?: string
  description?: string
  city: string
  country: string
  latitude?: number
  longitude?: number
  status: 'pending' | 'approved' | 'rejected'
  mediaUrls: string[]
  likeCount: number
  likedByMe: boolean
  createdAt: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface PaginatedResponse<T> {
  items: T[]
  nextCursor?: string
  hasMore: boolean
}
