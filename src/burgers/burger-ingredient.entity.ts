import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
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

  @ManyToOne(() => Burger, (burger) => burger.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'burger_id' })
  burger: Burger;

  @Column()
  amount: number;
}
