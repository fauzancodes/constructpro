"use client"

import { DeletePortfolio, GetAllPortfolios } from "@/lib/repository/portfolio";
import { GetAllServices } from "@/lib/repository/service";
import DynamicTable from "@/ui/dashboard/table";
import TableFooter from "@/ui/dashboard/tableFooter";
import TableHeader from "@/ui/dashboard/tableHeader";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Portfolios = () => {
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
  const [services, setServices] = useState<any[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");

  const columns = [
    {
      label: "Start Date",
      key: "start"
    },
    {
      label: "End Date",
      key: "end"
    },
    {
      label: "Title",
      key: "title"
    },
    {
      label: "Client Name",
      key: "client"
    },
    {
      label: "Image",
      key: "image1"
    },
    {
      label: "Status",
      key: "status"
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetAllServices("", 0, 0, "title", "asc", "true");
        if (result) {
          setServices(result.data);
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    fetchData();
  }, [refetch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const result = await GetAllPortfolios(search, offset, perPage, order, sort, status, selectedServiceId);
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
  }, [currentPage, search, perPage, order, sort, status, selectedServiceId, refetch]);

  const filterOptions = [
    {
      label: "Service",
      id: "select-service",
      ariaLabel: "Service",
      options: [
        {
          value: "",
          label: "All"
        },
        ...services.map((item) => ({
          value: item.id, 
          label: item.title
        }))
      ],
      action: setSelectedServiceId
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
      const result = await DeletePortfolio(id);
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
        title="Portofolios"
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

export default Portfolios