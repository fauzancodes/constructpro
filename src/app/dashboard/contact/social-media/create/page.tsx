"use client"

import { CreateSocialMedia } from "@/lib/repository/contact/socialMedia";
import MutationForm from "@/ui/dashboard/mutationForm"
import { SocialMedia } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SocialMediaFields } from "@/types/fields";

const CreateSocialMedias = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState<SocialMedia | null>(null);

  const handleCreate = async (formData: SocialMedia) => {
    try {
      setIsLoading(true)
      const result = await CreateSocialMedia(formData);
  
      if (result?.success) {
        router.push("/dashboard/contact/social-media");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleCreate}
      fields={SocialMediaFields()}
      title="Media Sosial"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
    />
  )
}

export default CreateSocialMedias