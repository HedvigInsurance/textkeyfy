import * as React from 'react'

import { TranslationsContext } from './context'

import { mount } from 'enzyme'
import { MarkdownTranslation } from './markdown-translation'

it('renders correctly', () => {
  const testElement = 'foo'
  const wrapper = mount(
    <TranslationsContext.Provider
      value={{ textKeys: { mock: '# {testElement} mock' } }}
    >
      <MarkdownTranslation
        textKey="mock"
        replacements={{
          testElement,
        }}
      />
    </TranslationsContext.Provider>,
  )

  expect(wrapper.find('h1').text()).toBe('foo mock')
})

it('renders links n stuff', () => {
  const testString =
    'Genom att trycka på “Signera med BankID” godkänner jag att jag har tagit del av {preBuy}, <a href="#">hej</a> och att mina personuppgifter behandlas enligt {gdpr}.'
  const gdpr = 'good stuff'
  const wrapper = mount(
    <TranslationsContext.Provider value={{ textKeys: { mock: testString } }}>
      <MarkdownTranslation
        textKey="mock"
        replacements={{
          gdpr,
        }}
      />
    </TranslationsContext.Provider>,
  )

  expect(wrapper.find('a').text()).toBe('hej')
})
