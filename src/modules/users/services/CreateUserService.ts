import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

// criando uma interface
interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        // instanciando o User através de referência
        const userRepository = getRepository(User);

        // verificando se ja existe o email ja existe para não cadastrar duplicado
        const checkuserExist = await userRepository.findOne({
            where: { email },
        });

        // criptogranfando a senha
        const hashedPassword = await hash(password, 8);

        // se o email ja existir dispara um erro
        if (checkuserExist) {
            throw new AppError('Email address already used.');
        }

        // se email não existir ele cria um novo usuário
        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        // salvando o novo usuário
        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;
