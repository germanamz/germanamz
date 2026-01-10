import Link from 'next/link';
import { Technologies } from './_components/Technologies';
import { resume } from './constants';
import { DownloadButton } from './_components/DownloadButton';

const ResumePage = () => {
  const technologies = Array.from(new Set(resume.experience.flatMap((experience) => experience.technologies)));

  return (
    <div className="prose">
      <section className="flex justify-center">
        <DownloadButton />
      </section>
      <section className="flex flex-row gap-4">
        <div>
          <h2>{resume.name}</h2>
          <p className="text-muted-foreground text-lg -mt-4 mb-4">@{resume.country}</p>
          <p>{resume.description}</p>
          <p className="space-y-1">
            <span className="inline-block w-20">Email:</span>
            <Link href={`mailto:${resume.email}`} target="_blank">{resume.email}</Link>
            <br />
            <span className="inline-block w-20">Website:</span>
            <Link href={resume.website} target="_blank">{resume.website}</Link>
            <br />
            <span className="inline-block w-20">GitHub:</span>
            <Link href={resume.github} target="_blank">{resume.github}</Link>
            <br />
            <span className="inline-block w-20">LinkedIn:</span>
            <Link href={resume.linkedin} target="_blank">{resume.linkedin}</Link>
          </p>
        </div>
      </section>

      <section>
        <h2>Education</h2>
        <div className="flex flex-col gap-4">
          {resume.education.map((education) => (
            <div className="border-b border-gray-200 pb-4" key={education.degree}>
              <h3>{education.institution}</h3>
              <p className="font-semibold text-muted-foreground -mt-4">{education.degree}</p>
              <p className="text-sm">{education.startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {education.endDate?.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) || 'Present'}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Technologies</h2>
        <Technologies technologies={technologies} />
      </section>

      <section>
        <h2>Experience</h2>
        <div className="flex flex-col gap-4">
          {resume.experience.map((experience) => (
            <div className="border-b border-gray-200 pb-4" key={experience.company}>
              <h3>{experience.company}</h3>
              <p className="font-semibold text-muted-foreground -mt-4">{experience.title}</p>
              {experience.client && (
                <p className="text-sm text-muted-foreground -mt-4">
                  Contract with {experience.client}
                </p>
              )}
              <p className="text-sm">
                {experience.startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {experience.endDate?.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) || 'Present'}
              </p>
              <Technologies technologies={experience.technologies} />
              <ul>
                {experience.bullets?.map((bullet) => (
                  <li key={`${experience.company}-${bullet}`}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="flex justify-center mt-4">
        <DownloadButton />
      </section>
    </div>
  );
};

export default ResumePage;