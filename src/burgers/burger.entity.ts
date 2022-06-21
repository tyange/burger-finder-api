import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
