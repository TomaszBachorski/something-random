import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { stringInformation, stringsList, translation } from 'src/app/customTypes';
import { StringsService } from 'src/app/services/strings-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
    selector: 'translate-field',
    templateUrl: './translate-field.component.html',
    styleUrls: ['./translate-field.component.css']
})
export class TranslateFieldComponent implements OnInit {

    @Input() public language: string = "";
    @Input() public userId: number | undefined = 0;
    public stringInformation: stringInformation | undefined;
    public userTranslation: translation | undefined;
    public buttonUsed: string = "";

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private stringsService: StringsService,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            if (!params["stringKey"]) return;
            this.translationSubmit.reset();
            this.stringsService.getString(params["stringKey"], this.language).subscribe((res: stringInformation) => {
                if (res.stringExist === false) return this.router.navigate(["/translate"]);
                this.stringInformation = res;
                this.userTranslation = this.stringInformation.availableTranslations?.find(t => t.userId === this.userId);
                this.translationSubmit.controls["translation"].setValue(this.userTranslation?.translation);
                return;
            });
            return;
        });
    }
    translationSubmit = new FormGroup({
        translation: new FormControl(null, [Validators.required])
    })

    get translation(): FormControl { return <FormControl>this.translationSubmit.get("translation") }

    submit() {
        if (this.buttonUsed === "next" || this.buttonUsed === "previous") {
            let currentCheckboxes = { pending: this.localStorageService.get("pending"), approved: this.localStorageService.get("approved"), translated: this.localStorageService.get("translated") };
            this.stringsService.getStrings(this.language).subscribe((res: stringsList) => {
                res = res.filter(str => { return currentCheckboxes[str.status] === "true" });
                let stringKeys: string[] = res.map(obj => obj.stringKey);
                let index: number = stringKeys.findIndex(o => o === this.stringInformation!.stringKey);
                if (index === 0 && this.buttonUsed === "previous") return alert("There are no more previous strings");
                if (index === stringKeys.length - 1 && this.buttonUsed === "next") return alert("You can't go any further, cause there is nothing behind");
                if (this.buttonUsed === "next") index += 1;
                if (this.buttonUsed === "previous") index -= 1;
                this.router.navigate([`/translate/`, this.language], { queryParams: { stringKey: stringKeys[index] } });
                this.buttonUsed = "";
                return;
            });
            return;
        }
        if (this.buttonUsed === "delete") {
            let answer = confirm("Are you sure, that you want to delete your own translation? This action cannot be undone.");
            if (answer === false) return;
            console.log(answer)

        }
        if (this.buttonUsed !== "submit") return;
        if (this.translation.touched === false) this.translation.markAsTouched();
        if (this.userTranslation?.translation === this.translationSubmit.controls["translation"].value && this.userTranslation !== undefined) return this.translationSubmit.controls["translation"].setErrors({ translationTheSame: true });
        if (this.userTranslation?.approved == true) return this.translationSubmit.controls["translation"].setErrors({ approved: true });
        if (this.translationSubmit.controls["translation"].errors) return;
        console.log(this.translationSubmit.controls);
    }

}
