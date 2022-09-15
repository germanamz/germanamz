type Position = {
  title: string;
  companyName: string;
  technologies?: string[];
  description?: string;
  projects?: Omit<Position, 'projects' | 'companyName'>[];
  from?: Date;
  to?: Date;
};

export default Position;
