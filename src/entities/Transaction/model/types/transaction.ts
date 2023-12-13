import { Currency } from 'shared/types/common'

export interface Transaction {
  id: string
  provider: string
  currency: Currency
  meta: unknown
  amount: number
  status: TransactionStatus
  type: 'SUBSCRIPTION'
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
