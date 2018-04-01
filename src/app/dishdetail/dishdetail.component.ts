import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import { Observable } from 'rxjs/Rx';
//import { ActivatedRoute } from '@angular/router';
import {Params, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
//import { DISHES } from '../shared/dishes';


//import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})


export class DishdetailComponent implements OnInit {
  comment: Comment;

  dishIds: number[];
  prev: number;
  next: number;

  tiller = "here is new Tiler";
  @Input() dish: Dish;

  constructor(private dishservice: DishService,
  private route: ActivatedRoute, private location: Location) { }

  selectedDish: Dish;

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.switchMap((params: Params) => this.dishservice.getDish(+params['id'])).subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
  goBack(): void {
    this.location.back();
  }
}

/*
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import { Observable } from 'rxjs/Rx';
//import { ActivatedRoute } from '@angular/router';
import {Params, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
//import { DISHES } from '../shared/dishes';


//import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  comment: Comment;
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

constructor(private dishservice: DishService,
private route: ActivatedRoute, private location: Location) { }

selectedDish: Dish;

ngOnInit() {
  this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
  this.route.params.switchMap((params: Params) => this.dishservice.getDish(+params['id'])).subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
}

setPrevNext(dishId: number) {
  let index = this.dishIds.indexOf(dishId);
  this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
  this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
}

onSelect(dish: Dish) {
  this.selectedDish = dish;
}

 goBack(): void {
   this.location.back();
 }
}
*/

