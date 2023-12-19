import React, { ErrorInfo, ReactNode, Suspense } from 'react'

import { Spinner } from 'shared/ui/Spinner/Spinner'

interface ErrorBoundryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<
  ErrorBoundryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo)
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props
    if (hasError) {
      return (
        <Suspense fallback={<Spinner />}>
          <div>An error occured. Please try again later.</div>
        </Suspense>
      )
    }
    return children
  }
}

export default ErrorBoundary
