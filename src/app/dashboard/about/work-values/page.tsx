"use client"

import { GetAllWorkValues } from "@/lib/repository/about/workValue";
import DynamicTable from "@/ui/dashboard/table";
import TableFooter from "@/ui/dashboard/tableFooter";
import TableHeader from "@/ui/dashboard/tableHeader";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const WorkValues = () => {
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
  const [order] = useState("");
  const [sort] = useState<"asc" | "desc" | undefined>(undefined);

  const columns = [
    {
      label: "Deskripsi",
      key: "description"
    },{
      label: "Sub Judul 1",
      key: "subtitle1"
    },{
      label: "Sub Judul 2",
      key: "subtitle2"
    },{
      label: "Call To Action 1",
      key: "callToAction1"
    },{
      label: "Gambar",
      key: "image"
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const result = await GetAllWorkValues(search, offset, perPage, order, sort);
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

  return (
    <>
      <TableHeader 
        title="Nilai Kerja"
        setSearch={setSearch} 
        setTotalPage={setTotalPage}
        setCurrentPage={setCurrentPage}
        setOffset={setOffset}
        setPerPage={setPerPage}
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

export default WorkValues