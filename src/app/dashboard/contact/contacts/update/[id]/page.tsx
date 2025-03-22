"use client"

import { UpdateContact, GetContactById } from "@/lib/repository/contact/contact";
import MutationForm from "@/ui/dashboard/mutationForm"
import { Contact } from "@/types/common.types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { ContactFields } from "@/types/fields";

const UpdateContacts = ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = use(params)

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await GetContactById(id);
        if (result.success) {
          if (result.datasets) {
            const contactData: Contact = {
              id: result.datasets.id,
              title: result.datasets.title ?? undefined,
              code: result.datasets.code ?? undefined,
              description: result.datasets.description ?? undefined,
              image: result.datasets.image ?? undefined,
              link: result.datasets.link ?? undefined,
            };
            setSelectedData(contactData);
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

  const handleUpdate = async (formData: Contact) => {
    try {
      setIsLoading(true)
      const result = await UpdateContact(formData);
  
      if (result?.success) {
        router.push("/dashboard/contact/contacts");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <MutationForm 
      onSubmit={handleUpdate}
      fields={ContactFields()}
      title="Kontak"
      isUpdate={!!selectedData}
      initialData={selectedData || {}}
      setSelected={setSelectedData}
      isLoading={isLoading}
      withImage
    />
  )
}

export default UpdateContacts