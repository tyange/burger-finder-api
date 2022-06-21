import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Burger } from './burger.entity';
import { CreateBurgerDto } from './dto/create-burger.dto';
import { BurgerIngredient } from './burger-ingredient.entity';
import { AddIngredientDto } from './dto/add-ingredients.dto';
import { UpdateBurgerDto } from './dto/update-burger.dto';

@Controller('burgers')
export class BurgersController {
  constructor(
    @InjectRepository(Burger)
    private burgerRepository: Repository<Burger>,
    @InjectRepository(BurgerIngredient)
    private burgerIngRepository: Repository<BurgerIngredient>,
  ) {}

  @Get()
  findAll() {
    return this.burgerRepository.find();
  }

  @Get(':id')
  findBurger(@Param('id') paramBgId: number) {
    return this.burgerRepository.findOne(paramBgId, {
      relations: ['ingredients'],
    });
  }

  @Post()
  create(@Body() createBurgerDto: CreateBurgerDto): Promise<Burger> {
    const burger = this.burgerRepository.create({
      name: createBurgerDto.name,
      brand: createBurgerDto.brand,
    });

    return this.burgerRepository.save(burger);
  }

  @Post(':id')
  addIngredients(
    @Param('id') id: number,
    @Body() addIngredientDto: AddIngredientDto,
  ) {
    addIngredientDto.ingredients.forEach((ing) => {
      const burgerIng = new BurgerIngredient();
      burgerIng.burgerId = id;
      burgerIng.ingredientId = ing.ingredient_id;
      burgerIng.amount = ing.ingredient_amount;

      this.burgerIngRepository.save(burgerIng);
    });
  }

  @Delete(':id')
  deleteBurger(@Param('id') paramBgId: string) {
    console.log('delete burger');
    return this.burgerRepository.delete(paramBgId);
  }

