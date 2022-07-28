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

  @Column({ nullable: true })
  isVegan: boolean;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(
    () => BurgerIngredient,
    (burgerIngredient) => burgerIngredient.burger,
    { nullable: true, eager: true },
  )
  ingredients: BurgerIngredient[];
}
