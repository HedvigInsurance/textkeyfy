import gql from 'graphql-tag'
import * as React from 'react'
import { Query } from 'react-apollo'

import { TranslationsContext } from './context'
import { TextKeys } from './types'

export enum Project {
  App = 'App',
  WebOnboarding = 'WebOnboarding',
}

interface Key {
  value: string
}

interface Translation {
  key?: Key
  text: string
}

interface Language {
  translations: Translation[]
}

interface Data {
  languages: Language[]
}

export const TRANSLATIONS_QUERY = gql`
  query TranslationsQuery($code: String!, $project: Project!) {
    languages(where: { code: $code }) {
      translations(where: { project: $project }) {
        key {
          value
        }
        text
      }
    }
  }
`

export const normalizeTranslations = (translations: Translation[]) =>
  translations.reduce((acc: TextKeys, curr: Translation) => {
    if (curr.key && curr.key.value) {
      return { ...acc, [curr.key.value]: curr.text }
    }

    return { ...acc }
  }, {})

const getTextKeys = (data?: Data) => {
  if (!data || !data.languages || !data.languages[0]) {
    return {}
  }

  return normalizeTranslations(data!.languages[0].translations)
}

export interface TranslationsProviderProps {
  code: string
  project: Project
  cachedKeys?: TextKeys
  loader?: () => React.ReactNode
}

export const TranslationsProvider: React.SFC<TranslationsProviderProps> = ({
  children,
  code,
  project,
  cachedKeys,
  loader,
}) => (
  <Query<Data, { code: string; project: Project }>
    query={TRANSLATIONS_QUERY}
    variables={{ code, project }}
  >
    {({ data, loading }) => (
      <TranslationsContext.Provider
        value={{
          textKeys: cachedKeys || getTextKeys(data),
        }}
      >
        {loading ? (loader ? loader() : null) : children}
      </TranslationsContext.Provider>
    )}
  </Query>
)
