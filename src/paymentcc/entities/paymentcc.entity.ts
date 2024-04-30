import { BaseEntity } from "@core/entities";
import { Column, Entity } from "typeorm";

@Entity()
export class PaymentCC extends BaseEntity {
    @Column()
    payment_id: number

    @Column()
    card_number?: string

    @Column()
    expiration_date?: Date //Checar herança depois. 

    @Column()
    security_code?: number

    @Column()
    account_holder?: string
}