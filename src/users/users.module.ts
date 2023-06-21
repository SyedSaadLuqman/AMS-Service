import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { IsEmailAvailable } from './dto/IsEmailAvailable';
import FilesHelper from 'files/FilesHelper';
import { IsUniEmailUnique } from './dto/IsUniEmailUnique';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, IsEmailAvailable, IsUniEmailUnique, FilesHelper],
  exports: [UserService], //As we need to use userService in other modules apart from usermodule
})
export class UserModule {}
