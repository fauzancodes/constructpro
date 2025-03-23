import { Dispatch, SetStateAction } from "react";

interface FilterOption {
  label: string;
  id: string;
  ariaLabel: string;
  options: { value: string; label: string }[];
  action: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<"asc" | "desc" | undefined>> | Dispatch<SetStateAction<number>>;
}

interface FilterProps {
  filterOptions: FilterOption[];
  setTotalPage: Dispatch<SetStateAction<number>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setPerPage: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
}

const FilterModal: React.FC<FilterProps> = ({ filterOptions, setTotalPage, setCurrentPage, setPerPage, setOffset }) => {
  const handleSelectChange = (
    action: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<"asc" | "desc" | undefined>> | Dispatch<SetStateAction<number>>,
    value: string
  ) => {
    if (typeof action === "function") {
      setTotalPage(1)
      setCurrentPage(1)
      setPerPage(7)
      setOffset(0)
      
      if (value === "asc" || value === "desc" || value === undefined) {
        (action as Dispatch<SetStateAction<"asc" | "desc" | undefined>>)(value as "asc" | "desc" | undefined);
      } else {
        (action as Dispatch<SetStateAction<string>>)(value);
      }
    }
  };

  return (
    <dialog id="filter-modal" className="modal">
      <div className="modal-box">
        {filterOptions.map((filter, index) => (
          <fieldset key={index} className="fieldset mb-3">
            <legend className="fieldset-legend ml-5">{filter.label}</legend>
            <select 
              id={filter.id} 
              aria-label={filter.ariaLabel} 
              onChange={(e) => handleSelectChange(filter.action, e.target.value)}
              defaultValue="Select one" className="select w-full">
              <option disabled={true}>Select one</option>
              {filter.options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </fieldset>
        ))}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default FilterModal