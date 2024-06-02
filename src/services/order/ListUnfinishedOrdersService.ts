import prismaClient from "../../prisma";

class ListUnfinishedOrdersService {
    async execute() {
        const orders = await prismaClient.pedido.findMany({
            where: {
                status: false,
                rascunho: true,
            },
            orderBy: {
                criado_em: 'desc',
            },
            include: {
                items: true,
            },
        });

        
        const formattedOrders = orders.map(order => ({
            ...order,
            criado_em: order.criado_em ? order.criado_em.toISOString().split('T')[0] : null,
            atualizado_em: order.atualizado_em ? order.atualizado_em.toISOString().split('T')[0] : null,
        }));

        return formattedOrders;
    }
}

export { ListUnfinishedOrdersService };
