interface TechnologiesProps {
  technologies: string[];
}

export const Technologies = ({ technologies }: TechnologiesProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {technologies.map((technology) => (
        <span key={technology} className="badge badge-xs badge-outline">{technology}</span>
      ))}
    </div>
  );
};