import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { UserType } from './enum';
import { Driver } from '@/driver/entities/driver.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) { }
  async register(createAuthDto: RegisterDto) {
    const { email, password, user_type, vehicle_make, vehicle_model, license_plate } = createAuthDto;

    const existingUser = await this.authRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.authRepository.create({
      email, password_hash: hashedPassword, user_type
    })
    await this.authRepository.save(user);
    if (user_type === UserType.DRIVER) {
      if (!vehicle_make || !vehicle_model || !license_plate) {
        throw new BadRequestException("Missing vehicle details for driver registration");
      }

      const driver = this.driverRepository.create({
        vehicle_make,
        vehicle_model,
        license_plate,
        user,
      });

      await this.driverRepository.save(driver);

      return { message: "Driver registered successfully", user, driver };
    }
    return { message: "Rider registered successfully", user };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.authRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const token = this.jwtService.sign({ id: user.id, email: user.email, user_type: user.user_type });

    return { token, user };
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
