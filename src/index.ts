export const getPlaceholderRegex = () => /({[a-zA-Z0-9_]+})/g
export const getPlaceholderKeyRegex = () => /([a-zA-Z0-9_]+)/g

export const splitByPlaceholder = (text: string) =>
  text.split(getPlaceholderRegex()).filter(Boolean)

export const isPlaceholder = (text: string) => getPlaceholderRegex().test(text)

export type Replacements = Record<string, string | number>
export const replacePlaceholders = (
  resolvedKey: string,
  replacements?: Replacements
) => {
  if (!replacements) {
    return resolvedKey
  }
  const matches = resolvedKey
    .split(getPlaceholderRegex())
    .filter((value) => value)

  return matches
    .map((placeholder) => {
      if (!getPlaceholderKeyRegex().test(placeholder)) {
        return placeholder
      }
      const k = placeholder.match(getPlaceholderKeyRegex())![0]

      const value = replacements[k]

      return value?.toString() ?? placeholder
    })
    .join('')
}
