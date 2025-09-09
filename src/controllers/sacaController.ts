import { Request, Response} from 'express'
import { appDataSource } from '@config/data_source'
import { Saca} from '@entities/Saca'

const repo = appDataSource.getRepository(Saca);

export class SacaController {
    static async listar ( req: Request, res: Response) {
        const sacas = await repo.find({ order: { id: 'ASC'}});
        res.json(sacas);
    }

    static async buscarSaca ( req: Request, res: Response) {
        const id = Number(req.params.id);
        const saca = await repo.findOneBy({id});
        res.json(saca);
    }

    static async criar (req: Request, res: Response){
        const {peso_kg,data_armazenamento,cliente,cultura} = req.body;
        if (!peso_kg || !data_armazenamento || !cliente || !cultura) return res.status(400).json({message: 'Preencha todos os campos obrigatórios!'})
        try{
            const criado = repo.create({cliente,cultura});
            await repo.save(criado);
            res.status(201).json({ message: 'Saca adicionada com sucesso.'});
        }
        catch(err: any){
            console.log(err);
            res.status(500).json({message: 'Erro no servidor!'});
        }
    }

    static async atualizar (req: Request, res: Response) {
        const id = Number(req.params.id);
        const {peso_kg,data_armazenamento,cliente,cultura} = req.body;
        const saca = await repo.findOneBy({id});
        if(!saca)  return res.status(404).json({ message: 'Saca não encontrada.' });
    
            saca.peso_kg = peso_kg ?? saca.peso_kg;
            saca.cliente = cliente ?? saca.cliente;
            saca.cultura = cultura ?? saca.cultura;
    
            try{
                const salvo =  await repo.save(saca);
                res.json(salvo);
            }
    
            catch(err:any) {
                console.log(err);
                res.status(500).json({message: 'Erro no servidor!'});
            }
    }

    static async excluir (req: Request, res: Response) {
        const id = Number(req.params.id);
        const apagar = repo.delete(id);
        if(!(await apagar).affected) return res.status(404).json({message: "Saca não encontrada."})
        res.status(200).json({message: 'Saca excluída com sucesso.'}).send();
    }
}