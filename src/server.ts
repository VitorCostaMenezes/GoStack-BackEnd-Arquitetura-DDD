import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

// importando o arquivo de conexão com o Bd
import './database';

const app = express();

app.use(express.json());
// servindo arquivos de forma estática
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// global exception handler
// uma tratativa de erro global
// tem que ser inserido após a declaração das rotas
// esse midlewares precisam ter 4 parâmetros

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    // nsta primeira tratativa é quando ocorre um erro previsto
    // é quando o erro é umainstancia da classe AppError
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.log(err);

    // quando ocorre um erro interno não esperaod na aplicação
    // é uma resposta mais genérica
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.listen(3333, () => {
    console.log('Server started on port 3333');
});
