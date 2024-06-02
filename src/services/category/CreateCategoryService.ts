import prismaClient from "../../prisma";

type CreateCategoryRequest = {
    nome: string,
}

class CreateCategoryService {

    execute = async ({ nome }: CreateCategoryRequest) => {

        if (!nome) {
            throw new Error('O nome precisa ser informado!');
        }
        const category = await prismaClient.categoria.create({
            data: {
                nome: nome
            }
        });
        return category;
    }

}

export { CreateCategoryService };