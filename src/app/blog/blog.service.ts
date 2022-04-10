import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Blog } from './blog.model';
// import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class BlogService {

  constructor(
    private http: HttpClient) {
}

  private blog: Blog[] = [
    new Blog(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      ),
    new Blog('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      )
  ];
  // constructor(private slService: ShoppingListService) {}

  getBlogs() {
    return this.blog.slice();
  }

  getBlog(index: number) {
    return this.blog[index];
  }

  // addIngredientsToShoppingList(ingredients: Ingredient[]) {
  //   // this.slService.addIngredients(ingredients);
  // }
}
