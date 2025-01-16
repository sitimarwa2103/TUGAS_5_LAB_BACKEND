
import { Global, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
@Global()
@Module({
  imports: [],
  providers: [AppService, PrismaService],
  exports: [AppService, PrismaService],
})
export class AuthModule {}
