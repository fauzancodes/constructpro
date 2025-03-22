"use server";

import { Contact } from "@/types/common.types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query'],
});

export const GetAllContacts = async (
  search?: string,
  offset?: number,
  limit?: number,
  order?: string,
  sort: "asc" | "desc" = "desc",
  code?: string,
) => {
  const whereCondition: any = {};
  whereCondition.deletedAt = null
  if (search) {
    whereCondition.OR = [
      { name: { contains: search, mode: "insensitive" } },
    ];
  }
  if (code) {
    whereCondition.code = {
      equals: code,
    };
  }

  try {
    const totalFiltered = await prisma.contact.count({
      where: whereCondition
    });
    const totalData = await prisma.contact.count({
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

    const data = await prisma.contact.findMany(queryOptions);

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

export const CreateContact = async (createData: Contact) => {
  try {
    const newData = await prisma.contact.create({
      data: {
        title: createData.title || null,
        description: createData.description || null,
        image: createData.image || null,
        link: createData.link || null,
        code: createData.code || null,
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

export const UpdateContact = async (updateData: Contact) => {
  try {
    const updatedData = await prisma.contact.update({
      where: { id: updateData.id },
      data: {
        title: updateData.title || null,
        description: updateData.description || null,
        image: updateData.image || null,
        link: updateData.link || null,
        code: updateData.code || null,
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

export const GetContactById = async (id: string) => {
  try {
    const datasets = await prisma.contact.findUnique({
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

export const DeleteContact = async (id: string) => {
  try {
    const deleted = await prisma.contact.update({
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
