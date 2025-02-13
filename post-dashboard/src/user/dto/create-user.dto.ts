
    import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

    export class CreateUserDto {
        @IsNotEmpty()
        @IsString()
        first_name: string;
    
        @IsNotEmpty()
        @IsString()
        last_name: string;
    
        @IsNotEmpty()
        @IsString()
        password: string;
    
        @IsNotEmpty()
        @IsEmail()
        email: string;
    
        @IsNotEmpty()
        @IsString()
        contact: string;
    
        @IsNotEmpty()
        @IsString()
        gender: string;
    
        @IsOptional() 
        profile?: string;
    }
    