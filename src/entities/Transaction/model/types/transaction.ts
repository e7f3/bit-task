import { Currency } from 'shared/types/common'

export interface Transaction {
  id: string
  provider: string
  currency: Currency
  meta: unknown
  amount: number
  status: TransactionStatus
  type: TransactionType
  plan_id: string | null
  user_id: string
  referral_id: string | null
  external_id: string | null
  created_at: string
}

export enum TransactionStatus {
  FAILED = 'FAILED',
  SUCCEDED = 'SUCCEDDED',
  PENDING = 'PENDING',
}

export enum TransactionType {
  REPLENISH = 'REPLENISH',
  WRITE_OFF = 'WRITE_OFF',
  SUBSCRIPTION = 'SUBSCRIPTION',
}
