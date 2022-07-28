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

  @Column()
  ingredientName: string;

  @Column()
  amount: number;

  @ManyToOne(() => Burger, (burger) => burger.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'burger_id', referencedColumnName: 'id' })
  burger: Burger;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;
}
