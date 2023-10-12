import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChatbotModule } from '../../src';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatSelectModule, MatSelect, MatSnackBarModule, MatTooltipModule
} from '@angular/material';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Nec3Module } from 'src/page/nec3/nec3.module';
import { Nec3Component } from 'src/page/nec3/nec3.component';
import { Nec4Module } from 'src/page/nec4/nec4.module';
import { Nec4Component } from 'src/page/nec4/nec4.component';
import { GccModule } from 'src/page/gcc/gcc.module'
import { GccComponent } from 'src/page/gcc/gcc.component';
import { StaffrulesModule } from 'src/page/staffrules/staffrules.module'
import { StaffrulesComponent } from 'src/page/staffrules/staffrules.component';
import { DboModule } from 'src/page/dbo/dbo.module';
import { DboComponent } from 'src/page/dbo/dbo.component';
import { MongoModule } from 'src/page/mongo/mongo.module';
import { MongoComponent } from 'src/page/mongo/mongo.component';
import {MatFormFieldModule} from '@angular/material/form-field';
// import { AuthorisedTopNavComponent } from './authorised-top-nav/authorised-top-nav.component';
// import { AuthorisedSideNavTogglerComponent } from './authorised-side-nav-toggler/authorised-side-nav-toggler.component';
// import { AuthorisedSideNavComponent } from './authorised-side-nav/authorised-side-nav.component';

const routes: Routes = [
  { path: '', component: Nec3Component },
  { path: 'nec4', component: Nec4Component },
  { path: 'gcc', component: GccComponent },
  { path: 'staffrules', component: StaffrulesComponent },
  { path: 'dbo', component: DboComponent },
  { path: 'mongo', component: MongoComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'contact', component: ContactComponent },
];

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
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,

    // RouterModule,
    Nec3Module,
    Nec4Module,
    GccModule,
    StaffrulesModule,
    DboModule,
    MongoModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [
    AppComponent,
    // AuthorisedTopNavComponent,
    // AuthorisedSideNavTogglerComponent,
    // AuthorisedSideNavComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
  
  
export class AppModule {}
