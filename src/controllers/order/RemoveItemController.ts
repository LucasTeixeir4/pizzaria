import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class RemoveItemController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { orderId, itemId } = req.params;

        try {
            const pedido = await prisma.pedido.findUnique({
                where: { id: orderId },
            });

            if (!pedido) {
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }

            if (!pedido.rascunho) {
                return res.status(400).json({ message: 'Não é possível remover itens de um pedido já enviado para a cozinha' });
            }

            await prisma.item.delete({
                where: {
                    id: itemId,
                },
            });

            return res.status(200).json({ message: 'Item removido do pedido com sucesso' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Erro ao remover item do pedido', error: error.message });
            }
            return res.status(500).json({ message: 'Erro ao remover item do pedido' });
        }
    }
}

export { RemoveItemController };
