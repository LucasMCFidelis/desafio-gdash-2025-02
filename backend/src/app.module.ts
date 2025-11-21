import { Module, NotFoundException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
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
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
