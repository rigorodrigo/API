import { IsDate, IsEmail, IsNotEmpty } from "class-validator";
import { IsCPF } from "class-validator-cpf";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({ name: 'Colaboradores'})
export class Colaborador{

    @PrimaryGeneratedColumn ()
    id!: number;

    @Column({type: 'text', name: 'nome'})
    nome!:number

    @Column({unique: true, type: 'varchar',length: 11,name: 'cpf'})
    @IsNotEmpty({ message: 'CPF não pode ser vazio!' })
    @IsCPF ({message: "CPF inválido!"})
    cpf!: string;

    @Column({name: 'data_nascimento'})
    @IsDate({ message: 'Data de nascimento inválida!' })
    data_nasc!: Date;

    @Column ({type: 'text',name: 'telefone',length: 15})
    telefone!: string;

    @Column ({type: 'text',unique: true})
    @IsEmail({},{ message: 'e-mail inválido' } )
    email!:string

    @CreateDateColumn({type: 'timestamp', default: () => 'now()'})
    criado_em!: Date
    @UpdateDateColumn()
    atualizado_em!: Date;

}