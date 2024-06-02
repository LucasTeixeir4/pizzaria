import prismaClient from "../../prisma";

interface OrderResquest{
    id_pedido: string;

}



class RemoveOrderService{

    async execute({id_pedido}:OrderResquest){
        const order = await prismaClient.pedido.delete({
            where:{
                id: id_pedido,
            }
        })
        return order;
    }

}

export {RemoveOrderService}