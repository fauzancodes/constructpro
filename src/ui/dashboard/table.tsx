import { FaEllipsisV } from "react-icons/fa";
import { FaArrowUpRightFromSquare, FaCircleInfo, FaImage, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import Loading from "@/ui/home/loading";
import Link from "next/link";
import ImageModal from "@/ui/dashboard/imageModal";
import { Dispatch, SetStateAction, useState } from "react";
import { StringToDate } from "@/lib/utilities/common";

interface Column {
  label: string;
  key: string;
}

interface TableProps {
  columns: Column[];
  data: Array<Record<string, any>>;
  isLoading: boolean;
  externalLinkField?: string;
  updatePath?: string;
  handelDeleteData?: (id: string) => Promise<void>;
  detailModalId?: string;
  setModalData?: Dispatch<SetStateAction<Record<string, any>>>;
}

const DynamicTable: React.FC<TableProps> = ({
  columns,
  data,
  isLoading,
  externalLinkField,
  updatePath,
  handelDeleteData,
  detailModalId,
  setModalData
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("/images/image-placeholder.webp");
  
  if (isLoading) {
    return <Loading />;
  }
  if (data.length === 0) {
    return <p className="text-center md:text-left md:!ml-5 opacity-30">Tidak ada data untuk ditampilkan</p>;
  }


  return (
    <div className="overflow-x-auto bg-base-200">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="p-5">{col.label}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => {
                let cellValue = String(row[col.key] ?? "");

                const isImage = ["png", "webp", "jpg", "jpeg"].some(ext => cellValue.includes(ext));

                const isLink = ["http", "mailto:", "tel:"].some(link => cellValue.includes(link))

                if (row[col.key] instanceof Date) {
                  cellValue = StringToDate(row[col.key]) ?? "-";
                }

                return (
                  <td key={colIndex} className="px-5">
                    {isImage ? (
                      <>
                        <button
                          className="btn btn-ghost p-2 h-fit btn-xl hover:btn-primary"
                          onClick={() => {
                            setImagePreviewUrl(cellValue);
                            (document.getElementById('image-modal') as HTMLDialogElement)?.showModal();
                          }}
                        >
                          <FaImage />
                        </button>
                        <ImageModal imageUrl={imagePreviewUrl} setImagePreviewUrl={setImagePreviewUrl} />
                      </>
                    ) : col.key === "status" ? (
                      cellValue === "true" ? (
                        <div className="bg-success text-success-content font-medium p-2 text-center w-22">
                          Aktif
                        </div>
                      ) : (
                        <div className="bg-error text-error-content font-medium p-2 text-center w-22">
                          Tidak Aktif
                        </div>
                      )
                    ) : cellValue.includes("<p>") ? (
                      <div dangerouslySetInnerHTML={{ __html: cellValue || "-" }}></div>
                    ) : isLink ? (
                      <div className="max-w-52 truncate" title={cellValue || "-"}>
                        <a href={cellValue} target="_blank" className="text-info underline">{cellValue || "-"}</a>
                      </div>
                    ) : (
                      <div className="max-w-52 truncate" title={cellValue || "-"}>
                        {cellValue || "-"}
                      </div>
                    )}
                  </td>
                );
              })}
              <td>
                <div className="dropdown dropdown-left dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost m-1"><FaEllipsisV /></div>
                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 w-52 p-2 shadow-sm px-5">
                    {externalLinkField && row[externalLinkField] && (
                      <li>
                        <Link href={row[externalLinkField]} target="_blank">
                          <FaArrowUpRightFromSquare /> Go to
                        </Link>
                      </li>
                    )}
                    {updatePath && (
                      <li>
                        <Link href={`${updatePath}/${row.id}`}>
                          <FaPenToSquare /> Update
                        </Link>
                      </li>
                    )}
                    {handelDeleteData && (
                      <li className="text-error">
                        <button onClick={() => handelDeleteData(row.id)}>
                          <FaTrashCan /> Delete
                        </button>
                      </li>
                    )}
                    {detailModalId && (
                      <li>
                        <button onClick={
                          () => {
                            if (setModalData) {
                              setModalData(row);
                            }
                            (document.getElementById(detailModalId) as HTMLDialogElement)?.showModal()
                          }
                        }
                        ><FaCircleInfo /> Lihat</button>
                      </li>
                    )}
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
