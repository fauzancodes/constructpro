import { Dispatch, SetStateAction } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"

interface TableFooterProps {
  totalDataFiltered: number;
  limit: number;
  offset: number;
  totalPage: number;
  currentPage: number;
  setPerPage: Dispatch<SetStateAction<number>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const TableFooter: React.FC<TableFooterProps> = ({ 
  totalDataFiltered, 
  limit, 
  offset, 
  totalPage, 
  currentPage, 
  setPerPage, 
  setCurrentPage, 
  setOffset, 
  setIsLoading 
}) => {
  const handlePageChange = (page: number) => {
    setIsLoading(true)
    setCurrentPage(page);
    setOffset(page > 1 ? (page - 1) * limit : 0);
    setIsLoading(false)
  };
  const handlePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true)
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
    setOffset(0);
    setIsLoading(false)
  };

  const dataEnd = offset + limit > totalDataFiltered ? totalDataFiltered : offset > 0 ? offset + limit : limit
  const dataStart = totalPage > 0 ? offset > 0 ? offset + 1 : 1 : 0

  return (
    <div className="flex flex-wrap justify-between items-center mt-5 gap-3">
      {totalDataFiltered > 0 && 
        <span className="md:ml-5 text-sm w-full md:w-fit">Displaying data {dataStart} to {dataEnd} of {totalDataFiltered} data</span>
      }
      {totalPage > 1 &&
        <div className="flex flex-wrap justify-between items-center gap-3 w-full md:w-fit">
          <select defaultValue="Per page" onChange={handlePerPage} className="select w-fit">
            <option disabled={true}>Per page</option>
            <option value={7}>7</option>
            <option value={14}>14</option>
            <option value={21}>21</option>
            <option value={28}>28</option>
            <option value={35}>35</option>
          </select>
          <div className="join">
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              className="join-item btn" 
              disabled={currentPage === 1}
            ><FaArrowLeft /></button>
            {RenderPaginationItems(totalPage, currentPage, handlePageChange)}
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              className="join-item btn" 
              disabled={currentPage === totalPage}
            ><FaArrowRight /></button>
          </div>
        </div>
      }
    </div>
  )
}

export default TableFooter

export const RenderPaginationItems = (
  totalPage: number,
  currentPage: number,
  onPageChange: (page: number) => void
) => {
  const paginationItems = [];

  if (totalPage <= 6) {
    for (let i = 1; i <= totalPage; i++) {
      paginationItems.push(
        <button 
          key={i} 
          onClick={() => onPageChange(i)} 
          className={`hidden md:block join-item btn ${i == currentPage && "btn-active"}`}
        >{i}</button>
      );
    }
  } else {
    paginationItems.push(
      <button 
        key={1} 
        onClick={() => onPageChange(1)} 
        className={`hidden md:block join-item btn ${currentPage == 1 && "btn-active"}`}
      >1</button>
    );

    if (currentPage > 4) {
      paginationItems.push(<button key="start-ellipsis" className={`hidden md:block join-item btn btn-disabled`}>...</button>);
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPage - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      paginationItems.push(
        <button 
          key={i} 
          onClick={() => onPageChange(i)} 
          className={`hidden md:block join-item btn ${i == currentPage && "btn-active"}`}
        >{i}</button>
      );
    }

    if (currentPage < totalPage - 3) {
      paginationItems.push(<button key="end-ellipsis" className={`hidden md:block join-item btn btn-disabled`}>...</button>);
    }

    paginationItems.push(
      <button 
        key={totalPage} 
        onClick={() => onPageChange(totalPage)} 
        className={`hidden md:block join-item btn ${currentPage == totalPage && "btn-active"}`}
      >{totalPage}</button>
    );
  }

  return paginationItems;
};