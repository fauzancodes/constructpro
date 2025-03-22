"use server";

import { User } from "@/types/common.types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query'],
});

export const GetAllUsers = async (
  search?: string,
  offset?: number,
  limit?: number,
  order?: string,
  sort: "asc" | "desc" = "desc",
) => {
  const whereCondition: any = {};
  whereCondition.deletedAt = null
  if (search) {
    whereCondition.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  try {
    const totalFiltered = await prisma.user.count({
      where: whereCondition
    });
    const totalData = await prisma.user.count({
      where: {
        deletedAt: null
      }
    });

    const orderBy = order
      ? [
          { [order]: sort } as any,
          { updatedAt: sort },
        ]
      : [{ updatedAt: sort }];

    const data = await prisma.user.findMany({
      where: whereCondition,
      skip: offset ?? 0,
      take: limit ?? 10,
      orderBy,
    });

    const totalPage = Math.ceil(totalFiltered / (limit ?? 10));

    return {
      data,
      totalPage,
      totalFiltered,
      totalData
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
      console.error('Failed to create content interaction:', error);
    }
    console.error("Error fetching data", error);
    return null;
  }
};

export const CreateUser = async (createData: User) => {
  try {
    const newData = await prisma.user.create({
      data: {
        email: createData.email,
        password: createData.password,
      },
    });

    return {
      success: true,
      message: "Data created successfully",
      newData,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
      console.error('Failed to create content interaction:', error);
    }
    console.error("Error creating data", error);
    return {
      success: false,
      message: "Failed to create data",
    };
  }
};

export const UpdateUser = async (updateData: User) => {
  try {
    const updatedData = await prisma.user.update({
      where: { id: updateData.id },
      data: {
        email: updateData.email,
        password: updateData.password,
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      message: "Data updated successfully",
      updatedData,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
      console.error('Failed to create content interaction:', error);
    }
    console.error("Error updating data", error);
    return {
      success: false,
      message: "Failed to update data",
    };
  }
};

export const GetUserById = async (id: string) => {
  try {
    const datasets = await prisma.user.findUnique({
      where: { id, deletedAt: null },
    });

    if (!datasets) {
      return {
        success: false,
        message: "Data not found",
      };
    }

    return {
      success: true,
      message: "Data retrieved successfully",
      datasets,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
      console.error('Failed to create content interaction:', error);
    }
    console.error("Error retrieving data", error);
    return {
      success: false,
      message: "Failed to retrieve data",
    };
  }
};

export const DeleteUser = async (id: string) => {
  try {
    const deleted = await prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      }
    });

    return {
      success: true,
      message: "Data deleted successfully",
      deleted,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
      console.error('Failed to create content interaction:', error);
    }
    console.error("Error deleting data", error);
    return {
      success: false,
      message: "Failed to delete data",
    };
  }
};

export const GetUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        deletedAt: null,
      },
    });
    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
      console.error('Failed to create content interaction:', error);
    }
    console.error("Error fetching user by email", error);
    return null;
  }
};
