import { BaseEntity } from "@core/entities";
import { Column, Entity } from "typeorm";

@Entity()
export class Feedback extends BaseEntity{
  
    @Column({ 
        type: 'varchar', length: 255 
    })
    public content: string;
  
    @Column({ 
        type: 'date', default: () => 'CURRENT_DATE' 
    })
    public created_at: Date;
  
    @Column({ type: 'int' })
    public commented_by: number;
}