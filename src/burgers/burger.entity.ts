import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Ingredient } from 'src/ingredients/ingredient.entity';
import { BurgerIngredient } from './burger-ingredient.entity';

@Entity()
export class Burger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  // @Column({ type: 'json' })
  // ingredients: Array<{
  //   ingredient_id: number;
  //   ingredient_name: string;
  //   ingredient_amount: number;
  // }>;

  @OneToMany(
    () => BurgerIngredient,
    (burgerIngredient) => burgerIngredient.burgerId,
    { cascade: true },
  )
  ingredients: BurgerIngredient[];
}
