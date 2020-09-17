import { shallowMount } from '@vue/test-utils'
import AppFooter from './app-footer.vue'

describe('AppFooter', () => {
  let cmp;

  it('renders', () => {
    cmp = shallowMount(AppFooter, {
    })
    expect(cmp.text()).toBe('AppFooter')
  })
})
