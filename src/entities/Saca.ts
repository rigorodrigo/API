import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cultura } from './Cultura'
import { Cliente } from './Cliente'

@Entity ({name: 'sacas'})
export class Saca {
        
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'float', default: 60.00})
    peso_kg!: number;

    @Column({type: 'timestamptz'})
    data_armazenamento!: Date;

    @ManyToOne (() => Cliente,{nullable: false})
    @JoinColumn({name: 'cliente_id'})
    cliente!: Cliente;

    @ManyToOne(() => Cultura, {nullable: false})
    @JoinColumn({name: 'cultura_id'})
    cultura!: Cultura;
}