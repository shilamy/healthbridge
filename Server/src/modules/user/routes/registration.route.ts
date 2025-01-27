import { Router, Request, Response } from 'express';

import userRegistration from '../controllers/register.user';
import userController from '../controllers/user.controller';
import { TypedRequest } from '../types/type';
import { authorise } from '../../../middlewares/authorisation';
import { UserRole } from '../../../utils/roles';


const userRouter = Router();

userRouter.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: "Healthy!"})
})
userRouter.post("/register", async (req: TypedRequest, res: Response) => {
  await userRegistration.register(req, res);
});

userRouter.post("/verify", async (req: Request, res: Response) => {
  await userRegistration.verifyUser(req, res);
});

userRouter.get('/all', async (req: Request, res: Response) => {
  await userController.getAllUsers(req, res)
});

userRouter.get('/one/:id', async (req: Request, res: Response) => {
  await userController.getOneUser(req, res);
});

export default userRouter;
