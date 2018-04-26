import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routing } from './app.routing';
import { AlertModule } from 'ngx-bootstrap';
import { Http, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CountDown } from "../../node_modules/angular2-simple-countdown/countdown";
import { NgxPaginationModule } from 'ngx-pagination';
import { TabModule} from 'angular-tabs-component';
import { AgmCoreModule } from '@agm/core';            // @agm/core
import { AgmDirectionModule } from 'agm-direction';
import { MomentTimezoneModule } from 'angular-moment-timezone';
import { MomentModule } from 'ngx-moment';

//Components
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { SearchHomeComponent } from './components/home/search-home/search-home.component';
import { CategoryHomeComponent } from './components/home/category-home/category-home.component';
import { EventHomeComponent } from './components/home/event-home/event-home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { HeroImageEventDetailsComponent } from './components/event-details/hero-image-event-details/hero-image-event-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PriceDetailsComponent } from './components/event-details/price-details/price-details.component';
import { HighlightsEventDetailsComponent } from './components/event-details/highlights-event-details/highlights-event-details.component';
import { LocationEventDetailsComponent } from './components/event-details/location-event-details/location-event-details.component';
import { ReviewOrderComponent } from './components/review-order/review-order.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ReviewOrderHeaderComponent } from './components/review-order/review-order-header/review-order-header.component';
import { ReviewOrderContentComponent } from './components/review-order/review-order-content/review-order-content.component';
import { DealsComponent } from './components/deals/deals.component';
import { DealsHeaderComponent } from './components/deals/deals-header/deals-header.component';
import { DealsContentComponent } from './components/deals/deals-content/deals-content.component';

//Services
import { CategoryService } from './services/category/category.service.client';
import { SearchKeywordService } from './services/search/search.service.client';
import { EventService } from './services/events/events.service.client';
import { GeolocationService } from './services/geolocation/geolocation.service.client';
import { RegisterService } from './services/user/register.service.client';
import { LoginService } from './services/user/login.service.client';
import { SharedService } from './services/sharedService/shared.service.client';
import { LogoutService } from './services/user/logout.service.client';
import { LoggedInService } from './services/user/loggedin.service.client';
import { AuthenticationService } from './services/authentication/authentication.service.client';
import { ListUsersService } from './services/user/listUsers.service.client';
import { AdminService } from './services/authentication/admin.service.client';
import { ProfileService } from './services/user/profile.service.client';
import { ChangePasswordService } from './services/user/changePassword.service.client';
import { OrderDetailsService } from './services/order-details/order-details.service.client';
import { ForgotPasswordService } from './services/user/forgotPassword.service.client';
import { ResetService } from './services/user/reset.service.client';
import { CartService } from './services/cart/cart.service.client';
import { DealsService } from './services/deals/deals.service.client';
import { OrderService } from './services/order/order.service.client';

//Pipes
import { FilterResults } from './pipes/filterResuts.pipe';
import { SortResults } from './pipes/sortResults.pipe';
import { CartComponent } from './components/cart/cart.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    EventsComponent,
    HomeComponent,
    SearchComponent,
    SearchHomeComponent,
    CategoryHomeComponent,
    EventHomeComponent,
    LoginComponent,
    RegisterComponent,       
    FilterResults, 
    ProfileComponent,
    FilterResults,
    CategoriesComponent,
    CountDown,
    SortResults,
    CategoriesComponent,
    EventDetailsComponent,
    UsersListComponent,
    HeroImageEventDetailsComponent,
    NotFoundComponent,
    PriceDetailsComponent,
    HighlightsEventDetailsComponent,
    LocationEventDetailsComponent,
    ReviewOrderComponent,
    ForgotPasswordComponent,
    PasswordResetComponent,
    ReviewOrderHeaderComponent,
    ReviewOrderContentComponent,
    DealsComponent,
    DealsHeaderComponent,
    DealsContentComponent,
    CartComponent,
    OrderSuccessComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Routing,
    NgxPaginationModule,
    TabModule,
    AlertModule.forRoot(),
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyDA8J7Sw6VOYLP0x6fo9MaIDGAFxWFOlIE',
    }),
    AgmDirectionModule,
    MomentTimezoneModule,
    MomentModule
  ],
  providers: [
    EventService,
    CategoryService,
    SearchKeywordService,
    GeolocationService,
    RegisterService,
    LoginService,
    SharedService,
    LogoutService,
    LoggedInService,
    AuthenticationService,
    ListUsersService,
    AdminService,
    ProfileService, 
    ChangePasswordService, 
    OrderDetailsService,
    ForgotPasswordService,
    ResetService,
    CartService,
    DealsService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
