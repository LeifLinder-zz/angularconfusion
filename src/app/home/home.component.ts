// import { Component, OnInit } from '@angular/core'; 
import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader} from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import { flyInOut, expand} from '../animations/app.animation';

@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.scss'],
host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

dish: Dish;
promotion: Promotion;
errMess: string;
leader: Leader;
dishErrMess: string;
leaderErrMess: string;
promotionErrMess: string;

constructor(private dishservice: DishService,
private promotionservice: PromotionService,
private leaderservice: LeaderService,
@Inject('BaseURL') private BaseURL) { }


ngOnInit() {
// this.dish = this.dishservice.getFeaturedDish();
// this.dishservice.getFeaturedDish().then(dish => this.dish = dish);
this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,
    errmess => this.dishErrMess = <any>errmess);


// this.promotion = this.promotionservice.getFeaturedPromotion();
this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion,
    errmess => this.promotionErrMess = <any>errmess);
// this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);


// this.leader = this.leaderservice.getFeaturedLeader();
this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader,
    errmess => this.leaderErrMess = <any>errmess);
// this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader);

/*
  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe( dish => this.dish = dish,errmess => this.dishErrMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion,errmess => this.promotionErrMess = <any>errmess);
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader,errmess => this.leaderErrMess = <any>errmess);
  }
*/

}

}
