"use client"

import { GetAllCallToActions } from "@/lib/repository/home/callToAction";
import DynamicTable from "@/ui/dashboard/table";
import TableFooter from "@/ui/dashboard/tableFooter";
import TableHeader from "@/ui/dashboard/tableHeader";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CallToActions = () => {
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
      label: "Title",
      key: "title"
    },
    {
      label: "Description",
      key: "description"
    },
    {
      label: "Call To Action 1",
      key: "callToAction1"
    },
    {
      label: "Call To Action 2",
      key: "callToAction2"
    },
    {
      label: "Image 1",
      key: "image1"
    },
    {
      label: "Image 2",
      key: "image2"
    },
    // {
    //   label: "Image 3",
    //   key: "image3"
    // },
    // {
    //   label: "Image 4",
    //   key: "image4"
    // },
    // {
    //   label: "Image 5",
    //   key: "image5"
    // },
    // {
    //   label: "Image 6",
    //   key: "image6"
    // }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const result = await GetAllCallToActions(search, offset, perPage, order, sort);
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
        title="Call To Actions"
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

export default CallToActions