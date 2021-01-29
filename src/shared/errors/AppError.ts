class AppError {
    public readonly message: string;

    // status code é o codiho http do erro ex: 400, 4001, 500
    public readonly statusCode: number;

    // o constructor recebe o erro (mendsagem)  e o status do erro por parâmetro
    // o status code esta recebendo um valor padrão para o caso do erro
    // não vir acompanhado do statuscode
    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default AppError;
