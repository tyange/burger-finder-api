export class UpdateBurgerDto {
  name: string;
  brand: string;
  ingredients: Array<{
    ingredient_id: number;
    ingredient_amount: number;
  }>;
}
