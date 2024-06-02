import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

class DetailUserController {

    handle = async (req: Request, res: Response) => {
     
        const user_id = req.user_id;
        console.log("ID: " + user_id);

        const createUserService: DetailUserService = new DetailUserService();
        const user = await createUserService.execute(user_id);

        return res.json(user);
    }

}

export { DetailUserController };
