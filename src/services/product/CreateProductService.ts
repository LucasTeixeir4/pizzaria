import prismaClient from "../../prisma";

type CreateProductRequest = {
    nome: string,
    preco: string,
    descricao: string,
    banner: string,
    id_categoria: string
}

class CreateProductService {

    execute = async ({ nome, preco, descricao, banner, id_categoria }: CreateProductRequest) => {
        
        if (!nome) {
            throw new Error('O nome precisa ser informado!');
        }
        
        if (!preco) {
            throw new Error('O preço precisa ser informado!');
        }

        if (!descricao) {
            throw new Error('A descrição precisa ser informada!');
        }

        if (!banner) {
            throw new Error('O banner precisa ser informado!');
        }

        if (!id_categoria) {
            throw new Error('O ID da categoria precisa ser informado!');
        }

        const category = await prismaClient.categoria.findFirst({
            where: {
                id: id_categoria
            }
        });

        if (!category) {
            throw new Error('A categoria informada não foi encontrada!');
        }

        const product = await prismaClient.produto.create({
            data: {
                banner: banner,
                descricao: descricao,
                id_categoria: id_categoria,
                nome: nome,
                preco: preco
            }
        });

        return product;

    }

}

export { CreateProductService };