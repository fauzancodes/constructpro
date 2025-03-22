"use client"

import { UpdateSocialMedia, GetSocialMediaById } from "@/lib/repository/contact/socialMedia";
import MutationForm from "@/ui/dashboard/mutationForm"
import { SocialMedia } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { SocialMediaFields } from "@/types/fields";

const UpdateSocialMedias = ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = use(params)

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<SocialMedia | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await GetSocialMediaById(id);
        if (result.success) {
          if (result.datasets) {
            const socialMediaData: SocialMedia = {
              id: result.datasets.id,
              title: result.datasets.title ?? undefined,
              link: result.datasets.link ?? undefined,
            };
            setSelectedData(socialMediaData);
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

  const handleUpdate = async (formData: SocialMedia) => {
    try {
      setIsLoading(true)
      const result = await UpdateSocialMedia(formData);
  
      if (result?.success) {
        router.push("/dashboard/contact/social-media");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleUpdate}
      fields={SocialMediaFields()}
      title="Media Sosial"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
      withImage
    />
  )
}

export default UpdateSocialMedias