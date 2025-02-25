import { Auth } from "@/auth/entities/auth.entity";
import { AvailabilityStatus } from "@/auth/enum";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('driver')
export class Driver {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50 })
    vehicle_make: string;

    @Column({ type: 'varchar', length: 255 })
    vehicle_model: string;

    @Column({ type: 'varchar', length: 255 })
    license_plate: string;

    @Column({ type: 'enum', enum: AvailabilityStatus, default: AvailabilityStatus.AVAILABLE })
    status: string | AvailabilityStatus;

    @OneToOne(() => Auth)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
    user: Auth;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;
}
