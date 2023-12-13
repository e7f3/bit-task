import { TypedUseSelectorHook, useSelector } from 'react-redux'

// from app to shared :(
// one of the variants of a work with react-redux useSelect
import { RootState } from 'app/providers/StoreProvider'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppSelector = Parameters<typeof useAppSelector>[0]
export type AppSelectorState = Parameters<AppSelector>[0]
