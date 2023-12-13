export interface User {
  id: string
  email: string
  tg_id: string | null
  name: string
  password: string | null
  avatar: string | null
  role: UserRole
  created_at: string
  subscription: UserSubscription
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum UserSubscriptionPlanType {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
}

export interface UserSubscription {
  id: string
  plan_id: string
  user_id: string
  tokens: number
  additional_tokens: number
  created_at: string
  plan: UserSubscriptionPlan
}

export interface UserSubscriptionPlan {
  id: string
  type: UserSubscriptionPlanType
  price: number
  currency: string
  tokens: number
}
