import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainRoutes } from './main.routing';
import { MainComponent } from './main/main.component';
import { GoldComponent } from './protected/gold/gold.component';
import { SilverComponent } from './protected/silver/silver.component';

@NgModule({
  declarations: [
    MainComponent,
    GoldComponent,
    SilverComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MainRoutes)
  ]
})
export class MainModule { }
