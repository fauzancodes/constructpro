import { Service } from "@/types/common.types";
import { BlogCategory } from "@prisma/client";

export const PageHeaderFields = () => {
  const fields = {
    title: {
      value: "",
      label: "Judul",
      required: true,
    },
    image: {
      value: "",
      label: "Gambar",
      type: "file" as "file"
    },
    code: {
      value: "",
      label: "Code",
      required: true,
    },
  };

  return fields
}

export const ImageSliderFields = () => {
  const fields = {
    title: {
      value: "",
      label: "Judul",
      required: true,
    },
    image: {
      value: "",
      label: "Gambar",
      type: "file" as "file"
    },
    order: {
      value: "",
      label: "Urutan",
      required: true,
      type: "number" as "number"
    },
  };

  return fields
}

export const CallToActionFields = () => {
  const fields = {
    title: {
      value: "",
      label: "Judul",
      required: true,
    },
    description: {
      value: "",
      label: "Deskripsi",
      required: true,
    },
    callToAction1: {
      value: "",
      label: "Call To Action 1",
      required: true,
    },
    callToAction2: {
      value: "",
      label: "Call To Action 2",
      required: true,
    },
    image1: {
      value: "",
      label: "Gambar 1",
      type: "file" as "file"
    },
    image2: {
      value: "",
      label: "Gambar 2",
      type: "file" as "file"
    },
    image3: {
      value: "",
      label: "Gambar 3",
      type: "file" as "file"
    },
    image4: {
      value: "",
      label: "Gambar 4",
      type: "file" as "file"
    },
    image5: {
      value: "",
      label: "Gambar 5",
      type: "file" as "file"
    },
    image6: {
      value: "",
      label: "Gambar 6",
      type: "file" as "file"
    },
  };

  return fields
}

export const FAQFields = () => {
  const fields = {
    question: {
      value: "",
      label: "Pertanyaan",
      required: true,
    },
    order: {
      value: "",
      label: "Urutan",
      required: true,
      type: "number" as "number"
    },
    answer: {
      value: "",
      label: "Jawaban",
      required: true,
      type: "textarea" as "textarea"
    },
  };

  return fields
}

export const SectionHeaderFields = () => {
  const fields = {
    title: {
      value: "",
      label: "Judul",
      required: true,
    },
    code: {
      value: "",
      label: "Code",
      required: true,
    },
  };

  return fields
}

export const AboutUsFields = () => {
  const fields = {
    title: {
      value: "",
      label: "Judul",
      required: true,
    },
    callToAction: {
      value: "",
      label: "Call To Action",
      required: true,
    },
    description: {
      value: "",
      label: "Deskripsi",
      required: true,
      type: "texteditor" as "texteditor"
    },
    image1: {
      value: "",
      label: "Gambar 1",
      type: "file" as "file"
    },
    image2: {
      value: "",
      label: "Gambar 2",
      type: "file" as "file"
    },
    image3: {
      value: "",
      label: "Gambar 3",
      type: "file" as "file"
    },
  };

  return fields
}

export const BusinessValueFields = () => {
  const fields = {
    title: {
      value: "",
      label: "Judul",
      required: true,
    },
    order: {
      value: "",
      label: "Urutan",
      required: true,
      type: "number" as "number"
    },
    description: {
      value: "",
      label: "Deskripsi",
      required: true,
      type: "textarea" as "textarea"
    },
    code: {
      value: "",
      label: "Code",
      required: true,
    },
  };

  return fields
}

export const WorkValueFields = () => {
  const fields = {
    description: {
      value: "",
      label: "Deskripsi",
      required: true,
      type: "textarea" as "textarea"
    },
    subtitle1: {
      value: "",
      label: "Sub Judul 1",
      required: true,
    },
    subtitle2: {
      value: "",
      label: "Sub Judul 2",
      required: true,
    },
    subdescription1: {
      value: "",
      label: "Sub Deskripsi 1",
      required: true,
      type: "textarea" as "textarea"
    },
    subdescription2: {
      value: "",
      label: "Sub Deskripsi 2",
      required: true,
      type: "textarea" as "textarea"
    },
    callToAction1: {
      value: "",
      label: "Call To Action 1",
      required: true,
    },
    callToAction2: {
      value: "",
      label: "Call To Action 2",
      required: true,
    },
    image: {
      value: "",
      label: "Gambar",
      type: "file" as "file"
    },
  };

  return fields
}

export const AchievementFields = () => {
  const fields = {
    title: {
      value: "",
      label: "Judul",
      required: true,
    },
    total: {
      value: "",
      label: "Jumlah",
      required: true,
      type: "number" as "number"
    },
    code: {
      value: "",
      label: "Code",
      required: true,
    },
  };

  return fields
}

export const ClientFields = () => {
  const fields = {
    name: {
      value: "",
      label: "Nama",
      required: true,
    },
    image: {
      value: "",
      label: "Logo",
      required: true,
      type: "file" as "file"
    },
    order: {
      value: "",
      label: "Urutan",
      required: true,
      type: "number" as "number"
    },
  };

  return fields
}

