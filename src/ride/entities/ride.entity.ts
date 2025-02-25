import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Auth } from "@/auth/entities/auth.entity";
import { RideStatus } from "@/auth/enum";

@Entity("ride")
export class Ride {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Auth, { nullable: false })
    rider: Auth;

    @ManyToOne(() => Auth, { nullable: true })
    driver: Auth;

    @Column({ type: "decimal", precision: 10, scale: 7 })
    pickup_latitude: number;

    @Column({ type: "decimal", precision: 10, scale: 7 })
    pickup_longitude: number;

    @Column({ type: "decimal", precision: 10, scale: 7 })
    dropoff_latitude: number;

    @Column({ type: "decimal", precision: 10, scale: 7 })
    dropoff_longitude: number;

    @Column({ type: "enum", enum: RideStatus, default: RideStatus.REQUESTED })
    status: RideStatus;

    @CreateDateColumn()
    requested_at: Date;
}
