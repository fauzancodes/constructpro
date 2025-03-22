"use server"

import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { GetUserByEmail } from '@/lib/repository/user';

type LoginResult = {
  success: boolean;
  message?: string;
  token?: string;
};

export const SignIn = async (
  email: string,
  password: string
): Promise<LoginResult> => {
  try {
    const user = await GetUserByEmail(email);

    if (!user) {
      return { success: false, message: "Email not found" };
    }

    if (!user.password) {
      return { success: false, message: "Password is missing" };
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: "Wrong password" };
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      {
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30
      },
      jwtSecret
    );

    return { success: true, token };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Internal server error" };
  }
};

