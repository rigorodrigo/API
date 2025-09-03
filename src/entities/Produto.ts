import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'produtos'})
export class Produto {

    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type: 'text', name: 'nome'})
    nome!:number

    @Column({type: 'varchar', name: 'tipo',length: 15})
    tipo!:number

    @Column({type: 'text', name: 'marca'})
    marca!:number

    @Column ({ type: 'float', name: 'quantidade'})
    quantidade!: number;

    @Column({type: 'varchar',length:2, name: 'unidade_medida'})
    unid_medida!:number
}