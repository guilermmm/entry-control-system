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
