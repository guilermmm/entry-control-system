import { PermitLevel } from '../services/user'

export const getUrl = (permitLevel: string | undefined) => {
  switch (permitLevel) {
    case PermitLevel.ADMIN:
      return '/admin'
    case PermitLevel.ATTENDANT:
      return '/attendant'
    case PermitLevel.EMPLOYEE:
      return '/employee'

    default:
      return '/login'
  }
}

export const validateCpf = (cpf: string) => {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

  return cpfRegex.test(cpf)
}

export const validateRg = (rg: string) => {
  const rgRegex = /(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/

  return rgRegex.test(rg)
}

export const validatePhone = (phone: string) => {
  const phoneRegex = /(^[0-9]{2})?(\s|-)?(9?[0-9]{4})-?([0-9]{4}$)/

  return phoneRegex.test(phone)
}

export const getDate = (date: string) => {
  const newDate = new Date(date)
  const fullDate = newDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return fullDate
}

export const getHour = (date: string) => {
  const newDate = new Date(date)
  const hour = newDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return hour
}
