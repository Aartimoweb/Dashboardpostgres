import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true , envFilePath: ".env"}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject : [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USERNAME'),
          password : configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          synchronize: false,
          entities:[User],
        };
      },
      
    }),
    UserModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
