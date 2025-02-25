import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { Roles } from '@/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@/auth/guard/jwt.auth.guard';
import { RolesGuard } from '@/auth/guard/roles.guard';
import { AuthedUser } from '@/auth/decorators/authed.user.decorator';
import { IAuthedUser } from '@/auth/interface';
import { ErrorResponseObject, SuccessResponseObject } from '@/shared/response.shared';

@Controller('ride')
export class RideController {
  constructor(private readonly riderService: RideService) {}

  @Roles('RIDER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createRideRequest(@Body() createRideDto: CreateRideDto, @AuthedUser() authedUser: IAuthedUser) {
    try {
      const response = await this.riderService.create(createRideDto, authedUser);
      return new SuccessResponseObject(
        'User created successfully',
        response,
      );
    } catch (error) {
      ErrorResponseObject(error, 'error creating ride request');
    }
  }

  @Get()
  findAll() {
    return this.riderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riderService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.riderService.remove(+id);
  }
}
