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
import { Ingredient } from './ingredient.entity';

@Controller('ingredients')
export class IngredientsController {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientsRepository: Repository<Ingredient>,
  ) {}

  @Get()
  findAll() {
    console.log('find all ingredients');
    return this.ingredientsRepository.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ingredient> {
    return this.ingredientsRepository.findOne(id);
  }

  @Post()
  add(@Body() addIngredientDto: AddIngredientDto) {
    const ingredient = new Ingredient();
    ingredient.name = addIngredientDto.name;
    ingredient.kind = addIngredientDto.kind;
    ingredient.amount = addIngredientDto.amount;

    return this.ingredientsRepository.save(ingredient);
  }

  @Delete(':id')
  deleteIngredient() {
    console.log('delete ingredient');
  }

  @Put(':id')
  updateIngredient() {
    console.log('update ingredient');
  }
}
