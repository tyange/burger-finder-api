import { Ingredient } from 'src/shared/ingredient.interface';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Burger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ type: 'json' })
  ingredients: Ingredient[];
}
