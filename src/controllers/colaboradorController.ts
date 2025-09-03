import { Request, Response } from 'express'
import { appDataSource } from '@config/data_source'
import { Colaborador } from '@entities/Colaborador'

const repo = appDataSource.getRepository(Colaborador);

export class ColaboradorController {
    static async listar(req: Request, res: Response) {
        const colaborador = await repo.find({ order: { id: 'ASC' } });
        res.json(colaborador);
    }

    static async buscarColaborador(req: Request, res: Response) {
        const id = Number(req.params.id);
        const colaborador = await repo.findOneBy({ id });
        res.json(colaborador);
    }

    static async criar(req: Request, res: Response) {
        const { nome, cpf, data_nasc, email, telefone } = req.body;
        if (!nome || !cpf || !data_nasc || !email || !telefone) return res.status(400).json({ message: 'Preencha todos os campos obrigatórios!' });

        try {
            const jaExiste = await repo.findOne({ where: [{ cpf }, { email }] })

            if (jaExiste) {

                if (jaExiste.cpf === cpf) return res.status(409).json({ message: 'O CPF informado já está em uso.' });

                else return res.status(409).json({ message: 'O e-mail informado já está em uso.' });
            }

            const criado = repo.create({ nome, cpf, data_nasc, email, telefone });
            await repo.save(criado);
            res.status(201).json({ message: 'Colaborador cadastrado com sucesso.' });
        }
        catch (err: any) {
            console.log(err);
            res.status(500).json({ message: 'Erro no servidor!' });
        }
    }

    static async atualizar(req: Request, res: Response) {
        const id = Number(req.params.id);
        const { nome, cpf, data_nasc, email, telefone } = req.body;
        const colaborador = await repo.findOneBy({ id });
        if (!colaborador) return res.status(404).json({ message: 'Colaborador não encontrado.' });

        colaborador.nome = nome ?? colaborador.nome;
        colaborador.cpf = cpf ?? colaborador.cpf;
        colaborador.data_nasc = data_nasc ?? colaborador.data_nasc;
        colaborador.email = email ?? colaborador.email;
        colaborador.telefone = telefone ?? colaborador.telefone;

        try {
            const jaExiste = await repo.findOne({ where: [{ cpf }, { email }] })

            if (jaExiste) {

                if (jaExiste.cpf === cpf) return res.status(409).json({ message: 'O CPF informado já está em uso.' });

                else return res.status(409).json({ message: 'O e-mail informado já está em uso.' });
            }
            const salvo =  await repo.save(colaborador);
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
        if (!(await apagar).affected) return res.status(404).json({ message: "Colaborador não encontrado." })
        res.status(200).json({ message: 'Colaborador excluído com sucesso.' }).send();
    }
}