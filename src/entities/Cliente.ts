import { isCPF } from "brazilian-values";
import { IsDate, IsNotEmpty } from "class-validator";
import { IsCPF } from "class-validator-cpf";
import { Column,Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity ({name: 'clientes'})
export class Cliente {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'text', name: 'nome'})
    nome!: string;

    @Column({unique: true, type: 'varchar',length: 11,name: 'cpf'})
    @IsNotEmpty({ message: 'CPF não pode ser vazio!' })
    @IsCPF ({message: "CPF inválido!"})
    cpf!: string;
    
    @Column({name: 'data_nascimento'})
    @IsDate({ message: 'Data de nascimento inválida!' })
    data_nasc!: Date;

    @Column ({type: 'text',name:'endereço'})
    endereco!: string;

    @Column ({type: 'text'})
    cep!: string;

    @Column ({ type: 'text', name: 'uf'})
    uf!: string;

    @Column ({type: 'text',name:'cidade'})
    cidade!: string;

    @Column ({type: 'text',name: 'telefone'})
    telefone!: string;

  /*  @Column ({ type: 'int'})
    sacas!: number;*/


}

