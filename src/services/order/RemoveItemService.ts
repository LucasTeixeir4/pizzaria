import prismaClient from "../../prisma";

type RemoveItemRequest = {
    orderId: string;
    itemId: string;
}

class RemoveItemService {
    async execute({ orderId, itemId }: RemoveItemRequest) {
        const item = await prismaClient.item.delete({
            where: {
                id: itemId,
            },
        });

        return item;
    }
}

export { RemoveItemService };
