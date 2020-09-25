import { replacePlaceholders, isPlaceholder, splitByPlaceholder } from './index'

describe('splitByPlaceholder', () => {
  it('splits by placeholder', () => {
    const text = 'foo {bar} baz'

    expect(splitByPlaceholder(text)).toEqual(['foo ', '{bar}', ' baz'])
  })

  it("doesn't split single placeholder", () => {
    const text = '{foo}'

    expect(splitByPlaceholder(text)).toEqual(['{foo}'])
  })
})

describe('isPlaceholder', () => {
  it("doesn't recognise non-placeholder", () => {
    expect(isPlaceholder('blah')).toBe(false)
  })

  it('recognises placeholder', () => {
    expect(isPlaceholder('{blah}')).toBe(true)
  })
})

describe('Replace placeholders', () => {
  it('replaces valid placeholder', () => {
    const replacements = { BAR: 'bar' }

    expect(replacePlaceholders('foo {BAR} baz', replacements)).toBe(
      'foo bar baz',
    )
  })

  it('ignores unknown placeholder', () => {
    expect(replacePlaceholders('foo {BAR} baz')).toBe('foo {BAR} baz')

    const replacements = { BAR: 'bar' }
    expect(replacePlaceholders('foo {NOT_BAR} baz', replacements)).toBe(
      'foo {NOT_BAR} baz',
    )
  })
})
