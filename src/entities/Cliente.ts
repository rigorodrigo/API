import { IsDate, IsNotEmpty } from "class-validator";
import { IsCPF } from "class-validator-cpf";
import { Column,Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Saca } from './Saca'


@Entity ({name: 'Clientes'})
export class Cliente {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', name: 'nome', length: 50})
    nome!: string;

    @Column({unique: true, type: 'varchar',length: 11,name: 'cpf'})
    @IsNotEmpty({ message: 'CPF não pode ser vazio!' })
    @IsCPF ({message: "CPF inválido!"})
    cpf!: string;
    
    @Column({name: 'data_nascimento'})
    @IsDate({ message: 'Data de nascimento inválida!' })
    data_nasc!: Date;

    @Column ({type: 'text',name:'endereco'})
    endereco!: string;

    @Column ({type: 'varchar', length: 9})
    cep!: string;

    @Column ({ type: 'varchar', name: 'uf',length: 2})
    uf!: string;

    @Column ({type: 'varchar',name:'cidade'})
    cidade!: string;

    @Column ({type: 'varchar',name: 'telefone',length: 15})
    telefone!: string;

    @OneToMany (() => Saca, (saca) => saca.cliente)
    sacas!: Saca[]; 


}

