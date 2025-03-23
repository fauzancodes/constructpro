import { Dispatch, SetStateAction } from "react";
import { FaFilter, FaPlus } from "react-icons/fa6"
import FilterModal from "@/ui/dashboard/filterModal";
import Link from "next/link";

interface FilterOption {
  label: string;
  id: string;
  ariaLabel: string;
  options: { value: string; label: string }[];
  action: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<"asc" | "desc" | undefined>> | Dispatch<SetStateAction<number>>;
}

interface TableHeaderProps {
  title: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filterOptions?: FilterOption[];
  createPath?: string;
  totalData: number;
  setTotalPage: Dispatch<SetStateAction<number>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setPerPage: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
}

const TableHeader: React.FC<TableHeaderProps> = ({ title, setSearch, filterOptions, createPath, totalData, setTotalPage, setCurrentPage, setPerPage, setOffset }) => {
  return (
    <div className="flex flex-wrap justify-between items-center my-5">
      <h1 className="font-bold text-3xl w-full md:w-fit md:!ml-5 !mb-5 md:!mb-0 flex justify-center md:justify-start items-center gap-3">{title} <span className="bg-base-200 p-2 text-sm font-medium">{totalData && totalData > 0 && totalData}</span></h1>
      <div className="flex flex-wrap justify-between gap-3">
        {filterOptions && <>
          <label className="input w-full md:w-fit">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
            <input type="search" required placeholder="Search....." aria-describedby="search" onChange={
              (e) => {
                setTotalPage(1)
                setCurrentPage(1)
                setPerPage(7)
                setOffset(0)
                setSearch(e.target.value)
              }
            } className="" />
          </label>
          <button className="btn btn-secondary" onClick={()=>(document.getElementById('filter-modal') as HTMLDialogElement)?.showModal()}><FaFilter /></button>
          <FilterModal 
            filterOptions={filterOptions} 
            setTotalPage={setTotalPage}
            setCurrentPage={setCurrentPage}
            setOffset={setOffset}
            setPerPage={setPerPage}
          />
        </>}
        {createPath && createPath != "" && <Link href={createPath} className="btn btn-primary"><FaPlus />Tambah Baru</Link>}
      </div>
    </div>
  )
}

export default TableHeader