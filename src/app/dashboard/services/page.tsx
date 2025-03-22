"use client"

import { DeleteService, GetAllServices } from "@/lib/repository/service";
import DynamicTable from "@/ui/dashboard/table";
import TableFooter from "@/ui/dashboard/tableFooter";
import TableHeader from "@/ui/dashboard/tableHeader";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Services = () => {
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

  const columns = [
    {
      label: "Judul",
      key: "title"
    },{
      label: "Deskripsi",
      key: "description"
    },
    {
      label: "Gambar",
      key: "image"
    },
    {
      label: "Status",
      key: "status"
    },
    {
      label: "Urutan",
      key: "order"
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const result = await GetAllServices(search, offset, perPage, order, sort, status);
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
  }, [currentPage, search, perPage, order, sort, status, refetch]);

  const filterOptions = [
    {
      label: "Status",
      id: "select-status",
      ariaLabel: "Status",
      options: [
        { value: "", label: "Semua" },
        { value: "true", label: "Aktif" },
        { value: "false", label: "Tidak Aktif" },
      ],
      action: setStatus
    },
    {
      label: "Order",
      id: "select-order",
      ariaLabel: "Order",
      options: [
        { value: "updatedAt", label: "Terakhir Diubah" },
        { value: "title", label: "Judul" },
        { value: "order", label: "Urutan" },
      ],
      action: setOrder
    },
    {
      label: "Sort",
      id: "select-sort",
      ariaLabel: "Sort",
      options: [
        { value: "desc", label: "Menurun" },
        { value: "asc", label: "Menaik" },
      ],
      action: setSort
    },
  ];

  const handelDeleteData = async (id: string) => {
    try {
      const result = await DeleteService(id);
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
        title="Layanan"
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

export default Services