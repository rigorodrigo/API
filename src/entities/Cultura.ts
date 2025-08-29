import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Saca } from './Saca'

@Entity ({name: 'culturas'})
export class Cultura {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column ({type: 'varchar', length: 15, unique: true})
    nome!: string;

    @OneToMany (() => Saca, (saca) => saca.cultura)
    sacas!: Saca[];

}