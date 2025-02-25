import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { IAuthedUser } from '@/auth/interface';
import { Auth } from '@/auth/entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ride } from './entities/ride.entity';
import { RideStatus } from '@/auth/enum';

@Injectable()
export class RideService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(Ride)
    private readonly rideRepository: Repository<Ride>,
  ) { }
  async create(createRideDto: CreateRideDto, authedUser: IAuthedUser) {
    const { pickup_latitude, pickup_longitude, dropoff_latitude, dropoff_longitude } = createRideDto;
    const user = await this.authRepository.findOne({ where: { id: authedUser.id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Implement the logic to create a ride request
    const ride = this.rideRepository.create({
      rider: user,
      pickup_latitude,
      pickup_longitude,
      dropoff_latitude,
      dropoff_longitude,
      status: RideStatus.REQUESTED,
    });

    return await this.rideRepository.save(ride);
  }

  findAll() {
    return `This action returns all rider`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rider`;
  }

  remove(id: number) {
    return `This action removes a #${id} rider`;
  }
}
