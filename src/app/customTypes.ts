
type usernameExists = {
    taken: boolean
}
type emailTaken = {
    exists: boolean
}

type loginResponse = {
    message: string,
    username?: string,
    jwtToken?: string,
    expiresIn?: number
}

type registerResponse = {
    message: string
}

type supportedLanguages = {
    languages: string[]
}

export {loginResponse, registerResponse, usernameExists, emailTaken, supportedLanguages}