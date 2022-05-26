import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { TranslationPanelComponent } from "./components/translation-panel/translation-panel.component"


const routes: Routes = [
  { path: "", redirectTo: "/signin", pathMatch: "full" },
  { path: "signin", component: SigninComponent },
  { path: "register", component: RegisterComponent },
  { path: "translate", component: TranslationPanelComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
