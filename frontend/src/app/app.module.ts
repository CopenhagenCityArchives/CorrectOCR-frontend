import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TokensComponent } from './tokens/tokens.component';
import { DocOverviewComponent } from './doc-overview/doc-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    TokensComponent,
    DocOverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: AppComponent},
      {path: 'tokens', component: TokensComponent},
      {path: 'doc-overview', component: DocOverviewComponent},
    ]),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
