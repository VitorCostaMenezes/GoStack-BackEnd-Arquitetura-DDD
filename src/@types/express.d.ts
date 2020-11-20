declare namespace Express {
    // anexando o que esta dentro do arquivo junto com o que ja existe
    // na propriedade Request do express
    export interface Request {
        user: {
            id: string;
        };
    }
}
