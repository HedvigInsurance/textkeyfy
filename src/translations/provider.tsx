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
  key: Key
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
    acc[curr.key.value] = curr.text
    return acc
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
}

export const TranslationsProvider: React.SFC<TranslationsProviderProps> = ({
  children,
  code,
  project,
  cachedKeys,
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
        {loading ? null : children}
      </TranslationsContext.Provider>
    )}
  </Query>
)
