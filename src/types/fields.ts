import { Service } from "@/types/common.types";
import { BlogCategory } from "@prisma/client";

export const PageHeaderFields = () => {
  const fields = {
    title: {
      value: "",
      label: "Title",
      required: true,
    },
    image: {
      value: "",
      label: "Image",
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
      label: "Title",
      required: true,
    },
    image: {
      value: "",
      label: "Image",
      type: "file" as "file"
    },
    order: {
      value: "",
      label: "Order",
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
      label: "Title",
      required: true,
    },
    description: {
      value: "",
      label: "Description",
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
      label: "Image 1",
      type: "file" as "file"
    },
    image2: {
      value: "",
      label: "Image 2",
      type: "file" as "file"
    },
    image3: {
      value: "",
      label: "Image 3",
      type: "file" as "file"
    },
    image4: {
      value: "",
      label: "Image 4",
      type: "file" as "file"
    },
    image5: {
      value: "",
      label: "Image 5",
      type: "file" as "file"
    },
    image6: {
      value: "",
      label: "Image 6",
      type: "file" as "file"
    },
  };

  return fields
}

export const FAQFields = () => {
  const fields = {
    question: {
      value: "",
      label: "Question",
      required: true,
    },
    order: {
      value: "",
      label: "Order",
      required: true,
      type: "number" as "number"
    },
    answer: {
      value: "",
      label: "Answer",
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
      label: "Title",
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
      label: "Title",
      required: true,
    },
    callToAction: {
      value: "",
      label: "Call To Action",
      required: true,
    },
    description: {
      value: "",
      label: "Description",
      required: true,
      type: "texteditor" as "texteditor"
    },
    image1: {
      value: "",
      label: "Image 1",
      type: "file" as "file"
    },
    image2: {
      value: "",
      label: "Image 2",
      type: "file" as "file"
    },
    image3: {
      value: "",
      label: "Image 3",
      type: "file" as "file"
    },
  };

  return fields
}

export const BusinessValueFields = () => {
  const fields = {
    title: {
      value: "",
      label: "Title",
      required: true,
    },
    order: {
      value: "",
      label: "Order",
      required: true,
      type: "number" as "number"
    },
    description: {
      value: "",
      label: "Description",
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
      label: "Description",
      required: true,
      type: "textarea" as "textarea"
    },
    subtitle1: {
      value: "",
      label: "Subtitle 1",
      required: true,
    },
    subtitle2: {
      value: "",
      label: "Subtitle 2",
      required: true,
    },
    subdescription1: {
      value: "",
      label: "Subdescription 1",
      required: true,
      type: "textarea" as "textarea"
    },
    subdescription2: {
      value: "",
      label: "Subdescription 2",
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
      label: "Image",
      type: "file" as "file"
    },
  };

  return fields
}

export const AchievementFields = () => {
  const fields = {
    title: {
      value: "",
      label: "Title",
      required: true,
    },
    total: {
      value: "",
      label: "Total",
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
      label: "Name",
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
      label: "Order",
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
      label: "Title",
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
          label: "Active"
        },{
          value: "false",
          label: "Inactive"
        }
      ],
    },
    order: {
      value: "",
      label: "Order",
      required: true,
      type: "number" as "number"
    },
    description: {
      value: "",
      label: "Description",
      type: "textarea" as "textarea"
    },
    image: {
      value: "",
      label: "Image",
      type: "file" as "file"
    },
  };

  return fields
}

export const PortfolioFields = (services: Service[]) => {
  const fields = {
    start: {
      value: "",
      label: "Start Date",
      type: "date" as "date",
    },
    end: {
      value: "",
      label: "End Date",
      type: "date" as "date",
    },
    serviceId: {
      value: 0,
      label: "Service",
      type: "select" as "select",
      options: [
        {
          value: 0,
          label: "Nothing"
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
          label: "Active"
        },{
          value: "false",
          label: "Inactive"
        }
      ],
    },
    title: {
      value: "",
      label: "Title",
      required: true,
    },
    client: {
      value: "",
      label: "Client Name",
    },
    address: {
      value: "",
      label: "Client Address",
      type: "textarea" as "textarea",
    },
    description: {
      value: "",
      label: "Description",
      type: "texteditor" as "texteditor",
    },
    image1: {
      value: "",
      label: "Image 1",
      type: "file" as "file"
    },
    image2: {
      value: "",
      label: "Image 2",
      type: "file" as "file"
    },
    image3: {
      value: "",
      label: "Image 3",
      type: "file" as "file"
    },
    image4: {
      value: "",
      label: "Image 4",
      type: "file" as "file"
    },
    image5: {
      value: "",
      label: "Image 5",
      type: "file" as "file"
    },
    image6: {
      value: "",
      label: "Image 6",
      type: "file" as "file"
    },
    image7: {
      value: "",
      label: "Image 7",
      type: "file" as "file"
    },
    image8: {
      value: "",
      label: "Image 8",
      type: "file" as "file"
    },
    image9: {
      value: "",
      label: "Image 9",
      type: "file" as "file"
    },
    image10: {
      value: "",
      label: "Image 10",
      type: "file" as "file"
    },
  };

  return fields
}

export const BlogCategoryFields = () => {
  const fields = {
    title: {
      value: "",
      label: "Title",
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
          label: "Active"
        },{
          value: "false",
          label: "Inactive"
        }
      ],
    },
    order: {
      value: "",
      label: "Order",
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
      label: "Title",
      required: true,
    },
    author: {
      value: "",
      label: "Author",
      required: true,
    },
    date: {
      value: "",
      label: "Date",
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
          label: "Active"
        },{
          value: "false",
          label: "Inactive"
        }
      ],
    },
    categoryId: {
      value: 0,
      label: "Category",
      type: "select" as "select",
      options: [
        {
          value: 0,
          label: "Nothing"
        },
        ...categories.map((item) => ({
          value: item.id, 
          label: item.title || ""
        }))
      ],
    },
    description: {
      value: "",
      label: "Description",
      required: true,
      type: "textarea" as "textarea",
    },
    body: {
      value: "",
      label: "Body",
      required: true,
      type: "texteditor" as "texteditor",
    },
    image: {
      value: "",
      label: "Image",
      type: "file" as "file"
    },
  };

  return fields
}

export const ContactFields = () => {
  const fields = {
    title: {
      value: "",
      label: "Title",
      required: true,
    },
    description: {
      value: "",
      label: "Description",
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
      label: "Image",
      type: "file" as "file"
    },
  };

  return fields
}

export const SocialMediaFields = () => {
  const fields = {
    title: {
      value: "",
      label: "Title",
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
      label: "Fullname",
      required: true,
    },
    email: {
      value: "",
      label: "Email",
      required: true,
    },
    phone: {
      value: "",
      label: "Phone",
      required: true,
    },
    title: {
      value: "",
      label: "Title",
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
