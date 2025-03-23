export const Menu = [
  {
    name: "Quotation",
    path: "/dashboard/quotation",
  },
  {
    name: "Home",
    path: "#",
    children: [
      {
        name: "Page Header",
        path: "/dashboard/home/page-headers"
      },{
        name: "Image Slider",
        path: "/dashboard/home/image-sliders"
      },{
        name: "Call To Action",
        path: "/dashboard/home/call-to-actions"
      },{
        name: "FAQ",
        path: "/dashboard/home/faqs"
      },{
        name: "Section Header",
        path: "/dashboard/home/section-headers"
      }
    ]
  },{
    name: "About",
    path: "#",
    children: [
      {
        name: "About Us",
        path: "/dashboard/about/about-us"
      },{
        name: "Business Value",
        path: "/dashboard/about/business-values"
      },{
        name: "Work Value",
        path: "/dashboard/about/work-values"
      },{
        name: "Achievement",
        path: "/dashboard/about/achievements"
      }
    ]
  },{
    name: "Client",
    path: "/dashboard/clients",
  },{
    name: "Service",
    path: "/dashboard/services",
  },{
    name: "Portfolio",
    path: "/dashboard/portfolioes",
  },{
    name: "Blog",
    path: "#",
    children: [
      {
        name: "Category",
        path: "/dashboard/blog/categories"
      },{
        name: "Article",
        path: "/dashboard/blog/articles"
      }
    ]
  },{
    name: "Contact",
    path: "#",
    children: [
      {
        name: "Contact",
        path: "/dashboard/contact/contacts"
      },{
        name: "Social Media",
        path: "/dashboard/contact/social-media"
      }
    ]
  }
]