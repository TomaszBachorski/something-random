import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { UserService } from "./services/user-service.service";

function englishAsNative(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const languages: string = control.value;
        if (!languages) return null;
        let valid: boolean = languages.toLowerCase().includes("en");
        return valid ? null : { englishAsNative: false };
    }
}

function minimumAge(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const birthdate: Date = new Date(control.value);
        const today: Date = new Date();
        if (!birthdate) return null;
        let valid: boolean = (today.getFullYear() - birthdate.getFullYear() <= 16) ? false : true
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
        userService.userExists(control.value).subscribe((res:any)=>{
            if (Object.values(res)[0]==true) control.setErrors({usernameExist: true});
        })
        return null;
    }
}

function emailAlreadyExists(userService: UserService): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        userService.emailTaken(control.value).subscribe(res=>{
            if (Object.values(res)[0]==true) control.setErrors({emailTaken: true});
        })
        return null;
    }
}
export { englishAsNative, minimumAge, passwordMatchValidator, usernameAlreadyExists, emailAlreadyExists };