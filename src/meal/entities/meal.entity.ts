
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()

export class Meal extends BaseEntity{

  @Column({ type: 'date' })
  meal_date: Date;

  @Column()
  shift: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  availability: number;
}
