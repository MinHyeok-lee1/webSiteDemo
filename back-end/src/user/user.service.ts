import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { DeleteResult } from 'mongodb';
import { FilterQuery } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
  ) {
    userModel.events.on('error', (err) =>
      console.log('* ERROR * = ', err.message),
    );
  }

  async createMany(numbers: number): Promise<CreateUserDto[]> {
    let userList: CreateUserDto[] = [];
    for (let i = 0; i < Number(numbers); i++) {
      let randomNumber = this.getRandomNumberRange(1, 3);
      let createAt = this.getRandomDate(new Date(2023, 0, 1), new Date());

      let user: CreateUserDto = {
        userBase: {
          name: `userDummy${i}`,
          major: 1,
          age: 1,
          role:
            randomNumber === 1
              ? UserRole.Warrior
              : randomNumber === 2
              ? UserRole.Magician
              : randomNumber === 3
              ? UserRole.Thief
              : null,
        },
        userPower: {
          level: 1,
          skills: ['NONE'],
          sheildPower: 1,
          magicPower: 1,
          swordPower: 1,
        },

        // name: `userDummy${i}`,
        // major: 1,
        // age: 1,
        // role:
        //   randomNumber === 1
        //     ? UserRole.Warrior
        //     : randomNumber === 2
        //     ? UserRole.Magician
        //     : randomNumber === 3
        //     ? UserRole.Thief
        //     : null,
        // level: 1,
        // skills: ['NONE'],
        // sheildPower: 1,
        // magicPower: 1,
        // swordPower: 1,

        createdAt: createAt,
      };
      userList.push(user);
    }

    const createUser = await this.userModel.insertMany(userList);
    return createUser;
  }

  async create(createUserDto: CreateUserDto[]): Promise<CreateUserDto[]> {
    for (let userDto of createUserDto) {
      userDto.createdAt = new Date();
    }

    return await this.userModel.create(createUserDto);
  }

  async createOne(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    createUserDto.createdAt = new Date(Date.now());
    const createUser = new this.userModel(createUserDto);

    return createUser.save();
  }

  getRandomNumberRange(min: number, max: number) {
    if (min === max) return 'equal Number';
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomNumberDigit(digit: number) {
    if (digit < 1) return 'parameter is bigger than 0';
    let divide = 1;
    for (let i = 0; i < digit; i++) divide = divide * 10;
    return Math.floor(Math.random() * divide);
  }

  getRandomDate(start: Date, end: Date) {
    const startDate = start.getTime();
    const endDate = end.getTime();

    return new Date(startDate + Math.random() * (endDate - startDate));
  }

  async userPagenation(): Promise<User[]> {
    let page1: User[], page2: User[], page3: User[];
    // try {
    //   page1 = await this.model.find().limit(2);
    // } catch (err: unknown) {
    //   console.log(err);
    // }
    // try {
    //   page2 = await this.model.find().skip(2).limit(2);
    // } catch (err: unknown) {
    //   console.log(err);
    // }
    page1 = await this.userModel.find().limit(2);
    page2 = await this.userModel.find().skip(2).limit(2);
    let latest = null;
    const cursor = this.userModel.collection.find().limit(2);
    while (await cursor.hasNext()) {
      latest = await cursor.next();
    }

    // try {
    //   page3 = await this.model
    //     .find({ createdAt: { $gt: latest.createdAt } })
    //     .limit(2);
    // } catch (err: unknown) {
    //   console.log(err);
    // }
    page3 = await this.userModel
      .find({ createdAt: { $gt: latest.createdAt } })
      .limit(2);
    return page3;
  }

  async getAll(): Promise<User[]> {
    // try {
    //   await this.model.findOne({ _id: 'zz' });
    // } catch (err) {
    //   console.log('@@@@', err.message);
    // }
    // console.log('11', await this.model.find());
    // console.log('22', await this.model.find().exec());
    // console.log('33', await this.model.find().then());

    // const query = this.userModel.findOne({
    //   name: 'string',
    // });
    // query.find({
    //   age: { $gte: 0 },
    // });

    // const query = this.userModel.findOne({});

    // const t = await this.userModel.ensureIndexes({
    //   'userBase.role': 1,
    //   'userBase.name': 1,
    // });
    const query = this.userModel.find({
      'userBase.role': 'Magician',
      'userBase.name': /3/,
      // 'userBase.name': { $eq: 'userDummy1333' },
      // 'userBase.name': { $regex: '333' },
    });

    // hint()의 사용
    // const a: any = await this.userModel
    //   .find({
    //     'userBase.role': 'Magician',
    //     'userBase.name': /3/,
    //   })
    //   .explain('executionStatus')
    //   .hint({ $natural: 1 });

    // const b: any = await this.userModel
    //   .find({
    //     'userBase.role': 'Magician',
    //     'userBase.name': /3/,
    //   })
    //   .explain('executionStatus');

    // 탐색순서의 중요성 (관계 없다)
    // const a: any = await this.userModel
    //   .find({
    //     'userBase.name': /3/,
    //     'userBase.role': 'Magician',
    //   })
    //   .explain('executionStatus');

    // const b: any = await this.userModel
    //   .find({
    //     'userBase.role': 'Magician',
    //     'userBase.name': /3/,
    //   })
    //   .explain('executionStatus');

    // 정렬순서의 중요성 (관계 있다)
    const a: any = await this.userModel
      .find({})
      .sort({ 'userBase.name': 1, 'userBase.role': 1 })
      .explain('executionStatus');

    const b: any = await this.userModel
      .find({})
      .sort({ 'userBase.role': 1, 'userBase.name': 1 })
      .explain('executionStatus');

    console.log('인덱싱 전 = ', a.executionStats.executionTimeMillis);

    console.log('인덱싱 후 = ', b.executionStats.executionTimeMillis);

    const x = query.exec();
    // if (!x) throw new BadRequestException();

    // console.log('Document Number = ', (await x).length);
    return x;
  }

  async deleteAll(): Promise<DeleteResult> {
    // let fQuery: FilterQuery<User> = { _Id: token._Id };
    return await this.userModel.deleteMany({});
  }
}
