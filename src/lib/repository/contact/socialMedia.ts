"use server";

import { SocialMedia } from "@/types/common.types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query'],
});

export const GetAllSocialMedias = async (
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
    ];
  }

  try {
    const totalFiltered = await prisma.socialMedia.count({
      where: whereCondition
    });
    const totalData = await prisma.socialMedia.count({
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

    const data = await prisma.socialMedia.findMany(queryOptions);

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

export const CreateSocialMedia = async (createData: SocialMedia) => {
  try {
    const newData = await prisma.socialMedia.create({
      data: {
        title: createData.title || null,
        link: createData.link || null,
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

export const UpdateSocialMedia = async (updateData: SocialMedia) => {
  try {
    const updatedData = await prisma.socialMedia.update({
      where: { id: updateData.id },
      data: {
        title: updateData.title || null,
        link: updateData.link || null,
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

export const GetSocialMediaById = async (id: string) => {
  try {
    const datasets = await prisma.socialMedia.findUnique({
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

export const DeleteSocialMedia = async (id: string) => {
  try {
    const deleted = await prisma.socialMedia.update({
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
