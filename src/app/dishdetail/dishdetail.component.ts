import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Params, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DISHES } from '../shared/dishes';
import { Comment } from '../shared/comment';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { trigger, state, style, animate, transition } from '@angular/animations';

 @Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})

export class DishdetailComponent implements OnInit {

 // dish: Dish;
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  comment: Comment;
  errMess: string;
  visibility = 'shown';

  // not sure why Joe does not have commentForm variable
  // on video
  commentForm: FormGroup;
  selectedDish: Dish;
  // dish: Dish;
  @Input() dish: Dish;

  formErrors = {
    'author': '',
    'comment': ''
  };

  
  /*
    rating: number;
    comment: string;
    author: string;
    date: string;
  */

  validationMessages = {
    'rating': {
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 2 characters long.',
      'maxlength':     'Comment cannot be more than 25 characters long.'
    },
    'author': {
      'required':      'Author is required.',
      'minlength':     'Author must be at least 2 characters long.',
      'maxlength':     'Author cannot be more than 25 characters long.'
    }
  };
  /* constructor(private dishService: DishService,
    @Inject('BaseURL') private BaseURL) { } */
  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
       this.createForm();
    }

    ngOnInit() {

      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params
        .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
        .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
/*

        this.dishService.getDishes()
        .subscribe(dishes => this.dishes = dishes,
          errmess => this.errMess = <any>errmess);
*/

this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds, errmess => this.errMess = <any>errmess);

this.route.params
.switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); })
.subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
    errmess => { this.dish = null; this.errMess = <any>errmess; });

/*
this.route.params.switchMap((params: Params) => this.dishservice.getDish(+params['id']))
.subscribe(dish => { this.dish = dish; this.dishcopy = dish;this.setPrevNext(dish.id); });
*/

      this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
          errmess => { this.dish = null; this.errMess = <any>errmess; });
        }

    createForm(): void {
      this.commentForm = this.fb.group({
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        rating: [],
      });

      this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
      this.onValueChanged(); // (re)set validation messages now
    }


  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

    onSelect(dish: Dish) {
      this.selectedDish = dish;
    }

    goBack(): void {
      this.location.back();
    }


  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
     }
    const form = this.commentForm;
    for(const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    console.log(this.comment);
  //  this.dishcopy.comments.push(this.comment);
    this.dish.comments.push(this.comment);
   // this.dishcopy.save().subscribe(dish => this.dish = dish);
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
  }
}
