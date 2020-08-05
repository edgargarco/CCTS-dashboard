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
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessComponent } from './components/success/success.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { NewPatientStatusComponent } from './components/new-patient-status/new-patient-status.component';
import { StatusAndRegisterFormComponent } from './components/status-and-register-form/status-and-register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NodeRegistrationComponent } from './components/node-registration/node-registration.component';
 import { UserListComponent } from './components/user-list/user-list.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AgmCoreModule,MarkerManager,GoogleMapsAPIWrapper } from '@agm/core';
import { InfectionTreeComponent } from './components/infection-tree/infection-tree.component';
 import { SpinnerComponent } from './components/spinner/spinner.component';
import { InfoCardComponent } from './components/reusable-components/info-card/info-card.component';
import { ModalComponent } from './components/reusable-components/modal/modal.component';
import { NgxInputTagModule } from '@ngx-lite/input-tag';
import { RegisterLocationComponent } from './components/register-location/register-location.component';
import { SearchFormComponent } from './components/reusable-components/search-form/search-form.component';
import { AddAdminLocalityComponent } from './components/add-admin-locality/add-admin-locality.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { TypeaheadComponentComponent } from './components/reusable-components/typeahead-component/typeahead-component.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
const maskConfig: Partial<IConfig> = {
  validation: false,
};
const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path:'register',component:SignUpComponent},
  {
    path: 'dashboard',component: DashboardComponent,
    canActivate:[AuthGuard],
      data:{
        authority:'USER_READ_PRIVILEGE'
      },
    children: [
      {path:'locality/users',component:AddAdminLocalityComponent,
      canActivate:[AuthGuard],
      data:{
        authority:'ADMIN_WRITE_PRIVILEGE'
      }
  },
      {path:'locality',component:RegisterLocationComponent,
      canActivate:[AuthGuard],
      data:{
        authority:'ADMIN_WRITE_PRIVILEGE'
      }},
      { path: 'infection-tree', component: InfectionTreeComponent },
      { path: 'statistics', component: StatisticsComponent},
      { path: 'register-node', component: NodeRegistrationComponent },
      {path:'typeahead',component:TypeaheadComponentComponent},
      { path: 'users', component: UserListComponent,
      canActivate:[AuthGuard],
      data:{
        authority:'ADMIN_WRITE_PRIVILEGE'
      } },
      { path: 'success', component: SuccessComponent },
      { path: 'register-user', component: UserRegistrationComponent,
      canActivate:[AuthGuard],
      data:{
        authority:'ADMIN_WRITE_PRIVILEGE'
      } },
      { path: 'covid-test', component: NewPatientStatusComponent,
      canActivate:[AuthGuard],
      data:{
        authority:'ACTUALIZAR_ESTADO_SALUD'
      } },
      { path: 'location-nodes', component: LocationNodesComponent },
      { path: 'locality/:id', component: LocationLookUpComponent },
      { path: 'login', component: LoginComponent },
      { path: '', component: MainPageComponent },
    ],
  },
  {path:'',component:LandingPageComponent}
  
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
    SuccessComponent,
    UserRegistrationComponent,
    NewPatientStatusComponent,
    StatusAndRegisterFormComponent,
    NodeRegistrationComponent,
    UserListComponent,
    StatisticsComponent,
    InfectionTreeComponent,
    SpinnerComponent,
    InfoCardComponent,
    ModalComponent,
    RegisterLocationComponent,
    SearchFormComponent,
    AddAdminLocalityComponent,
    TypeaheadComponentComponent,
    SignUpComponent,
    LandingPageComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig),
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyALNYaUL32CYJtDRZr0LF0835zoeUBTDyk'
      /* apiKey is required, unless you are a
      premium customer, in which case you can
      use clientId
      */
    }),
    NgxInputTagModule.forRoot()
  ],
  providers: [authInterceptorProviders, NgbActiveModal,MarkerManager,GoogleMapsAPIWrapper ],
  bootstrap: [AppComponent,],
})
export class AppModule { }
