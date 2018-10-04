import * as React from 'react'
import { TranslationsContext } from './context'

interface ConsumerProps {
  children: (text: string) => React.ReactNode
  textKey: string
}

export const TranslationsConsumer: React.SFC<ConsumerProps> = ({
  children,
  textKey,
}) => (
  <TranslationsContext.Consumer>
    {({ textKeys }) => {
      return children(textKeys[textKey] || textKey)
    }}
  </TranslationsContext.Consumer>
)
