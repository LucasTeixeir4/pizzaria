import prismaClient from "../../prisma";

class ListCategoryService {

    execute = async () => {
        const categories = await prismaClient.categoria.findMany({
            select: {
                id: true,
                nome: true
            }
        });
        return categories;
    }

}

export { ListCategoryService };