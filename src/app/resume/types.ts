export type Education = {
  institution: string;
  degree: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
};

export type Experience = {
  company: string;
  client?: string;
  description?: string;
  url?: string;
  title: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  bullets?: string[];
  technologies: string[];
};

export type Resume = {
  name: string;
  description: string;
  email: string;
  country: string;
  website: string;
  github: string;
  linkedin: string;
  experience: Experience[];
  education: Education[];
};
