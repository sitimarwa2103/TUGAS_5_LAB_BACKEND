import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateMahasiswaDTO } from './dto/create-mahasiswa.dto';
import { updateMahasiswaDTO } from './dto/update-mahasiswa.dto';
import { createRuanganDTO } from './dto/create-ruangan.dto';
import { registerUserDTO } from './dto/register-user.dto';
import { loginUserDTO } from './dto/login-user.dto';
import { PassThrough } from 'stream';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { User } from './entity/user.entity';
import { AuthGuard } from './auth.guard';
import { UserDecorator } from './user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('mahasiswa')
  getMahasiswa() {
    return this.appService.getMahasiswa();
  }

  @Post('mahasiswa')
  @ApiBody({ type: CreateMahasiswaDTO })
  createMahasiswa(@Body() mahasiswa: CreateMahasiswaDTO) {
    return this.appService.addMahasiswa(mahasiswa);
  }

  @Delete('mahasiswa/:nim')
  deleteMahasiswa(@Param('nim') nim: string) {
    return this.appService.deleteMahasiswa(nim);
  }

  @Put('mahasiswa/:nim')
  @ApiBody({ type: CreateMahasiswaDTO })
  updateMahasiswa(
    @Param('nim') nim: string,
    @Body() mahasiswa: CreateMahasiswaDTO,
  ) {
    return this.appService.updateMahasiswa(nim, mahasiswa);
  }

  //tabel ruangan
  @Get('ruangan')
  getRuangan() {
    return this.appService.getRuangan();
  }

  @Post('ruangan')
  @ApiBody({ type: createRuanganDTO })
  createRuangan(@Body() ruangan: createRuanganDTO) {
    return this.appService.addRuangan(ruangan);
  }

  @Post('register')
  @ApiBody({ type: registerUserDTO })
  registerUser(@Body() user: registerUserDTO) {
    return this.appService.registerUser(user);
  }
  
  @Post('Login')
  @ApiBody({
    type: loginUserDTO,
  })
  async login(
    @Body() data: loginUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.appService.login(data);
    res.cookie('token', result.token);
    
    result.user = plainToInstance(User, result.user);

    return result;
  }

  @Get('user')
  getUsers() {
    return this.appService.getUsers();
  }

  @Get('/auth')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  auth(@UserDecorator() user: User) {
    return user;
  }

  @Get('logout')
  getLogout(@Res() res: Response) {
  res.cookie('token', null, { maxAge: 0 });
  res.status(200).send({ message: 'Logout berhasil' });
  }
}
