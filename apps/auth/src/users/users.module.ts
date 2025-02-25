import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from './model/users.schema';
import { UserRepository } from './users.repository';

@Module({
  imports: [DatabaseModule, MongooseModule.forFeature(
    [
      {
        name: UserDocument.name, schema: UserSchema
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService]
})
export class UsersModule { }
