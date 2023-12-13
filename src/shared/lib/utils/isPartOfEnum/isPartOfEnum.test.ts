import { isPartOfEnum } from './isPartOfEnum'

enum TestEnum {
  A = 'A',
  B = 'B',
  C = 'C',
}

describe('isPartOfEnum.test', () => {
  test('Simple isPartOfEnum.test', () => {
    const result = isPartOfEnum('A', TestEnum)
    expect(result).toBeTruthy()
  })

  test('False isPartOfEnum.test', () => {
    const result = isPartOfEnum('D', TestEnum)
    expect(result).toBeFalsy()
  })
})
