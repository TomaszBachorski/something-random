
type usernameTaken = {
    taken: boolean
}
type emailTaken = {
    taken: boolean
}

type loginResponse = {
    message: string,
    username?: string,
    jwtToken?: string,
    expiresIn?: number
}

type supportedLanguages = {
    languages: string[]
}

type authenticateResponse = {
    valid: boolean
}

type jwtToken = {
    userId: number,
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

type translation = {
    userId: number,
    translation: string,
    approved: boolean
}

type stringInformation = {
    stringExist: boolean,
    stringKey: string | null,
    stringContent: string | null,
    additionalContext: string | null,
    availableTranslations: Array<translation> | null
}

type multipleUsersArray = Array<{ id: number, username: string, rankId: rolesEnum }>

//strings service types
export { stringsList, stringInformation, translation }

//login and registration component with users service
export { loginResponse, usernameTaken, emailTaken, supportedLanguages, authenticateResponse, jwtToken, languageInfoResponse, usersList, extendedLanguageResponse, fullUserInformation }

//different
export { multipleUsersArray }

//general types
export { rolesEnum }
