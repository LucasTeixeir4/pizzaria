import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

class DetailUserController {
    handle = async (req: Request, res: Response) => {
        const user_id = req.user_id;

        if (!user_id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        console.log("ID: " + user_id);

        const detailUserService = new DetailUserService();
        try {
            const user = await detailUserService.execute(user_id);
            return res.json(user);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Error retrieving user', error: error.message });
            }
            return res.status(500).json({ message: 'Unknown error retrieving user' });
        }
    }
}

export { DetailUserController };
