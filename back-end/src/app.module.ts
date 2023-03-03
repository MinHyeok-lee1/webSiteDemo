import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

// const dbInfo = isUseAuthDB()
//   ? 'mongodb+srv://' +
//     process.env.DB_ID +
//     ':' +
//     process.env.DB_PWD +
//     '@' +
//     process.env.DB_CLUSTER +
//     '/' +
//     process.env.DB_NAME
//   : 'mongodb+srv://' + process.env.DB_CLUSTER + '/' + process.env.DB_NAME;
// console.log(dbInfo);
const dbInfo =
  'mongodb+srv://kfdd6630:test1234!@cluster0.exm9u.mongodb.net/test';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   cache: true,
    //   load: [config],
    // }),
    // TypegooseModule.forRoot(dbInfo),
    TypegooseModule.forRootAsync({
      useFactory: () => ({
        uri: dbInfo,
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
