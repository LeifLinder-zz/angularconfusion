import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';

import { Leader } from '../shared/leader'; // class //
import { LEADERS } from '../shared/leaders'; // constant //
import { LeaderService } from '../services/leader.service'; // service //

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;

  leaders: Leader[];
  selectedLeader: Leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService, 
    private leaderService: LeaderService) { }

  ngOnInit() {
    this.dish = this.dishservice.getFeaturedDish();
    this.promotion = this.promotionservice.getFeaturedPromotion();

    this.leaders = this.leaderService.getLeaders();
  //  this.leader = this.leaderService.getFeaturedLeader();

  }

}