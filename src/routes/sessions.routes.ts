import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const athenticateUser = new AuthenticateUserService();

        const { user, token } = await athenticateUser.execute({
            email,
            password,
        });

        const userWithoutPassword = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                created_at: user.created_at,
                updated_at: user.updated_at,
            },
            token,
        };

        return response.json(userWithoutPassword);

        // delete user.password;
        // return response.json({ user, token });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default sessionsRouter;
