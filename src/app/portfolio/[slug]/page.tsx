import CTA1 from "@/ui/home/cta1"
import Header from "@/ui/home/header"
import DetailPage from "@/ui/portfolio/detailPage"
import { use } from "react"

const PortfolioDetail = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params)

  return (
    <>
      <Header code="portfolio_detail" />
      <DetailPage slug={slug} />
      <CTA1 />
    </>
  )
}

export default PortfolioDetail