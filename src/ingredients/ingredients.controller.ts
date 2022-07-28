import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddIngredientDto } from './dto/add-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './ingredient.entity';

@Controller('ingredients')
export class IngredientsController {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientsRepository: Repository<Ingredient>,
  ) {}

  @Get()
  findAll() {
    return this.ingredientsRepository.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ingredient> {
    return this.ingredientsRepository.findOne(id, {
      relations: ['withBurgers'],
    });
  }

  @Post()
  add(@Body() addIngredientDto: AddIngredientDto) {
    const ingredient = new Ingredient();
    ingredient.name = addIngredientDto.name;
    ingredient.kind = addIngredientDto.kind;

    return this.ingredientsRepository.save(ingredient);
  }

  @Delete(':id')
  deleteIngredient(@Param('id') id: string) {
    return this.ingredientsRepository.delete(id);
  }

  @Put(':id')
  updateIngredient(
    @Param('id') id: string,
    @Body() updatedIngredient: UpdateIngredientDto,
  ) {
    return this.ingredientsRepository.update(id, {
      name: updatedIngredient.name,
      kind: updatedIngredient.kind,
    });
  }
}
