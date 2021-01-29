import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes//sessions.routes';

const routes = Router();

// o metodo use foi utilizado para receber qualquer metodo (get, post, put, delete)
// que chege nesta rota
// e repassa o que vem após o appointments  par dentro do appointmentsRouter
// quando qualquer rota da aplicação chamar o http://localhost:3333/appointments
// ele ja vai se conectar
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
