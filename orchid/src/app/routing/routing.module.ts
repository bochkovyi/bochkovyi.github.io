import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';
import { NatureComponent } from '../nature/nature.component';
import { RoomsComponent } from '../rooms/rooms.component';
import { TransportComponent } from '../transport/transport.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { ErrorComponent } from '../error/error.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'nature', component: NatureComponent },
  { path: 'rooms',     component: RoomsComponent },
  { path: 'transport',     component: TransportComponent },
  { path: 'contacts',     component: ContactsComponent },
  { path: '404',     component: ErrorComponent },
  { path: '**',     redirectTo: '/404' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/