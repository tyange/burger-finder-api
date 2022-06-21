import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Burger } from './burger.entity';
import { Ingredient } from 'src/ingredients/ingredient.entity';

@Entity()
export class BurgerIngredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'burger_id' })
  burgerId: number;

  @Column({ name: 'ingredient_id' })
  ingredientId: number;

  @ManyToOne(() => Burger, (burger) => burger.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'burger_id', referencedColumnName: 'id' })
  burger: Burger;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;

  @Column()
  amount: number;
}
