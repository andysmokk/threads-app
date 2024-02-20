"use server";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";

export const updateUser = async (): Promise<void> => {
  connectToDB();

  await User.findOneAndUpdate();
};
