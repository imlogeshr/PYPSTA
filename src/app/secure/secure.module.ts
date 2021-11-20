import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecureRoutingModule } from './secure-routing.module';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { DashboardComponent, EditComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    SecureRoutingModule,
    AngularMaterialModule
  ],
  entryComponents: [EditComponent]
})
export class SecureModule { }
