import 'reflect-metadata';

import express from 'express';
import routes from './routes';
import uploadConfig from './config/upload';
// importando o arquivo de conexão com o Bd
import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
    console.log('Server started on port 3333');
});
