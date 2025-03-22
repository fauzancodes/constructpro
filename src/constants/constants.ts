export const Menu = [
  {
    name: "Penawaran",
    path: "/dashboard/quotation",
  },
  {
    name: "Beranda",
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
    name: "Tentang",
    path: "#",
    children: [
      {
        name: "Tentang Kami",
        path: "/dashboard/about/about-us"
      },{
        name: "Nilai Bisnis",
        path: "/dashboard/about/business-values"
      },{
        name: "Nilai kerja",
        path: "/dashboard/about/work-values"
      },{
        name: "Pencapaian",
        path: "/dashboard/about/achievements"
      }
    ]
  },{
    name: "Klien",
    path: "/dashboard/clients",
  },{
    name: "Layanan",
    path: "/dashboard/services",
  },{
    name: "Portfolio",
    path: "/dashboard/portfolioes",
  },{
    name: "Blog",
    path: "#",
    children: [
      {
        name: "Kategori",
        path: "/dashboard/blog/categories"
      },{
        name: "Artikel",
        path: "/dashboard/blog/articles"
      }
    ]
  },{
    name: "Kontak",
    path: "#",
    children: [
      {
        name: "Kontak",
        path: "/dashboard/contact/contacts"
      },{
        name: "Media Sosial",
        path: "/dashboard/contact/social-media"
      }
    ]
  }
]