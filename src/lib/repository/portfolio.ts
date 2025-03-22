"use server";

import { Portfolio } from "@/types/common.types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query'],
});

export const GetAllPortfolios = async (
  search?: string,
  offset?: number,
  limit?: number,
  order?: string,
  sort: "asc" | "desc" = "desc",
  status?: string,
  serviceId?: string,
) => {
  const whereCondition: any = {};
  whereCondition.deletedAt = null
  if (search) {
    whereCondition.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { client: { contains: search, mode: "insensitive" } },
      { address: { contains: search, mode: "insensitive" } },
      { slug: { contains: search, mode: "insensitive" } },
    ];
  }
  if (status) {
    whereCondition.status = {
      equals: status === "true",
    };
  }
  if (serviceId) {
    whereCondition.serviceId = {
      equals: serviceId,
    };
  }

  try {
    const totalFiltered = await prisma.portfolio.count({
      where: whereCondition
    });
    const totalData = await prisma.portfolio.count({
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

    const data = await prisma.portfolio.findMany(queryOptions);

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

export const CreatePortfolio = async (createData: Portfolio) => {
  try {
    const startISO = createData.start ? new Date(createData.start).toISOString() : null;
    const endISO = createData.end ? new Date(createData.end).toISOString() : null;

    createData.slug = createData.title?.toLocaleLowerCase().replaceAll("?","").replaceAll("!","").replaceAll(",","").replaceAll(".","").replaceAll("'","").replaceAll(" ","-")

    const newData = await prisma.portfolio.create({
      data: {
        start: startISO || null,
        end: endISO || null,
        serviceId: createData.serviceId || null,
        title: createData.title || null,
        client: createData.client || null,
        address: createData.address || null,
        slug: createData.slug || null,
        description: createData.description || null,
        status: createData.status || false,
        image1: createData.image1,
        image2: createData.image2,
        image3: createData.image3,
        image4: createData.image4,
        image5: createData.image5,
        image6: createData.image6,
        image7: createData.image7,
        image8: createData.image8,
        image9: createData.image9,
        image10: createData.image10,
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

export const UpdatePortfolio = async (updateData: Portfolio) => {
  try {
    const startISO = updateData.start ? new Date(updateData.start).toISOString() : null;
    const endISO = updateData.end ? new Date(updateData.end).toISOString() : null;

    updateData.slug = updateData.title?.toLocaleLowerCase().replaceAll("?","").replaceAll("!","").replaceAll(",","").replaceAll(".","").replaceAll("'","").replaceAll(" ","-")

    const updatedData = await prisma.portfolio.update({
      where: { id: updateData.id },
      data: {
        start: startISO || null,
        end: endISO || null,
        serviceId: updateData.serviceId || null,
        title: updateData.title || null,
        client: updateData.client || null,
        address: updateData.address || null,
        slug: updateData.slug || null,
        description: updateData.description || null,
        status: updateData.status || false,
        image1: updateData.image1,
        image2: updateData.image2,
        image3: updateData.image3,
        image4: updateData.image4,
        image5: updateData.image5,
        image6: updateData.image6,
        image7: updateData.image7,
        image8: updateData.image8,
        image9: updateData.image9,
        image10: updateData.image10,
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

export const GetPortfolioBySlug = async (slug: string) => {
  try {
    const datasets = await prisma.portfolio.findFirst({
      where: { slug: slug, deletedAt: null },
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

export const GetPortfolioById = async (id: string) => {
  try {
    const datasets = await prisma.portfolio.findUnique({
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

export const DeletePortfolio = async (id: string) => {
  try {
    const deleted = await prisma.portfolio.update({
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
