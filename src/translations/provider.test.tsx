import { mount } from 'enzyme'
import * as React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import { mockNetworkWait } from '../utils/test-utils'
import { TranslationsConsumer } from './consumer'
import {
  normalizeTranslations,
  Project,
  TRANSLATIONS_QUERY,
  TranslationsProvider,
} from './provider'
import { TextKeys } from './types'

test('should normalize translations response into object', () => {
  const result: TextKeys = normalizeTranslations([
    {
      key: {
        value: 'mock',
      },
      text: 'test',
    },
  ])

  expect(result.mock).toEqual('test')
})

test("should fetch text keys if they're not provided from cache", async () => {
  const mocks = [
    {
      request: {
        query: TRANSLATIONS_QUERY,
        variables: { code: 'sv_SE', project: Project.App },
      },
      result: {
        data: {
          languages: [
            {
              __typename: 'Language',
              translations: [
                {
                  __typename: 'Translation',
                  key: {
                    __typename: 'Key',
                    value: 'FOO',
                  },
                  text: 'Bar',
                },
              ],
            },
          ],
        },
      },
    },
  ]

  const wrapper = mount(
    <MockedProvider mocks={mocks}>
      <TranslationsProvider code="sv_SE" project={Project.App}>
        <TranslationsConsumer textKey="FOO">
          {(result) => <div>{result}</div>}
        </TranslationsConsumer>
      </TranslationsProvider>
    </MockedProvider>,
  )

  expect(wrapper.find('div')).toHaveLength(0)

  await mockNetworkWait()

  wrapper.update()

  expect(wrapper.find('div').contains('Bar')).toBe(true)
})

test('should show loader while loading', async () => {
  const mocks = [
    {
      request: {
        query: TRANSLATIONS_QUERY,
        variables: { code: 'sv_SE', project: Project.App },
      },
      result: {
        data: {
          languages: [
            {
              __typename: 'Language',
              translations: [
                {
                  __typename: 'Translation',
                  key: {
                    __typename: 'Key',
                    value: 'FOO',
                  },
                  text: 'Bar',
                },
              ],
            },
          ],
        },
      },
    },
  ]

  const wrapper = mount(
    <MockedProvider mocks={mocks}>
      <TranslationsProvider
        code="sv_SE"
        project={Project.App}
        loader={() => <>loading...</>}
      >
        <TranslationsConsumer textKey="FOO">
          {(result) => <div>{result}</div>}
        </TranslationsConsumer>
      </TranslationsProvider>
    </MockedProvider>,
  )

  expect(wrapper.text()).toBe('loading...')

  await mockNetworkWait()

  wrapper.update()

  expect(wrapper.find('div').contains('Bar')).toBe(true)
})
