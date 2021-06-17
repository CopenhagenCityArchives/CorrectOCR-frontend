import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfJsViewerModule  } from 'ng2-pdfjs-viewer';

import { NgMagnizoomModule } from 'ng-magnizoom';

import { AutofocusDirective } from './autofocus.directive';
import { AppComponent } from './app.component';
import { TokensComponent } from './components/tokens/tokens.component'
import { DocOverviewComponent } from './components/doc-overview/doc-overview.component';
import { DocTokensComponent } from './components/doc-tokens/doc-tokens.component';
import { RandomTokenComponent } from './components/random-token/random-token.component';
import { AuthGuard } from './auth/auth.guard';
import { TokensPipePipe } from './custom-pipes/tokens-pipe.pipe';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { SpecificTokenComponent } from './components/specific-token/specific-token.component';
import { AsyncTimestampPipe } from './custom-pipes/async-timestamp.pipe';


@NgModule({
  declarations: [
    AutofocusDirective,
    AppComponent,
    TokensComponent,
    DocOverviewComponent,
    DocTokensComponent,
    RandomTokenComponent,
    TokensPipePipe,
    PdfViewerComponent,
    SpecificTokenComponent,
    AsyncTimestampPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    PdfViewerModule,
    PdfJsViewerModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: DocOverviewComponent, canActivate: [AuthGuard]},
      {path: 'tokens', component: RandomTokenComponent, canActivate: [AuthGuard]},
      {path: 'tokens/:docid', component: DocTokensComponent, canActivate: [AuthGuard]},
      {path: 'tokens/:docid/:tokenindex', component: SpecificTokenComponent, canActivate: [AuthGuard]},
      {path: 'doc-overview', component: DocOverviewComponent, canActivate: [AuthGuard]},
      {path:'**', redirectTo: '/', canActivate: [AuthGuard]}
    ]),
    NgbModule,
    NgMagnizoomModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AutofocusDirective],
})
export class AppModule { }
