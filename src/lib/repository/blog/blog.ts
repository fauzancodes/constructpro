"use server";

import { Blog } from "@/types/common.types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query'],
});

export const GetAllBlogs = async (
  search?: string,
  offset?: number,
  limit?: number,
  order?: string,
  sort: "asc" | "desc" = "desc",
  status?: string,
  categoryId?: string,
  withCategory?: boolean,
  tags?: string,
) => {
  const whereCondition: any = {};
  whereCondition.deletedAt = null
  if (search) {
    whereCondition.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { slug: { contains: search, mode: "insensitive" } },
    ];
  }
  if (tags) {
    whereCondition.tags = { contains: tags, mode: "insensitive" };
  }
  if (status) {
    whereCondition.status = {
      equals: status === "true",
    };
  }
  if (categoryId) {
    whereCondition.categoryId = {
      equals: categoryId,
    };
  }

  try {
    const totalFiltered = await prisma.blog.count({
      where: whereCondition
    });
    const totalData = await prisma.blog.count({
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
      include: withCategory ? { category: true } : undefined,
    };

    if (offset) {
      queryOptions.skip = offset;
    }

    if (limit && limit > 0) {
      queryOptions.take = limit;
    }

    const data = await prisma.blog.findMany(queryOptions);

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

export const GetBlogTags = async () => {
  const whereCondition: any = {};
  whereCondition.deletedAt = null

  try {
    const queryOptions: any = {
      where: whereCondition,
    };
  
    const data = await prisma.blog.findMany(queryOptions);

    const tagsResult: {name: string, total: number}[] = [];

    data.forEach((blog) => {
      if (blog.tags) {
        const tags = blog.tags.replace(", ", ",").replace(" ", "").split(",");

        tags.forEach((tag) => {
          const existingTag = tagsResult.find((t) => t.name === tag);
          if (existingTag) {
            existingTag.total += 1;
          } else {
            tagsResult.push({ name: tag, total: 1 });
          }
        });
      }
    });
    tagsResult.push({ name: "Semua", total: data.length })

    tagsResult.sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));

    return tagsResult;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
      console.error('Failed to create content interaction:', error);
    }
    console.error("Error fetching data", error);
    return null;
  }
}

export const CreateBlog = async (createData: Blog) => {
  try {
    const dateISO = createData.date ? new Date(createData.date).toISOString() : null;

    createData.slug = createData.title?.toLocaleLowerCase().replaceAll("?","").replaceAll("!","").replaceAll(",","").replaceAll(".","").replaceAll("'","").replaceAll(" ","-")

    const newData = await prisma.blog.create({
      data: {
        title: createData.title || null,
        author: createData.author || null,
        date: dateISO || null,
        tags: createData.tags || null,
        status: createData.status || false,
        categoryId: createData.categoryId || null,
        description: createData.description || null,
        body: createData.body || null,
        image: createData.image || null,
        slug: createData.slug || null,
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

export const UpdateBlog = async (updateData: Blog) => {
  try {
    const dateISO = updateData.date ? new Date(updateData.date).toISOString() : null;

    updateData.slug = updateData.title?.toLocaleLowerCase().replaceAll("?","").replaceAll("!","").replaceAll(",","").replaceAll("'","").replaceAll(".","").replaceAll(" ","-")

    const updatedData = await prisma.blog.update({
      where: { id: updateData.id },
      data: {
        title: updateData.title || null,
        author: updateData.author || null,
        date: dateISO || null,
        tags: updateData.tags || null,
        status: updateData.status || false,
        categoryId: updateData.categoryId || null,
        description: updateData.description || null,
        body: updateData.body || null,
        image: updateData.image || null,
        slug: updateData.slug || null,
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

export const GetBlogBySlug = async (slug: string) => {
  try {
    const datasets = await prisma.blog.findFirst({
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

export const GetBlogById = async (id: string) => {
  try {
    const datasets = await prisma.blog.findUnique({
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

export const DeleteBlog = async (id: string) => {
  try {
    const deleted = await prisma.blog.update({
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
