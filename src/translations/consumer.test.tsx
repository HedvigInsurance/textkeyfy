import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import * as React from 'react'

import { TranslationsConsumer } from './consumer'
import { TranslationsContext } from './context'

test('should render correct text key', () => {
  const testFn = jest.fn()

  const wrapper = mount(
    <TranslationsContext.Provider value={{ textKeys: { mock: 'test' } }}>
      <>
        <TranslationsConsumer textKey="mock">
          {(text) => {
            expect(text).toEqual('test')
            testFn()

            return <></>
          }}
        </TranslationsConsumer>
      </>
    </TranslationsContext.Provider>,
  )

  expect(toJson(wrapper)).toMatchSnapshot()
  expect(testFn).toHaveBeenCalled()
})
