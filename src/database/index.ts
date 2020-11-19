import { createConnection } from 'typeorm';

createConnection();

// o creteConection procura o  arquivo ormconfig.json
// se o arquivo for localizado ele vai ler as infromações
// e fazer a conxão com o banco de dados
