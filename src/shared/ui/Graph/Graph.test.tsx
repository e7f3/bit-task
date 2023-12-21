import { render, screen } from '@testing-library/react'

import { Graph } from './Graph'

const data = [{
  name: '1',
  value: 1,
}, {
  name: '2',
  value: 2,
}, {
  name: '3',
  value: 3,
}]

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

describe('Graph.test', () => {
  test('Simple Graph.test', () => {
    render(<Graph data={data} curveName='value' />)
    const graph = screen.getByTestId('graph')
    expect(graph).toBeInTheDocument()
  })
})
