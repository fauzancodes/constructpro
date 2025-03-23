"use client"

import { UpdateAchievement, GetAchievementById } from "@/lib/repository/about/achievement";
import MutationForm from "@/ui/dashboard/mutationForm"
import { Achievement } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { AchievementFields } from "@/types/fields";

const UpdateAchievements = ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = use(params)

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<Achievement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await GetAchievementById(id);
        if (result.success) {
          if (result.datasets) {
            const achievementData: Achievement = {
              id: result.datasets.id,
              title: result.datasets.title ?? undefined,
              total: result.datasets.total ?? undefined,
              code: result.datasets.code ?? undefined,
            };
            setSelectedData(achievementData);
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

  const handleUpdate = async (formData: Achievement) => {
    try {
      setIsLoading(true)
      const result = await UpdateAchievement(formData);
  
      if (result?.success) {
        router.push("/dashboard/about/achievements");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleUpdate}
      fields={AchievementFields()}
      title="Achievement"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
      withImage
    />
  )
}

export default UpdateAchievements