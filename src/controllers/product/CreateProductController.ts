import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
  handle = async (req: Request, res: Response) => {
    const { nome, preco, descricao, id_categoria } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'O caminho do banner precisa ser informado!' });
    } else {
      const { filename: banner } = req.file;

      const createProductService = new CreateProductService();
      try {
        const product = await createProductService.execute({
          nome,
          preco,
          descricao,
          banner,
          id_categoria
        });

        return res.json(product);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Erro ao criar produto:", error.message);
          return res.status(500).json({ message: 'Erro ao criar produto', error: error.message });
        } else {
          console.error("Erro desconhecido ao criar produto:", error);
          return res.status(500).json({ message: 'Erro desconhecido ao criar produto' });
        }
      }
    }
  }
}

export { CreateProductController };
