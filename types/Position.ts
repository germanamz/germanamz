type Position = {
  title: string;
  companyName: string;
  technologies?: string[];
  description?: string;
  bulletPoints?: string[];
  isCurrent?: boolean;
  projects?: Omit<Position, 'projects' | 'companyName'>[];
  from?: Date;
  to?: Date;
};

export default Position;
