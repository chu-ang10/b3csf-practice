import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../model.model';
import { PizzaService } from '../pizza.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

const SIZES: string[] = [
  "Personal - 6 inches",
  "Regular - 9 inches",
  "Large - 12 inches",
  "Extra Large - 15 inches"
]

const PIZZA_TOPPINGS: string[] = [
    'chicken', 'seafood', 'beef', 'vegetables',
    'cheese', 'arugula', 'pineapple'
]

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{


  pizzaSize = SIZES[0]

  //constructor() { }

  updateSize(size: string) {
    this.pizzaSize = SIZES[parseInt(size)]
  }

  //************************** */

  orderForm!:FormGroup;
  toppingsForm!:FormGroup;
  fb = inject(FormBuilder);
  pizzaSvc = inject(PizzaService)
  router = inject(Router)
  // constructor(private fb:FormBuilder) {}

  // ngOnInit(){
  //     this.orderForm = this.fb.group({
  //       name:this.fb.control<string>('', [Validators.required]),
  //       email:this.fb.control<string>('', [Validators.required, Validators.email]),
  //       size:this.fb.control<number>(0, [Validators.required]),
  //       base:this.fb.control<string>('',[Validators.required]),
  //       sauce:this.fb.control<string>('',[Validators.required]),
  //       toppings:this.fb.control<string>('', [Validators.required]),
  //       comments:this.fb.control<string>('')
        
  //     })
  
  //     this.toppingsForm = this.fb.group({
  //       chicken:this.fb.control<string>(''),
  //       seafood:this.fb.control<string>(''),
  //       beef:this.fb.control<string>(''),
  //       vegetables:this.fb.control<string>(''),
  //       cheese:this.fb.control<string>(''),
  //       arugula:this.fb.control<string>(''),
  //       pineapple:this.fb.control<string>(''),
  //     })
  // }

  ngOnInit(): void {
    this.orderForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      email: this.fb.control<string>('', [
        Validators.required,
        Validators.email,
      ]),
      size: this.fb.control<number>(0, [Validators.required]),
      base: this.fb.control<string>('', [Validators.required]),
      sauce: this.fb.control<string>('', [Validators.required]),
      comments: this.fb.control<string>(''),
      toppings: this.createToppings(), //default no selection
    });
  }

  createToppings(): FormGroup {
    return this.fb.group({
      chicken: this.fb.control<boolean>(false),
      seafood: this.fb.control<boolean>(false),
      beef: this.fb.control<boolean>(false),
      vegetables: this.fb.control<boolean>(false),
      cheese: this.fb.control<boolean>(false),
      arugula: this.fb.control<boolean>(false),
      pineapple: this.fb.control<boolean>(false),
    });
  }

  processForm(): void{
    console.info(this.orderForm.value);
    let newOrder: Order = {
      name: this.orderForm.value.name,
      email: this.orderForm.value.email,
      sauce: this.orderForm.value.sauce,
      size: this.orderForm.value.size,
      comments: this.orderForm.value.comments,
      toppings: this.parseToppings(this.orderForm.value.toppings),
      crust: this.orderForm.value.base,
    };

    firstValueFrom(this.pizzaSvc.placeOrder(newOrder))
    .then(
      res=> {
        this.router.navigate(['/orders', res['email']])
      }
    )
    .catch(
      err=> {
        alert(err.error.error)
      }
    )

  }

  

  parseToppings(topObj: any): string[] {
    let toppingsArray: string[]= [];
    let toppings = Object.keys(topObj);
    for (let i=0; i<toppings.length; i++) {
      if (topObj[toppings[i]]){
        toppingsArray.push(toppings[i]);
      }
    }
    console.info(toppingsArray);
    return toppingsArray
  }

}
function then(arg0: (res: any) => void) {
  throw new Error('Function not implemented.');
}



