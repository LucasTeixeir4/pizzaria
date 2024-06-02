import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

type UserRequest = {
    nome: string,
    email: string,
    senha: string
}

class CreateUserService {

    async execute({ nome, email, senha }: UserRequest) {
        if (!email) {
            throw new Error('E-mail é obrigatório!');
        }

        const userAlreadyExists = await prismaClient.usuario.findFirst({
            where: {
                email: email
            }
        });

        if(userAlreadyExists) {
            throw new Error('Já existe um usuário cadastrado com esse e-mail!');
        }

        const userCreated = await prismaClient.usuario.create({
            data: {
                nome: nome,
                email: email,
                senha: await hash(senha, 12)
            },
            select: {
                id: true,
                nome: true,
                email: true
            }
        });

        return userCreated;
    }

}

export { CreateUserService };
