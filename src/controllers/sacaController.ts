import { Request, Response} from 'express'
import { appDataSource } from '@config/data_source'
import { Saca} from '@entities/Saca'

const repo = appDataSource.getRepository(Saca);

export class SacaController {
    
}