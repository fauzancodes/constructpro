"use client"

import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import Loading from "@/ui/home/loading";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface FieldConfig {
  value: any;
  label: string;
  type?: "text" | "textarea" | "checkbox" | "select" | "file" | "number" | "texteditor" | "date";
  options?: { value: any; label: string }[];
  required?: boolean;
}

interface MutationFormProps<T = any> {
  onSubmit: (formData: T) => void;
  fields: Record<string, FieldConfig>;
  title: string;
  isUpdate?: boolean;
  initialData?: Record<string, any>;
  setSelected: (value: SetStateAction<T | null>) => void;
  isLoading: boolean;
  withImage?: boolean;
  multiImage?: boolean;
  smallImagePreview?: boolean;
}

const MutationForm: React.FC<MutationFormProps> = ({
  onSubmit,
  title,
  fields,
  isUpdate,
  initialData,
  setSelected,
  isLoading,
  withImage,
  multiImage,
  smallImagePreview
}) => {
  const [imagePreviewLoading, setImagePreviewLoading] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>(
    initialData ||
      Object.fromEntries(Object.entries(fields).map(([key, config]) => [key, config.value]))
  );

  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>(
    Object.fromEntries(
      Object.entries(fields)
        .filter(([, config]) => config.type === "file")
        .map(([key]) => [key, "/images/image-placeholder.webp"])
    )
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      Object.keys(imagePreviews).forEach((key) => {
        if (initialData[key]) {
          setImagePreviews((prev) => ({ ...prev, [key]: initialData[key] }));
        }
      });
    }
  }, [initialData]);

  const uploadImage = async (file: File, name: string) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setImagePreviewLoading(true)
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("File uploaded successfully:", data);

        setImagePreviews((prev) => ({ ...prev, [name]: data.filePath }));
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: `${data.filePath}`,
        }));
      } else {
        console.error("File upload failed.");
      }
      setImagePreviewLoading(false)
    } catch (error) {
      console.error("Error uploading file:", error);
      setImagePreviewLoading(false)
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target as HTMLInputElement;
    
    if (type === "date") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value ? new Date(value) : "",
      }));
    } else if (type === "file") {
      const files = (e.target as HTMLInputElement).files;
      const file = files ? files[0] : null;
      if (file) uploadImage(file, name);
    } else if (value === "true" || value == "false") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value === "true",
      }));
    } else {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleQuillChange = (key: string, content: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: content,
    }));
  };

  const handleSubmit = () => {
    if (isUpdate && initialData?.id) {
      onSubmit({ id: initialData.id, ...formData });
    } else {
      onSubmit(formData);
    }

    setFormData(Object.fromEntries(Object.entries(fields).map(([key, config]) => [key, config.value])));
    setImagePreviews(Object.fromEntries(
      Object.entries(fields)
        .filter(([, config]) => config.type === "file")
        .map(([key]) => [key, "/images/image-placeholder.webp"])
    ))
  };

  const handleReset = () => {
    setFormData(Object.fromEntries(Object.entries(fields).map(([key, config]) => [key, config.value])));
    setSelected(null);
    setImagePreviews(Object.fromEntries(
      Object.entries(fields)
        .filter(([, config]) => config.type === "file")
        .map(([key]) => [key, "/images/image-placeholder.webp"])
    ))
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="m-5">
      <h1 className="font-bold text-3xl w-full text-center !mb-5">{isUpdate ? "Merubah" : "Membuat"} {title}</h1>
      {withImage && (
        <div className="flex flex-wrap justify-center gap-5">
          {Object.entries(imagePreviews).map(([key, src]) => (
            <label key={key} htmlFor={key} className={`${multiImage ? smallImagePreview ? "w-2/12" : "w-3/12" : "w-5/12"} max-h-96 cursor-pointer`}>
              <Image alt={key} src={src} width={1000} height={1000} className={`w-full h-full ${src === "/images/image-placeholder.webp" ? "object-contain" : "object-cover"}`} />
            </label>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center items-center gap-5">
        {Object.entries(fields).map(([key, config]) => {
          const fieldType = config.type || (typeof config.value === "boolean" ? "checkbox" : "text");
          let fieldWidth = "md:w-5/12"
          if (fieldType === "number") fieldWidth = "md:w-2/12"
          if (fieldType === "texteditor" || fieldType === "textarea") fieldWidth = "md:w-10/12"
          
          return (
            <fieldset key={key} className={`fieldset mt-5 w-full ${fieldWidth} ${key === "code" || fieldType === "file" ? "hidden" : ""}`}>
              <legend className="fieldset-legend text-xl semibold ml-5">{config.label}</legend>
              {fieldType === "select" ? (
                <select 
                  name={key} 
                  value={
                    formData[key] === true || formData[key] === false
                      ? formData[key] === true
                        ? "true"
                        : "false"
                      : formData[key] || "Pilih salah satu"
                  }
                  onChange={handleChange}
                  className="select w-full"
                  required={config.required}
                >
                  <option disabled={true}>Pilih salah satu</option>
                  {config.options?.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : fieldType === "checkbox" ? (
                <label className="fieldset-label">
                  <input 
                    type="checkbox" 
                    className="checkbox w-full" 
                    name={key}
                    checked={formData[key] || false}
                    onChange={handleChange}
                    required={config.required}
                  />
                  {`Is ${config.label}?`}
                </label>
              ) : fieldType === "textarea" ? (
                <textarea 
                  className="textarea h-24 w-full" 
                  placeholder={`Silahkan masukan ${config.label.toLocaleLowerCase()}`}
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  required={config.required}
                >
                </textarea>
              ) : fieldType === "file" ? (
                <input 
                  id={key}
                  type="file" 
                  name={key} 
                  onChange={handleChange} 
                  className="file-input w-full" 
                />
              ) : fieldType === "number" ? (
                <input 
                  type="number"
                  name={key}
                  value={formData[key] ?? 0}
                  onChange={handleChange}
                  className="input w-full"
                  placeholder="1"
                  required={config.required}
                />
              ) : fieldType === "texteditor" ? (
                <ReactQuill
                  value={formData[key] || ""}
                  onChange={(content) => handleQuillChange(key, content)}
                  style={{ minHeight: "20rem" }}
                  className="mb-10"
                />
              ) : fieldType === "date" ? (
                <input 
                  type="date"
                  name={key}
                  value={
                    formData[key] instanceof Date
                      ? formData[key].toISOString().split("T")[0]
                      : formData[key] || ""
                  }
                  onChange={handleChange}
                  className="input w-full"
                  required={config.required}
                />
              ) : (
                <input 
                  type="text"
                  placeholder={`Silahkan masukan ${config.label.toLocaleLowerCase()}`}
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  className="input w-full"
                  required={config.required}
                />
              )}
            </fieldset>
          );
        })}
        <div className="w-full flex flex-wrap mt-10 md:mt-5 justify-center items-center gap-5">
          <button type="submit" className="btn btn-primary w-full md:w-32" disabled={imagePreviewLoading}>Simpan</button>
          {!isUpdate && <button type="button" className="btn w-full md:w-32" onClick={handleReset}>Atur Ulang</button>}
        </div>
      </form>
    </div>
  )
}

export default MutationForm