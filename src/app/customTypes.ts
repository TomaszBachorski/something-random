
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
    languages: string[],
    rankId: number,
    blocked: number,
    birthdate: Date
}

type languageInfoResponse = {
    translatedStrings: number,
    availableStrings: number,
    approved: number,
    numberOfContributors: number
}

type extendedLanguageResponse = {
    id: string,
    language: string,
}

type onlyJwtTokenInJson = {
    jwtToken: string
}

type usersList = Array<{
    id: number,
    username: string,
    rankId: number,
    languages: string
}>

enum rolesEnum {
    "Blocked" = 0,
    "Translator" = 1,
    "Proofreader",
    "Administrator"
}

type fullUserInformation = {
    id: number,
    username: string,
    name: string,
    surname: string,
    creationDate: string,
    email: string,
    birthdate: string,
    blocked: boolean,
    rankId: number,
    languages: string[]

}

type stringsList = Array<{
    stringKey: string,
    stringContent: string,
    additionalContext: string | null,
    status: "pending" | "translated" | "approved"
}>

//strings service types
export { stringsList }
export { loginResponse, registerResponse, usernameExists, emailTaken, supportedLanguages, authenticateResponse, jwtToken, languageInfoResponse, onlyJwtTokenInJson, usersList, extendedLanguageResponse, fullUserInformation }
export { rolesEnum }
