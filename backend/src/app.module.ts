import { Module, NotFoundException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

const DATABASE_URL = process.env.MONGODB_URL;

if (!DATABASE_URL) {
  throw new NotFoundException('Url do banco não encontrada');
}

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_URL, {
      dbName: process.env.MONGODB_NAME,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
