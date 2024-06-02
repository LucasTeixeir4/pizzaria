import prismaClient from "../../prisma";

interface OrderResquest{
    mesa: number;
    nome: string;
}

class CreateOrderService{

    async execute({mesa,nome}: OrderResquest){

        const order = await prismaClient.pedido.create({
            data:{
                mesa:mesa,
                nome:nome

            }
        })
        return order;
    }


}
export{CreateOrderService}
 