export const ServiceFields = () => {
  const fields = {
    title: {
      value: "",
      label: "Judul",
      required: true,
    },
    status: {
      value: "",
      label: "Status",
      required: true,
      type: "select" as "select",
      options: [
        {
          value: "true",
          label: "Aktif"
        },{
          value: "false",
          label: "Tidak Aktif"
        }
      ],
    },
    order: {
      value: "",
      label: "Urutan",
      required: true,
      type: "number" as "number"
    },
    description: {
      value: "",
      label: "Deskripsi",
      type: "textarea" as "textarea"
    },
    image: {
      value: "",
      label: "Gambar",
      type: "file" as "file"
    },
  };

  return fields
}

export const PortfolioFields = (services: Service[]) => {
  const fields = {
    start: {
      value: "",
      label: "Tanggal Mulai",
      type: "date" as "date",
    },
    end: {
      value: "",
      label: "Tanggal Berakhir",
      type: "date" as "date",
    },
    serviceId: {
      value: 0,
      label: "Layanan",
      type: "select" as "select",
      options: [
        {
          value: 0,
          label: "Tidak Ada"
        },
        ...services.map((item) => ({
          value: item.id, 
          label: item.title || ""
        }))
      ],
    },
    status: {
      value: "",
      label: "Status",
      required: true,
      type: "select" as "select",
      options: [
        {
          value: "true",
          label: "Aktif"
        },{
          value: "false",
          label: "Tidak Aktif"
        }
      ],
    },
    title: {
      value: "",
      label: "Judul",
      required: true,
    },
    client: {
      value: "",
      label: "Nama Klien",
    },
    address: {
      value: "",
      label: "Alamat Klien",
      type: "textarea" as "textarea",
    },
    description: {
      value: "",
      label: "Deskripsi",
      type: "texteditor" as "texteditor",
    },
    image1: {
      value: "",
      label: "Gambar 1",
      type: "file" as "file"
    },
    image2: {
      value: "",
      label: "Gambar 2",
      type: "file" as "file"
    },
    image3: {
      value: "",
      label: "Gambar 3",
      type: "file" as "file"
    },
    image4: {
      value: "",
      label: "Gambar 4",
      type: "file" as "file"
    },
    image5: {
      value: "",
      label: "Gambar 5",
      type: "file" as "file"
    },
    image6: {
      value: "",
      label: "Gambar 6",
      type: "file" as "file"
    },
    image7: {
      value: "",
      label: "Gambar 7",
      type: "file" as "file"
    },
    image8: {
      value: "",
      label: "Gambar 8",
      type: "file" as "file"
    },
    image9: {
      value: "",
      label: "Gambar 9",
      type: "file" as "file"
    },
    image10: {
      value: "",
      label: "Gambar 10",
      type: "file" as "file"
    },
  };

  return fields
}

export const BlogCategoryFields = () => {
  const fields = {
    title: {
      value: "",
      label: "Judul",
      required: true,
    },
    status: {
      value: "",
      label: "Status",
      required: true,
      type: "select" as "select",
      options: [
        {
          value: "true",
          label: "Aktif"
        },{
          value: "false",
          label: "Tidak Aktif"
        }
      ],
    },
    order: {
      value: "",
      label: "Urutan",
      required: true,
      type: "number" as "number"
    },
  };

  return fields
}

export const BlogFields = (categories: BlogCategory[]) => {
  const fields = {
    title: {
      value: "",
      label: "Judul",
      required: true,
    },
    author: {
      value: "",
      label: "Penulis",
      required: true,
    },
    date: {
      value: "",
      label: "Tanggal",
      required: true,
      type: "date" as "date",
    },
    tags: {
      value: "",
      label: "Tags",
      required: true,
    },
    status: {
      value: "",
      label: "Status",
      required: true,
      type: "select" as "select",
      options: [
        {
          value: "true",
          label: "Aktif"
        },{
          value: "false",
          label: "Tidak Aktif"
        }
      ],
    },
    categoryId: {
      value: 0,
      label: "Kategori",
      type: "select" as "select",
      options: [
        {
          value: 0,
          label: "Tidak Ada"
        },
        ...categories.map((item) => ({
          value: item.id, 
          label: item.title || ""
        }))
      ],
    },
    description: {
      value: "",
      label: "Deskripsi",
      required: true,
      type: "textarea" as "textarea",
    },
    body: {
      value: "",
      label: "Isi",
      required: true,
      type: "texteditor" as "texteditor",
    },
    image: {
      value: "",
      label: "Gambar",
      type: "file" as "file"
    },
  };

  return fields
}

export const ContactFields = () => {
  const fields = {
    title: {
      value: "",
      label: "Judul",
      required: true,
    },
    description: {
      value: "",
      label: "Deskripsi",
    },
    link: {
      value: "",
      label: "Link",
    },
    code: {
      value: "",
      label: "Code",
      required: true,
    },
    image: {
      value: "",
      label: "Gambar",
      type: "file" as "file"
    },
  };

  return fields
}

export const SocialMediaFields = () => {
  const fields = {
    title: {
      value: "",
      label: "Judul",
      required: true,
    },
    link: {
      value: "",
      label: "Link",
    }
  };

  return fields
}

export const QuotationFields = () => {
  const fields = {
    fullname: {
      value: "",
      label: "Nama Lengkap",
      required: true,
    },
    email: {
      value: "",
      label: "Email",
      required: true,
    },
    phone: {
      value: "",
      label: "Telepon",
      required: true,
    },
    title: {
      value: "",
      label: "Judul",
      required: true,
    },
    description: {
      value: "",
      label: "Link",
      required: true,
      type: "textarea" as "textarea"
    }
  };

  return fields
}
