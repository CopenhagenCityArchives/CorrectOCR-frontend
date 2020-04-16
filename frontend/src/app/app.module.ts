import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokensComponent } from './tokens/tokens.component';
import { RouterModule } from '@angular/router';
import { TokenDetailsComponent } from './token-details/token-details.component';

@NgModule({
  declarations: [
    AppComponent,
    TokensComponent,
    TokenDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', component: AppComponent},
      {path: 'tokens', component: TokensComponent},
      {path: 'tokens/:tokenDocId', component: TokenDetailsComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
