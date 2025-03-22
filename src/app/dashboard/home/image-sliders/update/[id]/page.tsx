"use client"

import { UpdateImageSlider, GetImageSliderById } from "@/lib/repository/home/imageSlider";
import MutationForm from "@/ui/dashboard/mutationForm"
import { ImageSlider } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { ImageSliderFields } from "@/types/fields";

const UpdateImageSliders = ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = use(params)

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<ImageSlider | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await GetImageSliderById(id);
        if (result.success) {
          if (result.datasets) {
            const imageSliderData: ImageSlider = {
              id: result.datasets.id,
              title: result.datasets.title ?? undefined,
              order: result.datasets.order ?? undefined,
              image: result.datasets.image ?? undefined,
            };
            setSelectedData(imageSliderData);
          }
        } else {
          console.error(result.message);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching status:", error);
        setIsLoading(true);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (formData: ImageSlider) => {
    try {
      setIsLoading(true)
      const result = await UpdateImageSlider(formData);
  
      if (result?.success) {
        router.push("/dashboard/home/image-sliders");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleUpdate}
      fields={ImageSliderFields()}
      title="Image Slider"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
      withImage
    />
  )
}

export default UpdateImageSliders