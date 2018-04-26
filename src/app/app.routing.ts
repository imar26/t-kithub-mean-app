//Modules
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

//Components
import { SearchComponent } from './components/search/search.component';
import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ReviewOrderComponent } from './components/review-order/review-order.component';
import { DealsComponent } from './components/deals/deals.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';

//Services
import { AuthenticationService } from './services/authentication/authentication.service.client';
import { AdminService } from './services/authentication/admin.service.client';

const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'events', component: EventsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthenticationService]},
  {path: 'search/:keyword', component: SearchComponent},
  {path: 'categories/:categoryId', component: CategoriesComponent},
  {path: 'details/:eventID', component: EventDetailsComponent},
  {path: 'users', component: UsersListComponent, canActivate: [AdminService]},
  {path: 'cart' , component: CartComponent, canActivate: [AuthenticationService]},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset/:token', component: PasswordResetComponent},
  {path: 'review-order/:eventId', component:ReviewOrderComponent, canActivate: [AuthenticationService]},
  {path: 'deals', component: DealsComponent},
  {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthenticationService]},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];
  
// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);