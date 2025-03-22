"use client"

import { GetAllAchievements } from "@/lib/repository/about/achievement";
import DynamicTable from "@/ui/dashboard/table";
import TableFooter from "@/ui/dashboard/tableFooter";
import TableHeader from "@/ui/dashboard/tableHeader";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Achievements = () => {
  const currentRoute = usePathname();
  const [refetch] = useState(false);
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

  const columns = [
    {
      label: "Judul",
      key: "title"
    },{
      label: "Jumlah",
      key: "total"
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const result = await GetAllAchievements(search, offset, perPage, order, sort, "");
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
  }, [currentPage, search, perPage, order, sort, refetch]);

  const filterOptions = [
    {
      label: "Order",
      id: "select-order",
      ariaLabel: "Order",
      options: [
        { value: "updatedAt", label: "Terakhir Diubah" },
        { value: "title", label: "Judul" },
        { value: "total", label: "Jumlah" },
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

  return (
    <>
      <TableHeader 
        title="Pencapaian"
        setSearch={setSearch} 
        setTotalPage={setTotalPage}
        setCurrentPage={setCurrentPage}
        setOffset={setOffset}
        setPerPage={setPerPage}
        filterOptions={filterOptions}
        totalData={totalData}
      />
      <DynamicTable 
        isLoading={isLoading}
        columns={columns} 
        data={datasets}
        updatePath={`${currentRoute}/update`}
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

export default Achievements