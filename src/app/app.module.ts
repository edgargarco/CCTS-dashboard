import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CovidTestResultComponent } from './components/covid-test-result/covid-test-result.component';
import { LocationNodesComponent } from './components/location-nodes/location-nodes.component';
import { LocationLookUpComponent } from './components/location-look-up/location-look-up.component';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { NgxMaskModule, IConfig } from 'ngx-mask';
const maskConfig: Partial<IConfig> = {
  validation: false,
};
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'covid-test', component: CovidTestResultComponent },
      { path: 'location-nodes', component: LocationNodesComponent },
      { path: 'locality/:id', component: LocationLookUpComponent },
      { path: 'login', component: LoginComponent },
      { path: '', component: MainPageComponent },
    ],
  },
  { path: 'auth/login', component: LoginComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CovidTestResultComponent,
    LocationNodesComponent,
    LocationLookUpComponent,
    LoginComponent,
    DashboardComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
