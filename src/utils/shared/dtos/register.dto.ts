import {IsDefined, IsEmail, IsNotEmpty, IsString} from "class-validator";

export class RegisterDto{

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    password: string
}