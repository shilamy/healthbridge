import { Request as ExpressRequest, Response } from 'express';
import * as yup from 'yup';

import { verifyUser, registerUser } from '../services/user.registration';
import { userRegistrationSchema, userVerificationSchema } from '../../../utils/validator';
import { TypedRequest, UserData, UserResponse, VerifyRequest } from '../../types/type';

const userRegistration = {
  register: async (req: TypedRequest, res: Response): Promise<Response> => {
      try {
        const validatedData = await userRegistrationSchema.validate(req.body, { 
          abortEarly: false 
        });

        const { confirm_password, ...userData } = validatedData as UserData;
        const user = await registerUser(userData);
        if (user.statusCode === 201 ){
          return res.status(user.statusCode).send({
            status: (user.status),
            message: (user.message + ' Check your email for verification code'),
            data: (user.data) });
        }
        return res.status(user.statusCode).json( user);
        
      } catch (error) {
          if (error instanceof yup.ValidationError) {
            return res.status(400).send({ error: error.errors });
          };
          console.error('Error creating user:', error);
          return res.status(500).send({ message: 'Error creating user', error: error });
      }
  },

  verifyUser: async (req: VerifyRequest, res: Response): Promise<Response> => {
    try {
      const verify = userVerificationSchema.validate(req.body, { abortEarly: false });
      
      const { email, code } = verify as unknown as { email: string, code: string };
      const verifyRequest: VerifyRequest = {
        body: { email, code },
      } as VerifyRequest;
      const user = await verifyUser(verifyRequest);
      return res.status(user.statusCode).send({ status: (user.status), message: (user.message), data: (user.data)})
    } catch (error) {
      return res.status(500).send({
        error: error
      })
    }
  },
};

export default userRegistration;
