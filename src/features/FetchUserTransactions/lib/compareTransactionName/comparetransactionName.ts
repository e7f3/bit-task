import { TransactionType } from 'entities/Transaction'

export function compareTransactionName(type: TransactionType) {
  switch (type) {
    case TransactionType.REPLENISH:
      return 'Пополнение'
    case TransactionType.WRITE_OFF:
      return 'Списание'
    case TransactionType.SUBSCRIPTION:
      return 'Подписка'
    default:
      return 'Неизвестно'
  }
}
