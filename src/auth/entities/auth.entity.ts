import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserType } from "../enum";

@Entity('auth')
export class Auth {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password_hash: string;

    @Column({ type: 'enum', enum: UserType })
    user_type: string | UserType;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    updated_at: Date;
}
