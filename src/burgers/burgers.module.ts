import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Burger } from './burger.entity';
import { BurgersController } from './burgers.controller';
import { Ingredient } from 'src/ingredients/ingredient.entity';
import { BurgerIngredient } from './burger-ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Burger, BurgerIngredient])],
  providers: [],
  controllers: [BurgersController],
})
export class BurgersModule {}
