
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

type authenticateResponse = {
    valid: boolean
}

type jwtToken = {
    username: string,
    languages: string,
    rankId: number,
    blocked: number,
    birthdate: Date
}

export {loginResponse, registerResponse, usernameExists, emailTaken, supportedLanguages, authenticateResponse, jwtToken}