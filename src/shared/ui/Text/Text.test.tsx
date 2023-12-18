import { screen, render } from '@testing-library/react';

import { Text } from './Text';

describe('Text.test', () => {
  test('Simple Text.test', () => {
    render(<Text>test</Text>)
    // Test that the text is rendered
    expect(screen.getByTestId('text')).toBeInTheDocument()
  })
})
