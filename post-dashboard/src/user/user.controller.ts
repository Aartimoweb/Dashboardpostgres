
import { 
  Controller, Get, Post, Body, Patch, Param, Delete, 
  UseInterceptors, UploadedFile 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profile', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        callback(null,file.originalname);
      },
    }),
  }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() createUserDto: CreateUserDto) {
    let profileImageUrl: string | undefined;
    if(file){
      profileImageUrl = `http://localhost:3000/uploads/${file.filename}`;
    }else{
      const firstLetter = createUserDto.first_name.charAt(0).toUpperCase();
      const lastLetter = createUserDto.last_name.charAt(0).toUpperCase();
      profileImageUrl = `http://localhost:3000/fallback/${firstLetter}${lastLetter}.png`;
    }
   
  
    return await this.userService.create({
      ...createUserDto,
      profile: profileImageUrl, 
    });
  }
  

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('profile', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
      callback(null,file.originalname)
      },
    }),
  }))
  async update(@Param('id') id: number, @UploadedFile() file: Express.Multer.File, @Body() updateUserDto: UpdateUserDto) {
    const imageUrl = file ? `http://localhost:3000/uploads/${file.filename}` : undefined;
    return await this.userService.update(id, {
      ...updateUserDto,
      profile: imageUrl,  
    });
  }
  

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.userService.remove(id);
  }
}

