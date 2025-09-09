import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cultura } from "./Cultura";

@Entity({name: 'Sementes'})
export class Semente {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Cultura, {nullable: false})
    @JoinColumn({name: 'cultura_id'})
    cultura!: Cultura;

    @Column ({type: 'float' , default: 50.00})
    peso_kg!: number;

    @Column({ type: 'money' })
    preco!: number;

    @Column ({ type: 'varchar', length: 20})
    marca!: string;

    @Column ({ type: 'varchar', length: 20})
    variedade!: string;
}