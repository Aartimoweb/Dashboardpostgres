import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private loginRepository: Repository<User>,
        private configService: ConfigService,
    ) { }

    async login(email: string, password: string): Promise<{ success: boolean; role: string; users?: User[]; user?: User }> {
        const adminEmail = this.configService.get<string>('ADMIN_EMAIL')!;
        const adminPassword = this.configService.get<string>('ADMIN_PASSWORD')!;

        const isAdminPasswordValid = bcrypt.compare(password, adminPassword);
        if (email === adminEmail && await isAdminPasswordValid) {
            const users = await this.loginRepository.find();
            return {
                success: true,
                role: 'admin',
                users,
            };
        }

        const user = await this.loginRepository.findOne({ where: { email } });
        if (!user) {
            return { success: false, role: '' };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { success: false, role: '' };
        }
        return {
            success: true,
            role: 'user',
            user,
        };
    }
    async logout() {
        return 'LOGOUT SUCCESSFUL';
    }
}
