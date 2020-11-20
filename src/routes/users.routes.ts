import { Router } from 'express';
// importando a biblioteca multer resposavel por upload
import multer from 'multer';
// importando as configurações de upload
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
// importando o midleware
import ensrueAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
// Criando uma insrtancia do multer, que passa  ater acesso a alguns metodos
// single = um arquivo /// array = multiplos arquivos
// any pode ser um unico arquivo ou vários
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    // try {
    // coletando os dados no corpo do body
    const { name, email, password } = request.body;

    // instanciando a classe
    const createUser = new CreateUserService();

    const user = await createUser.execute({
        name,
        email,
        password,
    });

    // Com a atualização do TypeScript, isso se faz necessário
    // manobra realizada para evitar que o password apareça no retorno da criação
    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);
    // } catch (err) {
    //     return response.status(400).json({ error: err.message });
    // }
});

// foi utilizado o metodo patch para essa rota, pq deseja-se atualizar
// uma unica informação do usuário e não todas as informações
// o midleware ensureAuthenticated no segundo parâmetro
// pq é necessário que o usuário esteja autenticado para afzer uma alteração
// na rota anterior não afz sentido o usuário estar autenticado
// para criar um cadastro
usersRouter.patch(
    '/avatar',
    ensrueAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        // try {
        // instanciando a classe para ter acesso aos metodos
        const updateUserAvatar = new UpdateUserAvatarService();

        // no midleware de autenticação o id do usuário foi setado em
        // user.id
        // então é possicvel acessa-lo através do request.user.id
        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
            avatar: user.avatar,
        };

        return response.json(userWithoutPassword);
        // } catch (err) {
        //     return response.status(400).json({ error: err.message });
        // }
    },
);

export default usersRouter;
