import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createRuanganDTO {
  @ApiProperty({ description: 'ID Ruangan', type: Number, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'Nama Ruangan', type: String, example: 'Lab Backend' })
  @IsString()
  @IsNotEmpty()
  nama_ruangan: string;
}