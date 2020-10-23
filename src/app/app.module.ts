import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfJsViewerModule  } from 'ng2-pdfjs-viewer';

import { AppComponent } from './app.component';
import { TokensComponent } from './components/tokens/tokens.component'
import { DocOverviewComponent } from './components/doc-overview/doc-overview.component';
import { DocTokensComponent } from './components/doc-tokens/doc-tokens.component';
import { RandomTokenComponent } from './components/random-token/random-token.component';
import { AuthGuard } from './auth/auth.guard';
import { TokensPipePipe } from './custom-pipes/tokens-pipe.pipe';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { SpecificTokenComponent } from './components/specific-token/specific-token.component';


@NgModule({
  declarations: [
    AppComponent,
    TokensComponent,
    DocOverviewComponent,
    DocTokensComponent,
    RandomTokenComponent,
    TokensPipePipe,
    PdfViewerComponent,
    SpecificTokenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    PdfViewerModule,
    PdfJsViewerModule,
    //ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: DocOverviewComponent, canActivate: [AuthGuard]},
      {path: 'tokens', component: RandomTokenComponent, canActivate: [AuthGuard]},
      {path: 'tokens/:docid', component: DocTokensComponent, canActivate: [AuthGuard]},
      {path: 'tokens/:docid/:token-index', component: SpecificTokenComponent, canActivate: [AuthGuard]},
      {path: 'doc-overview', component: DocOverviewComponent, canActivate: [AuthGuard]},
    ]),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
