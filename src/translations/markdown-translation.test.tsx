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
