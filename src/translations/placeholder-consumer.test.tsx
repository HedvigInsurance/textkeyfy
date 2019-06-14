import toJson from 'enzyme-to-json'
import * as React from 'react'

import { TranslationsContext } from './context'
import {
  replacePlaceholders,
  TranslationsPlaceholderConsumer,
} from './placeholder-consumer'

import { mount } from 'enzyme'

test('should replace placeholders correctly', () => {
  const TestElement = <div />

  const elementAndText = replacePlaceholders(
    {
      testElement: TestElement,
    },
    '{testElement} mock',
  )
  const elementAndTextWrapper = mount(<div>{elementAndText}</div>)

  expect(elementAndTextWrapper.containsMatchingElement(TestElement)).toBe(true)
  expect(toJson(elementAndTextWrapper)).toMatchSnapshot()

  const elementAndTextWithoutSpace = replacePlaceholders(
    {
      testElement: TestElement,
    },
    '{testElement}mock',
  )
  const elementAndTextWithoutSpaceWrapper = mount(
    <div>{elementAndTextWithoutSpace}</div>,
  )

  expect(
    elementAndTextWithoutSpaceWrapper.containsMatchingElement(TestElement),
  ).toBe(true)
  expect(toJson(elementAndTextWithoutSpaceWrapper)).toMatchSnapshot()

  const withUnmatchedIndex = replacePlaceholders(
    {
      testing: 'testing',
    },
    '{somethingelse} mock',
  )
  const withUnmatchedIndexWrapper = mount(<div>{withUnmatchedIndex}</div>)

  expect(withUnmatchedIndexWrapper.text().includes('{somethingelse}')).toBe(
    true,
  )
  expect(toJson(withUnmatchedIndexWrapper)).toMatchSnapshot()

  const TestElement2 = <div>mock</div>

  const withMultiplePlaceholders = replacePlaceholders(
    {
      testElement: TestElement,
      testElement2: TestElement2,
      testing: 'testing',
    },
    '{testElement} mock {testing} mock {testElement2}',
  )
  const withMultiplePlaceholdersWrapper = mount(
    <div>{withMultiplePlaceholders}</div>,
  )

  expect(
    withMultiplePlaceholdersWrapper.containsMatchingElement(TestElement),
  ).toBe(true)
  expect(
    withMultiplePlaceholdersWrapper.containsMatchingElement(TestElement2),
  ).toBe(true)
  expect(toJson(withMultiplePlaceholdersWrapper)).toMatchSnapshot()

  const TestElement3 = <div>mock</div>

  const withUnderscores = replacePlaceholders(
    {
      mock_key: TestElement3,
    },
    '{mock_key} foo bar baz',
  )

  const withUnderscoresWrapper = mount(<div>{withUnderscores}</div>)

  expect(withUnderscoresWrapper.containsMatchingElement(TestElement3)).toBe(
    true,
  )
  expect(toJson(withUnderscoresWrapper)).toMatchSnapshot()
})

test('it should render correctly', () => {
  const TestElement = <div />
  const wrapper = mount(
    <TranslationsContext.Provider
      value={{ textKeys: { mock: '{testElement} mock' } }}
    >
      <TranslationsPlaceholderConsumer
        textKey="mock"
        replacements={{
          testElement: TestElement,
        }}
      >
        {(nodes) => <div>{nodes}</div>}
      </TranslationsPlaceholderConsumer>
    </TranslationsContext.Provider>,
  )

  expect(wrapper.containsMatchingElement(TestElement)).toBe(true)

  expect(toJson(wrapper)).toMatchSnapshot()
})
