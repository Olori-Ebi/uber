import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from '@/auth/entities/auth.entity';
import { Driver } from '@/driver/entities/driver.entity';
import { Ride } from './entities/ride.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth, Driver, Ride])],
  controllers: [RideController],
  providers: [RideService],
})
export class RideModule { }
