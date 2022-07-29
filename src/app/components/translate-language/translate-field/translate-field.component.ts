import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stringInformation, translation } from 'src/app/customTypes';
import { StringsService } from 'src/app/services/strings-service.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { translationIsDifferent } from 'src/app/customValidators';

@Component({
    selector: 'translate-field',
    templateUrl: './translate-field.component.html',
    styleUrls: ['./translate-field.component.css']
})
export class TranslateFieldComponent implements OnInit {

    @Input() public language: string = "";
    @Input() public userId: number = 0;
    public selectedString: boolean = false;
    public stringInformation: stringInformation | undefined;
    public userTranslation: translation | undefined;
    public buttonUsed:string = "";

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private stringsService: StringsService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.userTranslation?.translation
            if (!params["stringKey"]) return this.selectedString = false;
            this.translationSubmit.reset()
            this.stringsService.getString(params["stringKey"], this.language).subscribe((res: stringInformation) => {
                if (res.stringExist === false) return this.router.navigate(["/translate"]);
                this.stringInformation = res;
                this.userTranslation = this.stringInformation.availableTranslations?.find(t => t.userId === this.userId)
                this.translationSubmit.controls["translation"].setValue(this.userTranslation?.translation)
                return
            });
            return;
        });
    }
    translationSubmit = new FormGroup({
        translation: new FormControl(null, [Validators.required])
    })

    get translation (): FormControl {return <FormControl>this.translationSubmit.get("translation")}

    submit() {
        if (this.buttonUsed!=="submit") return
        if (this.translation.touched===false) this.translation.markAsTouched();
        if (this.userTranslation?.translation===this.translationSubmit.controls["translation"].value && this.userTranslation!==undefined) return this.translationSubmit.controls["translation"].setErrors({ translationTheSame: true });
        if (this.translationSubmit.controls["translation"].errors) return;
        console.log(this.translationSubmit.controls)
    }

}
