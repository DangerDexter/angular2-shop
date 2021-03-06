import {Component} from '@angular/core';

import {ProductService} from './product.service';


import {ShopService} from '../shop/shop.service';
import {RouteConfig, Router, RouteParams} from '@angular/router-deprecated';


import {HTTP_PROVIDERS} from '@angular/http';

import {NgFor} from '@angular/common';

import {UserService} from '../auth/user.service';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
@Component({
    selector: 'product-details',
    providers: [...HTTP_PROVIDERS, ProductService,ShopService],
    template: require('./details.html')
})

export class ProductDetails {

  // Initialize our `productData.text` to an empty `string`
  productData = {
    text: ''
  };
  
  mode='';
  currentItem = { text: '', userId: '' };
  public products: Array<any> = [];
  public items: any;
  public item: any = {title:''};
  public shop: any;
  public id: any;
  public shopId: any='';
  public product: any;
  public title: any;
  public myForm: any;
  public error: any;


  constructor(public params: RouteParams,
      public router:Router,
      public productService: ProductService,
      public shopService: ShopService,

      private u: UserService) {
      console.log('Product constructor go!');
    
      let fb = new FormBuilder();

      this.myForm = fb.group({
          query: ['', Validators.required],
          quantity: ['1'],
          option1: [''],
          option2: [''],
          instructions: [''],
          isDelivery: [''],
          isPickup: ['']

      });

      this.error = '';

      this.id = params.get('id');
      this.shopId = '';
      productService.getOne(this.id)
          .subscribe((res) => {
              //#console.log('In Product Details constructor!', this.id);
              //console.log('In Product Details constructor!', res);
              this.item = res;
              this.shopId = res.shopId;
              console.log('In Details constructor shop id!', this.id,res._id);
              console.log('In Details constructor shop id!', res.shopId);
              console.log('In Details constructor shop id!', this.item);
            //  console.log('In Details constructor shop id!', this.item.title);
              //this.item.title = 'Paneer Butter Masala';
              //this.title = this.item.title;
              //this.shopId = this.item.shopId;
               
              shopService.get(this.shopId)
                  .subscribe((res) => {
                      console.log('In Get Shop Product List constructor!', res);
                      this.shop = res;
                  });
                
                          
          });
          
  } // constructer


  submit(data) {
      console.log('in submit of add cart', this.myForm.valid);
      if (this.myForm.valid || 1) {
          //alert('valid');
          let sendData = {
              productId: this.item._id,
              title: this.item.title,
              quantity: data.quantity,
              instructions: data.instructions,
              option1: data.option1,
              option2: data.option2,
              

              rate: this.item.rate,
            //  currency: this.shop.currency,
              shopId: this.shop._id,
              shopTitle: this.shop.title
              //lng:
          };
          /*
          console.log("shop", this.shop);
          
          console.log("adding to cart", sendData);
          this.u.addToCart(sendData);
          console.log("r-start");
          console.log("Shop ID",this.shopId);
          console.log("Shop ID Item", this.item.shopId);

          alert('Contine Shoping');
          //this.router.parent.navigate(['PList', {shopid:this.shopId}]);
          //console.log("r-start adding to cart");
          */
          
          this.u.addToCart(sendData)
              .subscribe((res) => {
                  alert('Contine Shoping');
                  

              });
              
      }
  }//submit


  
}
