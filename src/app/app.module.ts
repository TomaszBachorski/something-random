import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

//alerts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { TranslationPanelComponent } from './components/translation-panel/translation-panel.component';
import { FooterComponent } from './components/translation-panel/footer/footer.component';
import { NavigationComponent } from './components/translation-panel/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    TranslationPanelComponent,
    FooterComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'inline' }),
    ToastContainerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
