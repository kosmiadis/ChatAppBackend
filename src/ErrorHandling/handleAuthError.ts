// @ts-nocheck
export function handleAuthError (err: any, errors: {username: string, email: string, password: string}) {
    const values = Object.values(err.errors)
    values.forEach(({properties}) => {
      errors[properties.path] = properties.message;
    })
}