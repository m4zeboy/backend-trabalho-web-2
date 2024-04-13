import { BaseEntity } from '@core/entities'
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Voucher {

    @PrimaryGeneratedColumn()
    voucher_id: number;

    @Column()
    order_id: number;

    @Column()
    validated_at: Date;

    @Column()
    expires_in: Date;

}