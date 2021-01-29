/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';

import uploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/User';

// criando uma interface
interface Request {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    // recebe como parâmetro o id do usuário que quer alterar o avatar
    // o nome do arquivo
    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        // instanciando o repositorio por referência
        const usersRepository = getRepository(User);

        // procurando no repositório se existe o user_id recebido
        const user = await usersRepository.findOne(user_id);

        // caso não exista o user_id retorna um erro
        if (!user) {
            throw new AppError(
                'Only authenticated user can change avatar.',
                401,
            );
        }

        // verifica se ja existe um user,avatar
        // se existir
        if (user.avatar) {
            // busca pelo arquivo de avatar do usuário
            // o dicrectory possui o mesmo caaminho que a variavel tmpFolder
            // no caso esta importando de uploadConfig.directory
            // o join rceebe dois parâmetros
            // o caminho do arquivo
            // e qual arquivo deseja remover
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            // verifica o status do arquivo e retorna se ele existe ou não
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );
            // se o arquivo existir ele vai ser deletado
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        // atribuindo o valor de avatarFilename à user.avatar
        user.avatar = avatarFilename;

        // salvando o user norepositório
        await usersRepository.save(user);

        return user;
    }
}
export default UpdateUserAvatarService;
