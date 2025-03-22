import Detail from "@/ui/about/detail"
import Images from "@/ui/about/images"
import Clients from "@/ui/home/clients"
import Header from "@/ui/home/header"
import Value from "@/ui/home/value"

const About = () => {
  return (
    <>
      <Header code="about_us" />
      <div className="w-full flex flex-wrap justify-between p-5 md:p-20">
        <Images />
        <Detail />
        <Value />
        <Clients />
      </div>
    </>
  )
}

export default About