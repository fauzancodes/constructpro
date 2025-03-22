import Image from "next/image";
import { SetStateAction, Dispatch } from "react";

interface FilterProps {
  imageUrl?: string;
  setImagePreviewUrl?: Dispatch<SetStateAction<string>>;
}

const ImageModal: React.FC<FilterProps> = ({ imageUrl, setImagePreviewUrl }) => {
  if (!imageUrl) imageUrl = "/images/image-placeholder.webp"

  return (
    <dialog id="image-modal" className="modal">
      <div className="modal-box">
        <Image src={imageUrl} alt="Image Preview" width={1000} height={1000} />
        <div className="modal-action">
          <form method="dialog">
            <button onClick={() => setImagePreviewUrl && setImagePreviewUrl("/images/image-placeholder.webp")} className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default ImageModal