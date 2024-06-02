import { Request, Response } from "express";
import { ListByCategoryService } from "../../services/product/ListByCategoryService";

class ListByCategoryController {
    async handle(req: Request, res: Response) {
        const { id_categoria } = req.params;

        const listByCategoryService = new ListByCategoryService();
        try {
            const products = await listByCategoryService.execute({ id_categoria });
            return res.json(products);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Erro ao listar produtos', error: error.message });
            }
            return res.status(500).json({ message: 'Erro desconhecido ao listar produtos' });
        }
    }
}

export { ListByCategoryController };
