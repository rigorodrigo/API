import { Request, Response} from 'express'
import { appDataSource } from '@config/data_source'
import { Produto} from '@entities/Produto'

const repo = appDataSource.getRepository(Produto);

export class ProdutoController {
    static async listar ( req: Request, res: Response) {
        const produtos = await repo.find({ order: { id: 'ASC'}});
        res.json(produtos);
    }

    static async buscarProduto ( req: Request, res: Response) {
        const id = Number(req.params.id);
        const produto = await repo.findOneBy({id});
        res.json(produto);
    }

    static async criar (req: Request, res: Response){
        const {nome,marca,tipo,quantidade,unid_medida} = req.body;
        if (!nome || !tipo || !marca || !quantidade || !unid_medida) return res.status(400).json({message: 'Preencha todos os campos obrigatórios!'})
        try{
            const criado = repo.create({nome});
            await repo.save(criado);
            res.status(201).json({ message: 'Produto cadastrado com sucesso.'});
        }
        catch(err: any){
            console.log(err);
            res.status(500).json({message: 'Erro no servidor!'});
        }
    }

    static async atualizar (req: Request, res: Response) {
        const id = Number(req.params.id);
        const {nome,marca,tipo,quantidade,unid_medida} = req.body;
        const produto = await repo.findOneBy({id});
        if(!produto)  return res.status(404).json({ message: 'Produto não encontrado.' });

        produto.nome = nome ?? produto.nome;
        produto.tipo = tipo ?? produto.tipo;
        produto.marca = marca ?? produto.marca;
        produto.quantidade = quantidade ?? produto.quantidade;
        produto.unid_medida = unid_medida ?? produto.unid_medida;

        try{
            const salvo =  await repo.save(produto);
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
        if(!(await apagar).affected) return res.status(404).json({message: "Produto não encontrado."})
        res.status(200).json({message: 'Produto excluído com sucesso.'}).send();
    }
}