import { BurgerIngredient } from './../burger-ingredient.entity';
import { Ingredient } from 'src/ingredients/ingredient.entity';

export class CreateBurgerDto {
  name: string;
  brand: string;
  ingredients: Array<{
    ingredient_id: number;
    ingredient_name: string;
    ingredient_amount: number;
  }>;
  // ingredients: BurgerIngredient[];
}
