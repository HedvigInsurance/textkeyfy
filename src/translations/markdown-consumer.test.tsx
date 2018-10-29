import * as React from 'react'

import { TranslationsContext } from './context'

import { mount } from 'enzyme'
import { MarkdownConsumer } from './markdown-consumer'

test('it should render correctly', () => {
  const testElement = 'foo'
  const wrapper = mount(
    <TranslationsContext.Provider
      value={{ textKeys: { mock: '# {testElement} mock' } }}
    >
      <MarkdownConsumer
        textKey="mock"
        replacements={{
          testElement,
        }}
      >
        {(nodes) => <div>{nodes}</div>}
      </MarkdownConsumer>
    </TranslationsContext.Provider>,
  )

  expect(wrapper.find('h1').text()).toBe('foo mock')
})
