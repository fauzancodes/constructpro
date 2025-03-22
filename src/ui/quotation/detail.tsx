"use client"

import { motion } from "framer-motion";
import Image from "next/image"
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa6"
import { SlideUpVariant } from "@/ui/animation/animation";
import { useEffect, useState, useRef } from "react";
import { GetAllAboutUs } from "@/lib/repository/about/aboutUs";
import { CreateQuotation } from "@/lib/repository/quotation";
// import { useRouter } from "next/navigation";
import { Quotation } from "@/types/common.types";
import { QuotationFields } from "@/types/fields";
import ReCAPTCHA from "react-google-recaptcha";

const Detail = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingForm, setIsLoadingForm] = useState(false)
  const [showSuccessSubmit, setShowSuccessSubmit] = useState(false)
  const [showReCAPTCHAFailed, setShowReCAPTCHAFailed] = useState(false)
  const [about, setAbout] = useState<any[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>(
    Object.fromEntries(Object.entries(QuotationFields).map(([key, config]) => [key, config.value]))
  );
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const aboutData = await GetAllAboutUs("", 0, 0, "", "asc");
        if (aboutData) {
          setAbout(aboutData.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreate = async (formData: Quotation) => {
    try {
      const result = await CreateQuotation(formData);
  
      if (result?.success) {
        setShowSuccessSubmit(true)
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setShowSuccessSubmit(false);
    setShowReCAPTCHAFailed(false);
    setIsLoadingForm(true);

    if (!captchaToken) {
      setShowReCAPTCHAFailed(true);
      setIsLoadingForm(false);
      return;
    }
    
    handleCreate(formData);

    if (formRef.current) {
      formRef.current.reset();
    }

    setFormData(
      Object.fromEntries(Object.entries(QuotationFields).map(([key, config]) => [key, config.value]))
    );
    setIsLoadingForm(false);
    setCaptchaToken(null);
    recaptchaRef.current?.reset();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setShowSuccessSubmit(false)
    setShowReCAPTCHAFailed(false)

    const { name, type, value } = e.target as HTMLInputElement;
    
    if (type === "date") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value ? new Date(value) : "",
      }));
    } else if (value === "true" || value == "false") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value === "true",
      }));
    } else {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };
  
  return (
    <div className="w-full flex flex-wrap p-5 md:p-20">
      <motion.form 
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full md:w-7/12 border-10 md:border-30 border-neutral p-5 md:p-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0}
      >
        <h2 className="fotn-semibold text-4xl mb-5">PENAWARAN ANDA</h2>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg">Nama Lengkap:</legend>
          <label className="input validator w-full">
            <FaUser />
            <input onChange={handleChange} type="input" name="fullname" value={formData.fullname ?? ""} placeholder="Budi Budiman" required/>
          </label>
          <div className="validator-hint hidden">Mohon masukan nama lengkap</div>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg">Alamat Email:</legend>
          <label className="input validator w-full">
            <FaEnvelope />
            <input onChange={handleChange} type="email" name="email" value={formData.email ?? ""} placeholder="youremail@mail.com" required/>
          </label>
          <div className="validator-hint hidden">Mohon masukan alamat email yang valid</div>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg">Nomor Handphone:</legend>
          <label className="input validator w-full">
            <FaPhone />
            <input onChange={handleChange} type="tel" name="phone" value={formData.phone ?? ""} className="tabular-nums" required placeholder="08229966775544" pattern="[0-9]*" minLength={10} maxLength={14} title="Mohon masukan nomor handphone yang valid"/>
          </label>
          <p className="validator-hint hidden">Mohon masukan nomor handphone yang valid</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg">Judul:</legend>
          <label className="input validator w-full">
            <input onChange={handleChange} type="input" name="title" value={formData.title ?? ""} placeholder="Konsultasi Pembangunan Perumahan" required/>
          </label>
          <div className="validator-hint hidden">Mohon masukan judul</div>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg">Deskripsi:</legend>
          <textarea onChange={handleChange} name="description" value={formData.description ?? ""} className="textarea h-80 w-full" placeholder="Saya ingin membuat perumahan mewah dengan kualitas terbaik!"></textarea>
        </fieldset>
        <div className="w-full flex justify-center mt-5">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={setCaptchaToken}
          />
        </div>
        <motion.button 
          type="submit" 
          className="btn btn-primary w-full mt-5 btn-lg"
          whileHover={{ scale: 1.1 }}
        >
          {isLoadingForm ? "MENGIRIM PENAWARAN....." : "AJUKAN PENAWARAN ANDA"}
        </motion.button>
        {showSuccessSubmit && <p className="w-full text-center mt-5 font-medium text-success-content bg-success p-3">Penawaran telah berhasil dikirim!</p>}
        {showReCAPTCHAFailed && <p className="w-full text-center mt-5 font-medium text-error-content bg-error p-3">Harap verifikasi reCAPTCHA!</p>}
      </motion.form>
      <motion.div 
        className="w-full md:w-5/12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={SlideUpVariant}
        custom={0.2}
      >
        {isLoading ? (
          <div className="h-full bg-base-300 skeleton"></div>
        ) : about.length === 0 ? (
          <div className="h-full bg-base-300"></div>
        ) : (
          <Image src={about[0].image1} alt="Ajukan Penawaran" width={1000} height={1000} className="h-full object-cover" />
        )}
      </motion.div>
    </div>
  )
}

export default Detail