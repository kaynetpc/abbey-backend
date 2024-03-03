import { AuthRoute } from '../auth/route/index';

export const recognizedUrlToBeExcludedFromAuthCheck = [
    AuthRoute.login,
    AuthRoute.register
]
