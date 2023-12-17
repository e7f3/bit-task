import { render, screen } from '@testing-library/react'

import { SideDrawer } from './SideDrawer'

describe('Modal.test', () => {
  test('Simple Modal.test', () => {
    const testContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum labore nihil quia hic similique minima corrupti iste expedita doloremque ipsa.'
    render(<SideDrawer isOpen>{testContent}</SideDrawer>)

    expect(screen.getByTestId('side-drawer-window')).toBeInTheDocument()
  })
})
