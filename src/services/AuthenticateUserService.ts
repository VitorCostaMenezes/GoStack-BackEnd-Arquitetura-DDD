import { getRepository } from 'typeorm';
// metodo utilizado para comparar senhas criptografadas com normais
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
    email: string;
    password: string;
}
interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        // instanciando o repositório por referência
        const usersRepository = getRepository(User);

        // verificando se é um email válido
        const user = await usersRepository.findOne({ where: { email } });

        // se o email não existir retorna um erro
        if (!user) {
            throw new AppError('Incorrect email/password combinations.', 401);
        }

        // user.password - senha criptografada
        // password - senha não criptografada
        // o compare compara uma não cripitografada com uma criptografada
        const passwordMatched = await compare(password, user.password);

        // se não existir senha igual retorna um erro
        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combinations.', 401);
        }

        // acessando as propriedades no arquivo auth.ts
        const { secret, expiresIn } = authConfig.jwt;

        // primeiro parâmetro payload, permissões, nome e algumas coisãos não seguras
        // segundo - chave secreta
        // subject é o id do usuário que gerou o token
        // expiresIn  - quanto tempo esse token vai durar
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
