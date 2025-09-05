import { Request, Response } from 'express'
import { appDataSource } from '@config/data_source'
import { Semente } from '@entities/Semente'

const repo = appDataSource.getRepository(Semente);

export class SementeController {
    static async listar(req: Request, res: Response) {
        const sementes = await repo.find({ order: { id: 'ASC' } });
        res.json(sementes);
    }

    static async buscarSemente(req: Request, res: Response) {
        const id = Number(req.params.id);
        const semente = await repo.findOneBy({ id });
        res.json(semente);
    }

    static async criar(req: Request, res: Response) {
        const { cultura, peso_kg, preco, marca, variedade } = req.body;
        if (!cultura || !peso_kg || !preco || !marca || !variedade) return res.status(400).json({ message: 'Preencha todos os campos obrigatórios!' })
        try {
            const criado = repo.create({ cultura, peso_kg, preco, marca, variedade });
            await repo.save(criado);
            res.status(201).json({ message: 'Semente cadastrada com sucesso.' });
        }
        catch (err: any) {
            console.log(err);
            res.status(500).json({ message: 'Erro no servidor!' });
        }
    }

    static async atualizar(req: Request, res: Response) {
        const id = Number(req.params.id);
        const { cultura, peso_kg, preco, marca, variedade } = req.body;
        const semente = await repo.findOneBy({ id });
        if (!semente) return res.status(404).json({ message: 'Semente não encontrada.' });

        semente.cultura = cultura ?? semente.cultura;
        semente.peso_kg = peso_kg ?? semente.peso_kg;
        semente.marca = marca ?? semente.marca;
        semente.preco = preco ?? semente.preco;
        semente.variedade = variedade ?? semente.variedade;

        try {
            const salvo = await repo.save(semente);
            res.json(salvo);
        }

        catch (err: any) {
            console.log(err);
            res.status(500).json({ message: 'Erro no servidor!' });
        }
    }

    static async excluir(req: Request, res: Response) {
        const id = Number(req.params.id);
        const apagar = repo.delete(id);
        if (!(await apagar).affected) return res.status(404).json({ message: "Semente não encontrada." })
        res.status(200).json({ message: 'Semente excluída com sucesso.' }).send();
    }
}