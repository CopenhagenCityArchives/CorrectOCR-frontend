import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TokensComponent } from './components/tokens/tokens.component'
import { DocOverviewComponent } from './components/doc-overview/doc-overview.component';
import { DocTokensComponent } from './components/doc-tokens/doc-tokens.component';
import { RandomTokenComponent } from './components/random-token/random-token.component';
import { AuthGuard } from './auth/auth.guard';
import { TokenPipeComponent } from './components/token-pipe/token-pipe.component';
import { RandomPipeComponent } from './components/random-pipe/random-pipe.component';

@NgModule({
  declarations: [
    AppComponent,
    TokensComponent,
    DocOverviewComponent,
    DocTokensComponent,
    RandomTokenComponent,
    TokenPipeComponent,
    RandomPipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    //ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: AppComponent, canActivate: [AuthGuard]},
      {path: 'tokens-pipe', component: RandomPipeComponent, canActivate: [AuthGuard]},
      {path: 'tokens', component: RandomTokenComponent, canActivate: [AuthGuard]},
      {path: 'tokens/:docid', component: DocTokensComponent, canActivate: [AuthGuard]},
      {path: 'doc-overview', component: DocOverviewComponent, canActivate: [AuthGuard]},
    ]),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
