import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get('ingredients')
  findAllIngredients() {
    console.log('ingredients');
  }

  @Get('burgers')
  findAllBurgers() {
    console.log('burgers');
  }
}
