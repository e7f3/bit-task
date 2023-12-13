import { useEffect } from 'react'

import { fetchUsersList } from 'features/FetchUsersList'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { Users } from 'widgets/Users'

export const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsersList())
  }, [dispatch])

  return (
    <div>
      <Users />
    </div>
  )
}
