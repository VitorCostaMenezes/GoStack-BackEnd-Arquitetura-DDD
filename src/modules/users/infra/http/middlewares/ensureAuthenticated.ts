import { NextFunction, Request, Response } from 'express';
// verifica se o token é válido ou não
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
// importando o arquivo que possui o secret
import authConfig from '@config/auth';

// criando uma interface como modelo do token
interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    // validação do token JWT
    // pegando o token que vai dentro do cabçalho da requisição
    const authHeader = request.headers.authorization;

    // se o token não existir no header retorna um erro
    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    // se o token existir
    // na primeira posição retorna o tipo do token
    // na segunda posição retorna o proprio token
    // como o tipo não será usado, ocultamos a primeira posição
    // no exmeplo abaixo o split separa a string pelo ' '
    const [, token] = authHeader.split(' ');

    try {
        // verifica se o token é válido comparando com a chave no arquivo auth.ts
        // e armazena em decoded
        const decoded = verify(token, authConfig.jwt.secret);

        // incluindo as informações do id do usuário nas requisições que vierem
        //  a partir desse midleware
        // o decode retorna tres atributos e um deles é o sub que o id do usuário
        // forçando um formato no decoded e obtendo o sub
        const { sub } = decoded as TokenPayload;

        // o request não tinha um type user, foi necessário subscrever ou criar um tipo
        // criando a pasta @types e confirgurando o tipo do arquivo
        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT token.', 401);
    }
}
