"use client"

import { GetAllQuotations } from "@/lib/repository/quotation";
import DynamicTable from "@/ui/dashboard/table";
import TableFooter from "@/ui/dashboard/tableFooter";
import TableHeader from "@/ui/dashboard/tableHeader";
// import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Quotations = () => {
  // const currentRoute = usePathname();
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
  const [modalData, setModalData] = useState<Record<string, any>>({});

  const columns = [
    {
      label: "Tanggal",
      key: "createdAt"
    },{
      label: "Nama Lengkap",
      key: "fullname"
    },{
      label: "Email",
      key: "email"
    },{
      label: "Telepon",
      key: "phone"
    },{
      label: "Judul",
      key: "title"
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const result = await GetAllQuotations(search, offset, perPage, order, sort);
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
        { value: "createdAt", label: "Tanggal" },
        { value: "title", label: "Judul" },
        { value: "fullname", label: "Nama Lengkap" },
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
      <dialog id="quotation-modal" className="modal">
        <div className="modal-box min-w-9/12">
          <div className="modal-action flex flex-wrap">
            <div className="w-full">
              <p><strong>Nama Lengkap:</strong> {modalData.fullname}</p>
              <p><strong>Email:</strong> {modalData.email}</p>
              <p><strong>Telepon:</strong> {modalData.phone}</p>
              <p className="my-3 font-bold text-xl">{modalData.title}</p>
              <p className="text-justify">{modalData.description}</p>
            </div>
            <form method="dialog">
              <button onClick={() => setModalData({})} className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <TableHeader 
        title="Penawaran"
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
        detailModalId="quotation-modal"
        setModalData={setModalData}
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

export default Quotations