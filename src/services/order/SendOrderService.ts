import prismaClient from "../../prisma";

interface OrderRequest{
    order_id:string;
}

class SendOrderService{

async execute({order_id}: OrderRequest){
    const order= await prismaClient.pedido.update({
        where:{
            id:order_id
        },

        data:{
            rascunho:false
        }
    })

    return order;
}
}

export {SendOrderService}
