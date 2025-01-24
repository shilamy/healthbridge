import { Router, Request, Response } from 'express';
import userController from '../controllers/register.user';
import { TypedRequest, UserResponse, ServiceResponse } from '../types/type';


const userRouter = Router();

userRouter.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: "Healthy!"})
})
userRouter.post("/register",  async (req: TypedRequest, res: Response) => {
  await userController.create(req, res);
});

userRouter.post("/verify", async (req: Request, res: Response) => {
  await userController.verifyUser(req, res);
});

userRouter.get('/all', async (req: Request, res: Response) => {
  await userController.getAllUsers(req, res)
});

userRouter.get('/one/:id', async (req: Request, res: Response) => {
  await userController.getOneUser(req, res);
});

export default userRouter;