  @Patch(':id')
  async updateBurger(
    @Param('id') paramBgId: number,
    @Body() updateBurgerDto: UpdateBurgerDto,
  ) {
    // parameter로 전달된 burger id에 따른
    // 저장된 버거 데이터를 찾아서 burger 변수에 저장하고 입력 받은 버거 이름와 브랜드명으로 변경.
    const burger = await this.burgerRepository.findOne(paramBgId);
    burger.name = updateBurgerDto.name;
    burger.brand = updateBurgerDto.brand;

    // parameter로 전달된 burger id로 저장된 버거 데이터를 불러오기.
    const storedBurgerIngs = await this.burgerIngRepository.find({
      where: {
        burgerId: paramBgId,
      },
    });

    // 입력 받은 재료 데이터를 변수에 저장.
    const receivedBurgerIngs = updateBurgerDto.ingredients;

    // 저장된 버거 데이터가 없고, 입력된 버거 데이터도 없을 때.
    if (
      (!storedBurgerIngs || storedBurgerIngs.length === 0) &&
      (!receivedBurgerIngs || receivedBurgerIngs.length === 0)
    ) {
      // 버거의 이름과 브랜드명만 업데이트.
      return this.burgerRepository.update(paramBgId, burger);
    }

    // 아래는 updating method들.

    // 입력 받은 데이터에서 새로운 재료 데이터가 있을 경우 삽입.
    const insertNewIngs = (
      bgId: number,
      inputIngs: Array<{
        ingredient_id: number;
        ingredient_amount: number;
      }>,
    ) => {
      inputIngs.forEach((ing) => {
        const newBurgerIng = new BurgerIngredient();
        newBurgerIng.burgerId = bgId;
        newBurgerIng.ingredientId = ing.ingredient_id;
        newBurgerIng.amount = ing.ingredient_amount;

        this.burgerIngRepository.save(newBurgerIng);
      });
    };

    // 입력 받은 데이터에는 해당 재료의 데이터가 없고,
    // 기존의 재료 데이터 테이블에는 레코드가 존재할 때.
    // 기존의 재료 데이터 테이블에서 해당 재료의 id를 가진 레코드를 삭제.
    const deleteStoredIngs = (storedIngs: BurgerIngredient[]) => {
      storedIngs.forEach((ing) => {
        this.burgerIngRepository.delete(ing.id);
      });
    };

    // 입력 받은 데이터 중에 이미 저장된 데이터와 같은 재료 id 값을 가진 데이터가 있을 경우,
    // 해당 데이터의 amount 값을 비교하여
    // 값이 기존의 값과 동일할 경우 업데이트를 진행하지 않고,
    // 다를 경우 입력 받은 amount의 값으로 업데이트를 진행.
    const updateStoredIngs = (
      storedIngs: BurgerIngredient[],
      intrsIngs: Array<{ ingredient_id: number; ingredient_amount: number }>,
    ) => {
      intrsIngs.forEach((intrsIng) => {
        const updatingIng = storedIngs.find(
          (storedIng) => storedIng.ingredientId === intrsIng.ingredient_id,
        );

        if (intrsIng.ingredient_amount === updatingIng.amount) return;

        updatingIng.amount = intrsIng.ingredient_amount;

        this.burgerIngRepository.update(updatingIng.id, updatingIng);
      });
    };

    // 저장된 버거 데이터가 존재하고, 입력된 버거 데이터도 존재할 때.
    if (storedBurgerIngs.length > 0 && receivedBurgerIngs.length > 0) {
      // 입력 받은 데이터와 저장되 버거 데이터이 교집합을 이루는 데이터를 추출한다.
      const intersectionIngs = receivedBurgerIngs.filter((rcvIng) =>
        storedBurgerIngs.some(
          (storedIng) => rcvIng.ingredient_id === storedIng.ingredientId,
        ),
      );

      // 교집합 데이터가 없을 경우 더이상 진행하지 않고 빠져 나감.
      if (intersectionIngs.length === 0) return;

      // 교집합 데이터가 있을 경우,

      // 기존에 저장된 데이터와 교집합 데이터를 이용해 업데이트를 진행.
      updateStoredIngs(storedBurgerIngs, intersectionIngs);

      // 저장된 데이터에서 교집합 데이터를 제거하여,
      // 입력되진 않았지만, 저장은 되어 있는 재료 데이터를 추출.
      // 해당하는 데이터들은 사용자가 더이상 저장하길 원하지 않는 데이터이므로 삭제를 진행.
      const diffStoredIngs = storedBurgerIngs.filter(
        (storedIng) =>
          !intersectionIngs.some(
            (intrsIng) => storedIng.ingredientId === intrsIng.ingredient_id,
          ),
      );

      deleteStoredIngs(diffStoredIngs);

      // 입력 받은 데이터에서 교집합 데이터를 제거하여,
      // 입력은 됐지만, 저장은 돼 있지 않은 데이터를 추출.
      // 해당 데이터는 사용자가 새로 저장하길 원하는 데이터이므로 저장 작업을 진행.
      const diffReceiveIngs = receivedBurgerIngs.filter(
        (rcvIng) =>
          !intersectionIngs.some(
            (intrsIng) => rcvIng.ingredient_id === intrsIng.ingredient_id,
          ),
      );

      insertNewIngs(paramBgId, diffReceiveIngs);
    }

    // 저장된 데이터는 있으나 입력 받은 데이터가 없을 경우,
    // 저장된 데이터 모두를 삭제.
    if (
      storedBurgerIngs &&
      (!receivedBurgerIngs || receivedBurgerIngs.length === 0)
    ) {
      deleteStoredIngs(storedBurgerIngs);
    }

    // 입력 받은 데이터는 있으나, 저장된 데이터가 없을 경우,
    // 입력 받은 데이터 모두를 새롭게 저장.
    if (
      receivedBurgerIngs &&
      (!storedBurgerIngs || storedBurgerIngs.length === 0)
    ) {
      insertNewIngs(paramBgId, receivedBurgerIngs);
    }

    // 재료 데이터가 있을 경우 위 프로세스를 모두 진행한 뒤에 버거 데이터를 저장.
    return this.burgerRepository.update(paramBgId, burger);
  }
}
