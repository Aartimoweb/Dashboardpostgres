import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword, 
    });
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user && user.profile) {
      user.profile = `http://localhost:3000/uploads/${user.profile}`;
    }

    return user;

  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }

   
    if (updateUserDto.profile) {
      user.profile = updateUserDto.profile;
    }

    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      user.password = hashedPassword;  
    }

    
    user.first_name = updateUserDto.first_name || user.first_name;
    user.last_name = updateUserDto.last_name || user.last_name;
    user.password = updateUserDto.password || user.password;
    user.email = updateUserDto.email || user.email;
    user.contact = updateUserDto.contact || user.contact;
    user.gender = updateUserDto.gender || user.gender;

    await this.userRepository.save(user);
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
