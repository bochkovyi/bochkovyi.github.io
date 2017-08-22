import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NatureComponent } from './nature/nature.component';
import { RoomsComponent } from './rooms/rooms.component';
import { TransportComponent } from './transport/transport.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RoutingModule }     from './routing/routing.module';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NatureComponent,
    RoomsComponent,
    TransportComponent,
    ContactsComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
