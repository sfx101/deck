import { writable } from 'svelte/store'
import { buildValidator } from './Validate'

export function createFieldValidator (...validators) {
  const { subscribe, set } = writable({ dirty: false, valid: false, message: null })
  const validator = buildValidator(validators)

  function action (_node, binding) {
    function validate (value, dirty) {
      const result = validator(value, dirty)
      set(result)
    }
    
    validate(binding, false)

    return {
      update (value) {
        validate(value, true)
      }
    }
  }

  return [ { subscribe }, action ]
}
