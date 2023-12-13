import 'app/styles/index.scss'

import { createRoot } from 'react-dom/client'

import { App } from 'app/App'
import { ErrorBoundary } from 'app/providers/ErrorBoundary'
import { StoreProvider } from 'app/providers/StoreProvider'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <StoreProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StoreProvider>,
)
