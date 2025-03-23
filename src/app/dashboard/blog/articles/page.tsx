"use client"

import { DeleteBlog, GetAllBlogs } from "@/lib/repository/blog/blog";
import { GetAllBlogCategories } from "@/lib/repository/blog/category";
import DynamicTable from "@/ui/dashboard/table";
import TableFooter from "@/ui/dashboard/tableFooter";
import TableHeader from "@/ui/dashboard/tableHeader";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Blogs = () => {
  const currentRoute = usePathname();
  const [refetch, setRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [datasets, setDatasets] = useState<any[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [totalDataFiltered, setTotalDataFiltered] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const [sort, setSort] = useState<"asc" | "desc" | undefined>(undefined);
  const [status, setStatus] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const columns = [
    {
      label: "Date",
      key: "date"
    },
    {
      label: "Title",
      key: "title"
    },
    {
      label: "Author",
      key: "author"
    },
    {
      label: "Description",
      key: "description"
    },
    {
      label: "Image",
      key: "image"
    },
    {
      label: "Status",
      key: "status"
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetAllBlogCategories("", 0, 0, "title", "asc", "true");
        if (result) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchData();
  }, [refetch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const result = await GetAllBlogs(search, offset, perPage, order, sort, status, selectedCategoryId);
        if (result) {
          setDatasets(result.data);
          setTotalDataFiltered(result.totalFiltered);
          setTotalData(result.totalData);
          setTotalPage(result.totalPage);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching datasets:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, search, perPage, order, sort, status, selectedCategoryId, refetch]);

  const filterOptions = [
    {
      label: "Category",
      id: "select-category",
      ariaLabel: "Category",
      options: [
        {
          value: "",
          label: "All"
        },
        ...categories.map((item) => ({
          value: item.id, 
          label: item.title
        }))
      ],
      action: setSelectedCategoryId
    },
    {
      label: "Status",
      id: "select-status",
      ariaLabel: "Status",
      options: [
        { value: "", label: "All" },
        { value: "true", label: "Active" },
        { value: "false", label: "Inactive" },
      ],
      action: setStatus
    },
    {
      label: "Order",
      id: "select-order",
      ariaLabel: "Order",
      options: [
        { value: "updatedAt", label: "Last Updated" },
        { value: "title", label: "Title" },
        { value: "order", label: "Order" },
      ],
      action: setOrder
    },
    {
      label: "Sort",
      id: "select-sort",
      ariaLabel: "Sort",
      options: [
        { value: "desc", label: "Descending" },
        { value: "asc", label: "Ascending" },
      ],
      action: setSort
    },
  ];

  const handelDeleteData = async (id: string) => {
    try {
      const result = await DeleteBlog(id);
      if (result) {
        if (result.success) {
          setRefetch(!refetch)
        }
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  return (
    <>
      <TableHeader 
        title="Blog Articles"
        setSearch={setSearch} 
        setTotalPage={setTotalPage}
        setCurrentPage={setCurrentPage}
        setOffset={setOffset}
        setPerPage={setPerPage}
        filterOptions={filterOptions}
        totalData={totalData}
        createPath={`${currentRoute}/create`}
      />
      <DynamicTable 
        isLoading={isLoading}
        columns={columns} 
        data={datasets}
        updatePath={`${currentRoute}/update`}
        handelDeleteData={handelDeleteData}
      />
      <TableFooter 
        totalDataFiltered={totalDataFiltered}
        limit={perPage}
        offset={offset}
        totalPage={totalPage}
        currentPage={currentPage}
        setPerPage={setPerPage}
        setCurrentPage={setCurrentPage}
        setOffset={setOffset}
        setIsLoading={setIsLoading}
      />
    </>
  )
}

export default Blogs