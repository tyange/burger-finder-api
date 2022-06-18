import { BurgerIngredient } from './../burgers/burger-ingredient.entity';
import { Burger } from './../burgers/burger.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  kind: string;
}
