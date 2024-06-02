import prismaClient from "../../prisma";

class CloseOrderService {
    async execute(orderId: string) {
       
        const order = await prismaClient.pedido.findUnique({
            where: { id: orderId },
            include: {
                items: {
                    include: {
                        Produto: true
                    }
                }
            }
        });

        if (!order) {
            throw new Error('Pedido não encontrado');
        }

       
        const total = order.items.reduce((acc, item) => {
            if (item.Produto) {
                return acc + item.quantidade * parseFloat(item.Produto.preco);
            }
            return acc;
        }, 0);

        
        const closedOrder = await prismaClient.pedido.update({
            where: { id: orderId },
            data: { rascunho: false },
        });

        return {
            ...closedOrder,
            total
        };
    }
}

export { CloseOrderService };
