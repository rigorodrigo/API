import { Request, Response} from 'express'
import { appDataSource } from '@config/data_source'
import { Cliente} from '@entities/Cliente'

const repo = appDataSource.getRepository(Cliente);

export class ClienteController {
    static async listar ( req: Request, res: Response) {
        const clientes = await repo.find({ order: { id: 'ASC'}});
        res.json(clientes);
    }

    static async buscarCliente ( req: Request, res: Response) {
        const id = Number(req.params.id);
        const cliente = await repo.findOne({ where: {id}, relations: {sacas: true}})
        res.json(cliente);
    }

    static async criar (req: Request, res: Response){
        const {nome,cpf,data_nasc,cep, uf, endereco, cidade,telefone} = req.body;
        if (!nome || !cpf|| !data_nasc|| !cep||  !telefone) return res.status(400).json({message: 'Preencha todos os campos obrigatórios!'})
        try{
            const criado = repo.create({nome,cpf,data_nasc,cep,uf,endereco,cidade,telefone});
            await repo.save(criado);
            res.status(201).json({ message: 'Cliente cadastrado com sucesso.'});
        }
        catch(err: any){
            if (err?.code === '23505') return res.status(409).json({ message: 'CPF já cadastrado!' });
            console.log(err);
            res.status(500).json({message: 'Erro no servidor!'});
        }
    }

    static async atualizar (req: Request, res: Response) {
        const id = Number(req.params.id);
        const {nome,cpf,data_nasc,cep, uf, endereco, cidade,telefone} = req.body;
        const cliente = await repo.findOneBy({id});
        if(!cliente)  return res.status(404).json({ message: 'Cliente não encontrado.' });

        cliente.nome = nome ?? cliente.nome;
        cliente.cpf = cpf ?? cliente.cpf;
        cliente.data_nasc = data_nasc ?? cliente.data_nasc;
        cliente.cep = cep ?? cliente.cep;
        cliente.uf = uf ?? cliente.uf;
        cliente.endereco = endereco ?? cliente.endereco;
        cliente.cidade = cidade ?? cliente.cidade;
        cliente.telefone = telefone ?? cliente.telefone;

        try{
            const salvo =  await repo.save(cliente);
            res.json(salvo);
        }

        catch(err:any) {
            if (err?.code === '23505') return res.status(409).json({ message: 'CPF já cadastrado!' });
            console.log(err);
            res.status(500).json({message: 'Erro no servidor!'});
        }
    }

    static async excluir (req: Request, res: Response) {
        const id = Number(req.params.id);
        const apagar = repo.delete(id);
        if(!(await apagar).affected) return res.status(404).json({message: "Cliente não encontrado."})
        res.status(200).json({message: 'Cliente excluído com sucesso.'}).send();
    }
}