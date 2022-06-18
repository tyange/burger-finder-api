import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ApiController } from './api/api.controller';
import { BurgersModule } from './burgers/burgers.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { Ingredient } from './ingredients/ingredient.entity';
import { Burger } from './burgers/burger.entity';
import { BurgerIngredient } from './burgers/burger-ingredient.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'tyange12',
      database: 'test_burger2',
      entities: [Ingredient, Burger, BurgerIngredient],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    BurgersModule,
    IngredientsModule,
  ],
  controllers: [AppController, ApiController],
  providers: [AppService],
})
export class AppModule {}
