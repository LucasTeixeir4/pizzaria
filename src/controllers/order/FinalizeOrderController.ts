import { Request, Response } from 'express';
import { FinalizeOrderService } from '../../services/order/FinalizeOrderService';

class FinalizeOrderController {
    async handle(req: Request, res: Response) {
        const { orderId } = req.params;
        const finalizeOrderService = new FinalizeOrderService();

        try {
            const updatedOrder = await finalizeOrderService.execute(orderId);
            return res.json(updatedOrder);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
            return res.status(400).json({ message: 'Erro desconhecido' });
        }
    }
}

export { FinalizeOrderController };
