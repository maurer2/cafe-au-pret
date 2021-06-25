import { shallowMount, VueWrapper } from '@vue/test-utils'

import AppFooter from './app-footer.vue'

describe('AppFooter', () => {
  let cmp: VueWrapper<any>

  it('renders', () => {
    cmp = shallowMount(AppFooter, {
    })
    expect(cmp.text()).toBe('AppFooter')
  })

  test('matches snapshot', () => {
    expect(cmp.element).toMatchSnapshot()
  })
})
