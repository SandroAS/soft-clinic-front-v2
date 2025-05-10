import { Form, Field, ErrorMessage, configure, defineRule } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import pt_BR from '@vee-validate/i18n/dist/locale/pt_BR.json'
import {
  required,
  email,
  min,
  max,
  min_value,
  alpha_spaces,
  one_of,
  confirmed,
  integer,
  mimes,
  image,
  length,
  numeric
} from '@vee-validate/rules'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('min_value', min_value)
defineRule('alpha_spaces', alpha_spaces)
defineRule('one_of', one_of)
defineRule('confirmed', confirmed)
defineRule('integer', integer)
defineRule('mimes', mimes)
defineRule('image', image)
defineRule('length', length)
defineRule('numeric', numeric)

localize({ pt_BR })
configure({
  generateMessage: localize('pt_BR')
})

export {
  Form,
  Field,
  ErrorMessage
}
