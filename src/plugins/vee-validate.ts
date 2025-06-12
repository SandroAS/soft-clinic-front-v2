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

defineRule('cpf', (value: string | number) => {
  if (!value) {
    return 'O campo CPF é obrigatório.';
  }

  const cleanedCpf = String(value).replace(/[^\d]/g, '');

  if (cleanedCpf.length !== 11) {
    return 'O CPF deve conter 11 dígitos.';
  }

  // Verifica CPFs sequenciais (comumente usados para fraude)
  if (cleanedCpf === "00000000000" ||
      cleanedCpf === "11111111111" ||
      cleanedCpf === "22222222222" ||
      cleanedCpf === "33333333333" ||
      cleanedCpf === "44444444444" ||
      cleanedCpf === "55555555555" ||
      cleanedCpf === "66666666666" ||
      cleanedCpf === "77777777777" ||
      cleanedCpf === "88888888888" ||
      cleanedCpf === "99999999999") {
    return 'CPF inválido.';
  }

  let sum = 0;
  let remainder;

  // Validação do primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cleanedCpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;

  if ((remainder == 10) || (remainder == 11)) {
    remainder = 0;
  }
  if (remainder != parseInt(cleanedCpf.substring(9, 10))) {
    return 'CPF inválido.';
  }

  sum = 0;
  // Validação do segundo dígito verificador
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cleanedCpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;

  if ((remainder == 10) || (remainder == 11)) {
    remainder = 0;
  }
  if (remainder != parseInt(cleanedCpf.substring(10, 11))) {
    return 'CPF inválido.';
  }

  return true;
})

defineRule('is_true', (value: boolean) => {
  if (value !== true) {
    return 'Você deve aceitar os termos para prosseguir.';
  }
  return true;
})

localize({ pt_BR })
configure({
  generateMessage: localize('pt_BR')
})

export {
  Form,
  Field,
  ErrorMessage
}
