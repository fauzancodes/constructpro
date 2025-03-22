"use server";

import { CallToAction } from "@/types/common.types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query'],
});

export const GetAllCallToActions = async (
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
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { callToAction1: { contains: search, mode: "insensitive" } },
      { CallToAction2: { contains: search, mode: "insensitive" } },
    ];
  }

  try {
    const totalFiltered = await prisma.callToAction.count({
      where: whereCondition
    });
    const totalData = await prisma.callToAction.count({
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

    const data = await prisma.callToAction.findMany(queryOptions);

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

export const CreateCallToAction = async (createData: CallToAction) => {
  try {
    const newData = await prisma.callToAction.create({
      data: {
        title: createData.title || null,
        description: createData.description || null,
        callToAction1: createData.callToAction1 || null,
        callToAction2: createData.callToAction2 || null,
        image1: createData.image1 || null,
        image2: createData.image2 || null,
        image3: createData.image3 || null,
        image4: createData.image4 || null,
        image5: createData.image5 || null,
        image6: createData.image6 || null,
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

export const UpdateCallToAction = async (updateData: CallToAction) => {
  try {
    const updatedData = await prisma.callToAction.update({
      where: { id: updateData.id },
      data: {
        title: updateData.title || null,
        description: updateData.description || null,
        callToAction1: updateData.callToAction1 || null,
        callToAction2: updateData.callToAction2 || null,
        image1: updateData.image1 || null,
        image2: updateData.image2 || null,
        image3: updateData.image3 || null,
        image4: updateData.image4 || null,
        image5: updateData.image5 || null,
        image6: updateData.image6 || null,
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

export const GetCallToActionById = async (id: string) => {
  try {
    const datasets = await prisma.callToAction.findUnique({
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

export const DeleteCallToAction = async (id: string) => {
  try {
    const deleted = await prisma.callToAction.update({
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
