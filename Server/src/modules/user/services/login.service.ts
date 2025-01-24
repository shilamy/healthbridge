import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';
import { Response } from 'express';

import { User } from "../../user/models/user.model";

const app = require('express')();
app.use(cookieParser());

const jwtExpiry =  process.env.JWT_EXPIRY || '1h';
const jwtSecret = process.env.JWT_SECRET || 'secret';

export const loginUser = async (email: string, password: string, res: Response) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return {
        statusCode: 404,
        status: "fail",
        message: "User not found",
        data: [],
      };
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return {
        statusCode: 400,
        status: "fail",
        message: "Invalid password",
        data: [],
      };
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      jwtSecret as string,
      // { expiresIn: jwtExpiry as string}
    );
    res.cookie('sessionId', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    });
    return {
      statusCode: 200,
      status: "success",
      message: "User logged in",
      data: {
        token: token,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async (res: Response) => {
  try {
    res.clearCookie('sessionId', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return {
      statusCode: 200,
      status: "success",
      message: "User logged out",
      data: [],
    };
  } catch (error) {
    throw error;
  }
}

