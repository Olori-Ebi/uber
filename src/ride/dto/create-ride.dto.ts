import { IsNotEmpty, IsNumber, IsOptional, IsUUID, Min, Max } from "class-validator";

export class CreateRideDto {
    @IsOptional()
    @IsUUID()
    driverId?: string;

    @IsNumber()
    @Min(-90)
    @Max(90)
    pickup_latitude: number;

    @IsNumber()
    @Min(-180)
    @Max(180)
    pickup_longitude: number;

    @IsNumber()
    @Min(-90)
    @Max(90)
    dropoff_latitude: number;

    @IsNumber()
    @Min(-180)
    @Max(180)
    dropoff_longitude: number;
}
