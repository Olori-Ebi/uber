import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@/config/db.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RideModule } from './ride/ride.module';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }), AuthModule, RideModule, DriverModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
