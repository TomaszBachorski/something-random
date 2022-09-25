import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AbstractControlWarn } from "./components/register/register.component";
import { emailTaken, supportedLanguages, usernameTaken} from "./customTypes";
import { AuthService } from "./services/auth-service.service";

function fixLanguageInput(languages: string[]): string[] {
    for (let i = 0; i < languages.length; i++) {
        languages[i] = languages[i].trim();
    }
    return languages;
}

function englishAsNative(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const languages: string = control.value;
        if (!languages) return null;
        // let fixed = fixLanguageInput(languages);
        const valid: boolean = languages.toUpperCase().includes("EN");
        return valid ? null : { englishAsNative: false };
    }
}

function unexpectedInput(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const languagesInput = fixLanguageInput(control.value.toUpperCase().split(","));
        if (languagesInput.length === 0) return null;
        if (languagesInput.filter((e: string) => e.length <= 1 || e.length >= 4).length !== 0) return { unexpectedInput: true }
        else return null
    }
}

function supportedLanguages(userService: AuthService): any {
    return (control: AbstractControlWarn): ValidationErrors | null => {
        userService.getSupportedLanguages().subscribe((res: supportedLanguages) => {
            if (!control.value) return null;
            const languagesInput: string[] = fixLanguageInput(control.value.toUpperCase().split(","));
            const unsupportedLanguages = [];
            for (let i = 0; i < languagesInput.length; i++) {
                if (!res.languages.includes(languagesInput[i])) unsupportedLanguages.push(languagesInput[i]);
            }
            control.warnings = { unsupportedLanguages: unsupportedLanguages };
            return null;
        });
        return null;
    }
}

function maxNumberOfLanguages(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value.split(",").length >= 6 ? { tooManyLanguages: true } : null
    }
}

function minimumAge(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const birthdate: Date = new Date(control.value);
        const today: Date = new Date();
        if (!birthdate) return null;
        const valid: boolean = (today.getFullYear() - birthdate.getFullYear() < 16) ? false : true;
        return valid ? null : { minimumAge: false };
    }
}

const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass: string = group.get('password')!.value;
    const confirmPass: string = group.get('repeatPassword')!.value;
    if (pass !== confirmPass) group.get('repeatPassword')!.setErrors({ notSame: true });
    else group.get('repeatPassword')!.setErrors(null);
    return null;
}

function usernameAlreadyExists(userService: AuthService): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        userService.userExists(control.value).subscribe((res: usernameTaken) => {
            if (res.taken === true) control.setErrors({ usernameExist: true });
        });
        return null;
    }
}

function emailAlreadyExists(userService: AuthService): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        userService.emailTaken(control.value).subscribe((res: emailTaken) => {
            if (res.taken === true) control.setErrors({ emailTaken: true });
        });
        return null;
    }
}
export { englishAsNative, minimumAge, passwordMatchValidator, usernameAlreadyExists, emailAlreadyExists, unexpectedInput, supportedLanguages, maxNumberOfLanguages };