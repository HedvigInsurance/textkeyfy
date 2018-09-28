import { mount } from 'enzyme'
import * as React from 'react'
import { Hello } from './HelloWorld'

it('renders hello', () => {
  const wrapper = mount(<Hello />)

  expect(wrapper.find('div').contains('Hello')).toBe(true)
})
