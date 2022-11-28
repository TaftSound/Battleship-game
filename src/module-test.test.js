import { saySomething } from './module-test.mjs'

test('says say something', () => {
  expect(saySomething()).toBe('something said')
})
