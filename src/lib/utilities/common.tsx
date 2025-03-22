import { FaBars, FaBriefcase, FaBuilding, FaCity, FaEnvelope, FaFacebook, FaGlobe, FaHouse, FaInstagram, FaLinkedin, FaNewspaper, FaPhoneVolume, FaTableColumns, FaTiktok, FaUsers, FaWhatsapp, FaYoutube } from "react-icons/fa6";

export function Capitalize(word: string): string {
  return word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase();
}

export function CapitalizeToKebabCase(word: string): string {
  return word?.toLocaleLowerCase().replaceAll('!', '').replaceAll('&', '').replaceAll(' ', '-')
}

export function RemoveKebabCase(word: string): string {
  return word?.replaceAll('-', ' ')
}

export function CommaToCommaSpace(word: string): string {
  return word?.replaceAll(',', ', ')
}

export function CommaSpaceToComma(word: string): string {
  return word?.replaceAll(', ', ',')
}

export const StringToDate = (datestring: string) => {
  if (datestring) {
    return new Date(datestring).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    })
  }
}

export const SelectMenuIcon = (name: string) => {
  switch (name) {
    case "Penawaran":
      return <FaEnvelope />;
    case "Dashboard":
      return <FaTableColumns />;
    case "Beranda":
      return <FaHouse />;
    case "Tentang":
      return <FaBuilding />;
    case "Klien":
      return <FaUsers />;
    case "Layanan":
      return <FaBriefcase />;
    case "Portfolio":
      return <FaCity />;
    case "Blog":
      return <FaNewspaper />;
    case "Kontak":
      return <FaPhoneVolume />;
    default:
      return <FaBars />;
  }
}

export const SelectSocialMediaIcon = (name: string) => {
  switch (name) {
    case "facebook":
      return <FaFacebook />;
    case "instagram":
      return <FaInstagram />;
    case "linkedin":
      return <FaLinkedin />;
    case "youtube":
      return <FaYoutube />;
    case "whatsapp":
      return <FaWhatsapp />;
    case "tiktok":
      return <FaTiktok />;
    case "tik tok":
      return <FaTiktok />;
    default:
      return <FaGlobe />;
  }
}

export const HandleScrollToElement = (targetId: string) => {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 75,
      behavior: 'smooth',
    })
  }
}

export const GenerateIdFromText = (text: string) => {
  return text.toLowerCase().replaceAll(" ","-")
}