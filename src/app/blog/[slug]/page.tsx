import Header from "@/ui/home/header"
import DetailPage from "@/ui/blog/detailPage"
import { use } from "react"
import CTA1 from "@/ui/home/cta1"

const BlogDetail = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params)

  return (
    <>
      <Header code="blog_detail" />
      <DetailPage slug={slug} />
      <CTA1 />
    </>
  )
}

export default BlogDetail