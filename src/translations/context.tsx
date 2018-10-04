import * as React from 'react'
import { Language } from './types'

export const TranslationsContext = React.createContext<Language>({
  textKeys: {},
})
