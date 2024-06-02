import prismaClient from "../../prisma";

class FinalizeOrderService {
    async execute(orderId: string) {
        const order = await prismaClient.pedido.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            throw new Error('Pedido não encontrado');
        }

        if (!order.rascunho) {
            throw new Error('Pedido já está finalizado');
        }

        const updatedOrder = await prismaClient.pedido.update({
            where: { id: orderId },
            data: { rascunho: false },
        });

        return updatedOrder;
    }
}

export { FinalizeOrderService };
