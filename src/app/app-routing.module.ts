import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { TranslationPanelComponent } from "./components/translation-panel/translation-panel.component"
import { UsersPanelComponent } from './components/users-panel/users-panel.component';
import { AccountComponent } from './components/account/account.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { TranslateLanguageComponent } from './components/translate-language/translate-language.component';

const routes: Routes = [
    { path: "", redirectTo: "/signin", pathMatch: "full" },
    { path: "signin", component: SigninComponent },
    { path: "register", component: RegisterComponent },
    { path: "translate", component: TranslationPanelComponent },
    { path: "users", component: UsersPanelComponent },
    { path: "users/:id", component: UserViewComponent},
    { path: "account", component: AccountComponent},
    { path: "translate/:language", component: TranslateLanguageComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
