import { Ingredient } from 'src/shared/ingredient.interface';

export class CreateBurgerDto {
  name: string;
  brand: string;
  ingredients: Ingredient[];
}
