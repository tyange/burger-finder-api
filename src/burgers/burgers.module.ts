import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Burger } from './burger.entity';
import { BurgersController } from './burgers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Burger])],
  providers: [],
  controllers: [BurgersController],
})
export class BurgersModule {}
