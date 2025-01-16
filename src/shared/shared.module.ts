import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';


// kegunaan module yaitu untuk merapihkan kodingan yang sudah kita buat, yaitu salah satunya yaitu prismaservide
@Global()
@Module({
    providers: [PrismaService]
})
export class SharedModule {}
