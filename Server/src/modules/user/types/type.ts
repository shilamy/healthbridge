import { Request, Response } from 'express';


export interface UserAttributes {
    name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
}

export interface UserData extends Omit<UserAttributes, 'id'> {
  confirm_password?: string;
}

export interface TypedRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
  };
}

export interface VerifyRequest extends Request {
  body: {
    email: string;
    code: string;
  }
}

export interface UserData {
  name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
}

export interface UserResponse {
  statusCode: number;
  status: 'success' | 'fail' | 'error';
  message: string;
  data: string[] | null;
}

export interface UserController {
  create(req: TypedRequest, res: Response): Promise<Response>;
  updateUser(req: TypedRequest, res: Response): Promise<Response>;
}
export interface ServiceResponse {
  statusCode: number;
  status: string;
  message: string;
  data: any | any[];
}
export interface UserResponseData {
  statusCode: number;
  status: string, // 'success' | 'fail' | 'error';
  message: string;
  data: any | null;
}

export interface EmailPayload {
  to: string;
  subject: string;
  text: string;
};

export interface EmailResponse {
  statusCode: number;
  status: string;
  message: string;
  data: any;
}

export interface loginData {
  email: string;
  password: string;
}

export interface UserRole {
  id: string;
  email: string;
  role: string[];
}

export interface ValidationResult {
  email: string;
  code: string;
}

export interface VerificationResponse {
  statusCode: number;
  status: string;
  message: string;
  data: any;
}