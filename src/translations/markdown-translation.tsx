import * as React from 'react'
import * as ReactMarkdown from 'react-markdown'
import { TranslationsConsumer } from './consumer'
import { placeholderKeyRegex, placeholderRegex } from './placeholder-consumer'

export interface Replacements {
  [key: string]: string | number
}

export const replaceStringPlaceholders = (
  text: string,
  replacements: Replacements,
) => {
  const matches = text.split(placeholderRegex).filter(Boolean)

  if (!matches) {
    return []
  }

  return matches.map((placeholder) => {
    if (!placeholderKeyRegex.test(placeholder)) {
      return placeholder
    }
    const key = placeholder.match(placeholderKeyRegex)![0]

    if (replacements[key]) {
      return replacements[key]
    }

    return placeholder
  })
}

interface TranslationsPlaceholderConsumerProps {
  textKey: string
  replacements: Replacements
}

export const MarkdownTranslation: React.SFC<
  TranslationsPlaceholderConsumerProps
> = ({ textKey, replacements }) => (
  <TranslationsConsumer textKey={textKey}>
    {(text) => (
      <ReactMarkdown
        source={replaceStringPlaceholders(text, replacements).join('')}
        escapeHtml={false}
      />
    )}
  </TranslationsConsumer>
)
