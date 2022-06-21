import {
  Column,
  Entity,
  JoinColumn,
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

  @OneToMany(
    () => BurgerIngredient,
    (burgerIngredient) => burgerIngredient.burger,
  )
  ingredients: BurgerIngredient[];
}
