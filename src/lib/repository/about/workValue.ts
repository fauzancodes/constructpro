"use server";

import { WorkValue } from "@/types/common.types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query'],
});

export const GetAllWorkValues = async (
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
      { description: { contains: search, mode: "insensitive" } },
      { subtitle1: { contains: search, mode: "insensitive" } },
      { subdescription1: { contains: search, mode: "insensitive" } },
      { subtitle2: { contains: search, mode: "insensitive" } },
      { subdescription2: { contains: search, mode: "insensitive" } },
      { callToAction1: { contains: search, mode: "insensitive" } },
      { callToAction2: { contains: search, mode: "insensitive" } },
    ];
  }

  try {
    const totalFiltered = await prisma.workValue.count({
      where: whereCondition
    });
    const totalData = await prisma.workValue.count({
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

    const queryOptions: any = {
      where: whereCondition,
      orderBy,
    };

    if (offset) {
      queryOptions.skip = offset;
    }

    if (limit && limit > 0) {
      queryOptions.take = limit;
    }

    const data = await prisma.workValue.findMany(queryOptions);

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

export const CreateWorkValue = async (createData: WorkValue) => {
  try {
    const newData = await prisma.workValue.create({
      data: {
        description: createData.description || null,
        subtitle1: createData.subtitle1 || null,
        subtitle2: createData.subtitle2 || null,
        subdescription1: createData.subdescription1 || null,
        subdescription2: createData.subdescription2 || null,
        callToAction1: createData.callToAction1 || null,
        callToAction2: createData.callToAction2 || null,
        image: createData.image || null,
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

export const UpdateWorkValue = async (updateData: WorkValue) => {
  try {
    const updatedData = await prisma.workValue.update({
      where: { id: updateData.id },
      data: {
        description: updateData.description || null,
        subtitle1: updateData.subtitle1 || null,
        subtitle2: updateData.subtitle2 || null,
        subdescription1: updateData.subdescription1 || null,
        subdescription2: updateData.subdescription2 || null,
        callToAction1: updateData.callToAction1 || null,
        callToAction2: updateData.callToAction2 || null,
        image: updateData.image || null,
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

export const GetWorkValueById = async (id: string) => {
  try {
    const datasets = await prisma.workValue.findUnique({
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

export const DeleteWorkValue = async (id: string) => {
  try {
    const deleted = await prisma.workValue.update({
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
