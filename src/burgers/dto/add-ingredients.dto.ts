export class AddIngredientDto {
  ingredients: Array<{
    id: number;
    name: string;
    kind: string;
    amount: number;
  }>;
}
