import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeModule} from "./pages/home/home.module";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {MomentPipe} from "./pipes/moment.pipe";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthModule} from "./pages/auth/auth.module";
import {GlobalHttpInterceptorService} from "./services/http-interceptor.service";
import {AlertModule} from "./components/alert-component/alert.module";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MomentPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    AuthModule,
    AlertModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true}],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
