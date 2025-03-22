export interface User {
  id: string;
  email: string;
  password: string;
}

export interface ImageSlider {
  id: string;
  title?: string;
  image?: string;
  order?: number;
}

export interface BusinessValue {
  id: string;
  title?: string;
  description?: string;
  code?: string;
  order?: number;
}

export interface WorkValue {
  id: string;
  description?: string;
  subtitle1?: string;
  subdescription1?: string;
  subtitle2?: string;
  subdescription2?: string;
  callToAction1?: string;
  callToAction2?: string;
  image?: string;
}

export interface Achievement {
  id: string;
  title?: string;
  total?: number;
  code?: string;
}

export interface CallToAction {
  id: string;
  title?: string;
  description?: string;
  callToAction1?: string;
  callToAction2?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
}

export interface FAQ {
  id: string;
  question?: string;
  answer?: string;
  order?: number;
}

export interface Client {
  id: string;
  name?: string;
  image?: string;
  order?: number;
}

export interface SectionHeader {
  id: string;
  title?: string;
  code?: string;
}

export interface PageHeader {
  id: string;
  title?: string;
  code?: string;
  image?: string;
}

export interface Contact {
  id: string;
  title?: string;
  description?: string;
  image?: string;
  link?: string;
  code?: string;
}

export interface AboutUs {
  id: string;
  title?: string;
  description?: string;
  callToAction?: string;
  image1?: string;
  image2?: string;
  image3?: string;
}

export interface Service {
  id: string;
  title?: string;
  description?: string;
  image?: string;
  order?: number;
  status?: boolean;
  portfolioes?: Portfolio[];
}

export interface Portfolio {
  id: string;
  title?: string;
  description?: string;
  client?: string;
  start?: Date;
  end?: Date;
  address?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  image7?: string;
  image8?: string;
  image9?: string;
  image10?: string;
  status?: boolean;
  serviceId?: string;
  service?: Service;
  slug?: string;
}

export interface BlogCategory {
  id: string;
  title?: string;
  order?: number;
  blogs?: Blog[];
  status?: boolean;
}

export interface Blog {
  id: string;
  title?: string;
  description?: string;
  author?: string;
  date?: Date;
  body?: string;
  tags?: string;
  categoryId?: string;
  status?: boolean;
  image?: string;
  slug?: string;
}

export interface SocialMedia {
  id: string;
  title?: string;
  link?: string;
}

export interface Quotation {
  id?: string;
  title?: string;
  description?: string;
  email?: string;
  fullname?: string;
  phone?: string;
}