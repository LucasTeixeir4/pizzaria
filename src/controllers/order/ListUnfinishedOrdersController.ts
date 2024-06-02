import { Request, Response } from "express";
import { ListUnfinishedOrdersService } from "../../services/order/ListUnfinishedOrdersService";

class ListUnfinishedOrdersController {
    async handle(req: Request, res: Response) {
        const listUnfinishedOrdersService = new ListUnfinishedOrdersService();
        try {
            const orders = await listUnfinishedOrdersService.execute();
            return res.json(orders);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Erro ao listar pedidos não finalizados', error: error.message });
            }
            return res.status(500).json({ message: 'Erro desconhecido ao listar pedidos não finalizados' });
        }
    }
}

export { ListUnfinishedOrdersController };
