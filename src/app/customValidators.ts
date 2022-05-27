import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AbstractControlWarn, FormControlWarn } from "./components/register/register.component";
import { emailTaken, supportedLanguages, usernameExists } from "./customTypes";
import { UserService } from "./services/user-service.service";

function fixLanguageInput(languages: string[]): string[] {
    for (let i =0 ; i < languages.length;i++) {
        languages[i]=languages[i].trim();
    }
    return languages;
}

function englishAsNative(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const languages: string = control.value;
        if (!languages) return null;
        let valid: boolean = languages.toUpperCase().includes("EN");
        return valid ? null : { englishAsNative: false };
    }
}

function unexpectedInput(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const languagesInput = fixLanguageInput(control.value.toUpperCase().split(","));
        if (languagesInput.length===0) return null;
        if (languagesInput.filter((e: string) => e.length <= 1 || e.length >= 4).length !== 0) return { unexpectedInput: true }
        else return null
    }
}

function supportedLanguages(userService: UserService): any {
    return (control: AbstractControlWarn): ValidationErrors | null => {
        userService.getSupportedLanguages().subscribe((res:supportedLanguages)=>{
            if (!control.value) return null;
            let languagesInput: string[] = fixLanguageInput(control.value.toUpperCase().split(","));
            let unsupportedLanguages = new Array();
            for (let i =0; i < languagesInput.length;i++) {
                if (!res.languages.includes(languagesInput[i])) unsupportedLanguages.push(languagesInput[i]);
            }
            control.warnings = {unsupportedLanguages: unsupportedLanguages};
            return null;
        });
        return null;
    }
}

function minimumAge(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const birthdate: Date = new Date(control.value);
        const today: Date = new Date();
        if (!birthdate) return null;
        let valid: boolean = (today.getFullYear() - birthdate.getFullYear() < 16) ? false : true;
        return valid ? null : { minimumAge: false };
    }
}

let passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass: string = group.get('password')!.value;
    let confirmPass: string = group.get('repeatPassword')!.value;
    if (pass !== confirmPass) group.get('repeatPassword')!.setErrors({ notSame: true });
    else group.get('repeatPassword')!.setErrors(null);
    return null;
}

function usernameAlreadyExists(userService: UserService): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        userService.userExists(control.value).subscribe((res: usernameExists) => {
            if (Object.values(res)[0] == true) control.setErrors({ usernameExist: true });
        })
        return null;
    }
}

function emailAlreadyExists(userService: UserService): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        userService.emailTaken(control.value).subscribe((res:emailTaken) => {
            if (Object.values(res)[0] == true) control.setErrors({ emailTaken: true });
        })
        return null;
    }
}
export { englishAsNative, minimumAge, passwordMatchValidator, usernameAlreadyExists, emailAlreadyExists, unexpectedInput, supportedLanguages };