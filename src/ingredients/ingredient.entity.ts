import { BurgerIngredient } from './../burgers/burger-ingredient.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  kind: string;

  @OneToMany(
    () => BurgerIngredient,
    (burgerIngredient) => burgerIngredient.ingredient,
  )
  withBurgers: BurgerIngredient[];
}
