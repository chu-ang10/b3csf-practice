import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './components/orders.component';

const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'order/:email', component: OrdersComponent},
  {path: '**', redirectTo:'/', pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule, 
    RouterModule
  ],

  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
