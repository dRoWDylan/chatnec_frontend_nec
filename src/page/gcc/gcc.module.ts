import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChatbotModule } from '../../../src';

import { GccComponent } from './gcc.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
// import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthorisedTopNavComponent } from './authorised-top-nav/authorised-top-nav.component';
// import { AuthorisedSideNavTogglerComponent } from './authorised-side-nav-toggler/authorised-side-nav-toggler.component';
// import { AuthorisedSideNavComponent } from './authorised-side-nav/authorised-side-nav.component';


@NgModule({
  imports: [
    BrowserModule,
    ChatbotModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule
  ],
  declarations: [
    GccComponent,
    // AuthorisedTopNavComponent,
    // AuthorisedSideNavTogglerComponent,
    // AuthorisedSideNavComponent,
  ],
  providers: [],
  bootstrap: [GccComponent]
})
  
  
export class GccModule { }
