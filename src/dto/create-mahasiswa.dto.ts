import { ApiProperty } from "@nestjs/swagger";
import { Jenis_kelamin } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class CreateMahasiswaDTO {

    // membuat properties nim yang bersifat string, tidak boleh kosong, dan panjangnya 
    // 30 karakter
    @ApiProperty({ description : "NIM Mahasiswa", type : String, example : "105841102222" })
    @IsString()
    @IsNotEmpty()
    @Length(1, 30)
    nim : string;

    //membuat properties nama yang bersifat string, tidak boleh kosong, dan panjangnya
    // 30 karakter
    @ApiProperty({ description : "Nama Mahasiswa", type : String, example : "Ali Sulton S Palilati" })
    @IsString()
    @IsNotEmpty()
    @Length(1, 30)
    nama : string

    @ApiProperty({ description : "Kelas", type : String, example : "5A" })
    @IsString()
    @IsNotEmpty()
    @Length(1, 30)
    kelas : string

    @ApiProperty({ description : "Jurusan", type : String, example : "Informatika" })
    @IsString()
    @IsNotEmpty()
    @Length(1, 30)
    jurusan : string

    @ApiProperty({ description : "Jenis Kelamin", enum : Jenis_kelamin, example : "L" })
    @IsEnum(Jenis_kelamin)   
    jenis_kelamin : Jenis_kelamin
}

