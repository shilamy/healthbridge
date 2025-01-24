import { Request as ExpressRequest, Response } from 'express';
import * as yup from 'yup';

import { registerUser, getAllUsers, getOneUser, updateUser, verifyUser } from '../services/user.registration';
import { userRegistrationSchema, userUpdateSchema, userVerificationSchema } from '../../../utils/validator';
import { TypedRequest, UserData, UserResponse, UserResponseData,  } from '../types/type';


const userController = {
  create: async (req: TypedRequest, res: Response): Promise<Response> => {
      try {
        const validatedData = await userRegistrationSchema.validate(req.body, { 
          abortEarly: false 
        });
        const response: UserResponse = {
          statusCode: 200,
          status: "success",
          message: "Users fetched from cache",
          data: []
        }
        const { confirm_password, ...userData } = validatedData as UserData;
        const user = await registerUser(userData);
        if (user.statusCode === 201 ){
          return res.status(user.statusCode).send({
            status: (user.status),
            message: (user.message + ' Check your email for verification code'),
            data: (user.data) });
        }
        return res.status(response.statusCode).json( response);
        
      } catch (error) {
          if (error instanceof yup.ValidationError) {
            return res.status(400).send({ error: error.errors });
          };
          console.error('Error creating user:', error);
          return res.status(500).send({ message: 'Error creating user', error: error });
      }
  },

  verifyUser: async (req: ExpressRequest, res: Response): Promise<Response> => {
    try {
      const verify = userVerificationSchema.validate(req.body, { abortEarly: false });
      console.log('verify');
      const {email, code } = verify as unknown as { email: string, code: string };
      const user = await verifyUser(email, code);
      return res.status(user.statusCode).send({ status: (user.status), message: (user.message), data: (user.data)})
    } catch (error) {
      return res.status(500).send({
        error: error
      })
    }
  },

  getAllUsers: async (req: ExpressRequest, res: Response): Promise<Response> => {
    try {
      const users: UserResponseData = await getAllUsers()
      console.log(users);
      return res.status(users.statusCode).send({
        status: users.status,
        message: users.message,
        data: users.data
      });
    } catch (error) {
      const errorResponse: UserResponseData = {
        statusCode: 500,
        status: "error",
        message: "internal server error",
        data: null
      };

      return res.status(errorResponse.statusCode).json({
        status: errorResponse.status,
        message: errorResponse.message,
        data: errorResponse.data
      });
      }
    
  },

  getOneUser: async (req: ExpressRequest, res: Response): Promise<Response> => {
    try {
      const user = await getOneUser(req.params.id);
      return res.status(user.statusCode).send({ status: (user.status), message: (user.message), data: (user.data)})
    } catch (error) {
      return res.status(500).send({
        error: error
      })
    }
  },

  updateUser: async (req: ExpressRequest, res: Response): Promise<Response> => {
    try {
      const id = req.params.id;
      const validatedData = await userUpdateSchema.validate(req.body, { 
        abortEarly: false 
      });
      const update = await updateUser( id, validatedData);
      return res.status(update.statusCode).send({ status: (update.status), message: (update.message), data: (update.data)})
    } catch (error) {
      return res.status(500).send({
        error: error
      })
    }
  },
};

export default userController;
