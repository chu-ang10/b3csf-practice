import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Order } from './model.model';


export class PizzaService {

  urlPrefix: string='/api/'

  // TODO: Task 4
  // You may add any parameters and return any type from placeOrder() method
  // Do not change the method name
  http = inject(HttpClient);
  placeOrder(order:Order){
    return this.http.post<any>('api/' + 'order', order)
  }


  // TODO: Task 5
  // You may add any parameters and return any type from getOrders() method
  // Do not change the method name
  getOrders() {
  }

  // TODO: Task 7
  // You may add any parameters and return any type from delivered() method
  // Do not change the method name
  delivered() {
  }

}
