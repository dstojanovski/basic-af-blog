// import { Ingredient } from '../shared/ingredient.model';

export class Blog {
  public title: string;
  public body: string;
  // public imagePath: string;
  // public ingredients: Ingredient[];

  constructor(name: string, desc: string, imagePath: string) {
    this.title = name;
    this.body = desc;
    // this.imagePath = imagePath;
    // this.ingredients = ingredients;
  }
}
