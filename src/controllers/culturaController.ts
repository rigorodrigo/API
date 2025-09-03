import { Request, Response} from 'express'
import { appDataSource } from '@config/data_source'
import { Cultura} from '@entities/Cultura'

const repo = appDataSource.getRepository(Cultura);

export class CulturaController {
    static async listar ( req: Request, res: Response) {
        const culturas = await repo.find({ order: { id: 'ASC'}});
        res.json(culturas);
    }

    static async buscarCultura ( req: Request, res: Response) {
        const id = Number(req.params.id);
        const cultura = await repo.findOne({ where: {id}, relations: {sacas: true}})
        res.json(cultura);
    }

    static async criar (req: Request, res: Response){
        const {nome} = req.body;
        if (!nome ) return res.status(400).json({message: 'Preencha todos os campos obrigatórios!'})
        try{
            const criado = repo.create({nome});
            await repo.save(criado);
            res.status(201).json({ message: 'Cultura cadastrada com sucesso.'});
        }
        catch(err: any){
            if (err?.code === '23505') return res.status(409).json({ message: 'Nome de cultura já cadastrada!' });
            console.log(err);
            res.status(500).json({message: 'Erro no servidor!'});
        }
    }

    static async atualizar (req: Request, res: Response) {
        const id = Number(req.params.id);
        const {nome} = req.body;
        const cultura = await repo.findOneBy({id});
        if(!cultura)  return res.status(404).json({ message: 'Cultura não encontrada.' });

        cultura.nome = nome ?? cultura.nome;

        try{
            const salvo =  await repo.save(cultura);
            res.json(salvo);
        }

        catch(err:any) {
            if (err?.code === '23505') return res.status(409).json({ message: 'Nome de cultura já cadastrada!' });
            console.log(err);
            res.status(500).json({message: 'Erro no servidor!'});
        }
    }

    static async excluir (req: Request, res: Response) {
        const id = Number(req.params.id);
        const apagar = repo.delete(id);
        if(!(await apagar).affected) return res.status(404).json({message: "Cultura não encontrada."})
        res.status(200).json({message: 'Cultura excluída com sucesso.'}).send();
    }
}