import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'produtos'})
export class Prdouto {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type: 'text', name: 'nome'})
    nome!:number

    @Column({type: 'text', name: 'tipo'})
    tipo!:number

    @Column({type: 'text', name: 'marca'})
    marca!:number

    @Column ({ type: 'float', name: 'quantidade'})
    quantidade!: number;

    @Column({type: 'varchar',length:2, name: 'unidade_medida'})
    unid_medida!:number
}