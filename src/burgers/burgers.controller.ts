import { Burger } from './burger.entity';
import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateBurgerDto } from './dto/create-burger.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('burgers')
export class BurgersController {
  constructor(
    @InjectRepository(Burger)
    private readonly burgerRepository: Repository<Burger>,
  ) {}

  @Get()
  findAll() {
    console.log('getting all burgers');
    return 'getting all burgers';
  }

  @Get(':id')
  findBurger() {
    console.log('find burger');
  }

  // @Post()
  // create(@Body() createBurgerDto: CreateBurgerDto): Promise<Burger> {
  //   const burger = new Burger();
  //   burger.name = createBurgerDto.name;
  //   burger.brand = createBurgerDto.brand;
  //   burger.ingredients = createBurgerDto.ingredients;

  //   return this.burgerRepository.save(burger);
  // }
  @Post()
  create(@Body() createBurgerDto: CreateBurgerDto) {
    console.log(createBurgerDto);
  }

  @Delete(':id')
  deleteBurger() {
    console.log('delete burger');
  }

  @Patch(':id')
  updateBurger() {
    console.log('update burger');
  }
}
