import { Request, Response } from 'express';
import { CloseOrderService } from '../../services/order/CloseOrderService';

class CloseOrderController {
    async handle(req: Request, res: Response) {
        const { orderId } = req.params;
        const closeOrderService = new CloseOrderService();

        try {
            const closedOrder = await closeOrderService.execute(orderId);
            return res.json(closedOrder);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
            return res.status(400).json({ message: 'Erro desconhecido' });
        }
    }
}

export { CloseOrderController };
