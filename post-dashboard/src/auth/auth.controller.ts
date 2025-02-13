import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('login')
    async login(@Body()logindto : LoginDto){
        const {email,password} = logindto;
        return await this.authService.login(email,password);
        
    }   

    @Post('logout')
    async logout(){
        const result = await this.authService.logout();
        return {message:result};
    }
}
