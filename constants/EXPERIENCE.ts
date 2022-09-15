import Position from '../types/Position';

const EXPERIENCE: Position[] = [
  {
    companyName: 'X-Team',
    title: 'Software Developer',
    description: 'I work with the highest standards, technologies, and techniques to create the best experience for the company\'s clients.',
    from: new Date(2021, 9),
    projects: [
      {
        title: 'XTO (X-Team Internal Projects)',
        technologies: ['Hapi.js', 'React', 'AWS', 'AWS Lambda', 'Nodejs', 'Postgres', 'Docker'],
        from: new Date(2022, 7),
      },
      {
        title: 'Bramble',
        technologies: ['Lit Element', 'AWS', 'WebRTC', 'Mediasoup', 'Nodejs', 'Firebase', 'EC2', 'PixiJs'],
        from: new Date(2021, 9),
        to: new Date(2022, 6),
      },
    ],
  },
  {
    companyName: 'Encora (Nearsoft)',
    title: 'Software developer',
    projects: [
      {
        title: 'ConsumerTrack Inc',
        technologies: ['php', 'Python', 'reactjs', 'Nextjs', 'AWS Lambda', 'AWS Kinesis', 'aws sqs', 'AWS Dynamo', 'AWS CloudWatch', 'AWS Step Functions', 'AWS CloudFront'],
        description: 'I focused on the development and maintenance of efficient algorithms on the cloud aimed at bringing customers to credit score services like Transunion and Experian.',
      },
    ],
    from: new Date(2020, 2),
    to: new Date(2021, 9),
  },
  {
    companyName: 'The Ksquare Group',
    title: 'Software Developer',
    projects: [
      {
        title: 'Boy Scouts of America',
        description: 'I developed and maintained the API for all BSA mobile and web applications.',
        technologies: ['Javascript', 'NodeJS', 'HapiJs', 'SQL Server', 'Rest', 'AWS', 'jenkins', 'Verdaccio']
      }
    ],
    from: new Date(2019, 6),
    to: new Date(2020, 2),
  },
  {
    companyName: 'Freelance',
    title: 'Lead Developer',
    projects: [

      {
        title: 'Refuse Bike Mobile App',
        description: 'Alongside a collaborator we designed and developed the whole mobile app from scratch, I lead us on this project establishing the technologies and techniques for its development.',
        technologies: ['Javascript', 'React Native', 'Docker', 'Kubernetes', 'GCP cloud run', 'Mongodb Atlas'],
        from: new Date(2020, 2),
        to: new Date(2020, 8),
      },
      {
        title: 'Refuse Bike WEB APP',
        description: 'I led the development of the API and Web Application from beginning to end. I chose the technologies and techniques to be used. I had direct contact with the client to collect requirements for the project.',
        technologies: ['Javascript', 'Angular 7', 'Loopback 3', 'Typescript', 'Rest', 'Docker', 'Kubernetes', 'GCP cloud run', 'Mongodb Atlas'],
        from: new Date(2019, 4),
        to: new Date(2019, 7),
      },
      {
        title: 'Radical Nutrition Mobile App',
        description: 'I led the development of the API and Web/Mobiles Applications from beginning to end, I chose the technologies and techniques to be used.',
        technologies: ['Javascript', 'Angular 5', 'Codova', 'Loopback 3', 'Typescript', 'Rest', 'Docker', 'Kubernetes', 'GCP cloud run', 'Mongodb Atlas'],
        from: new Date(2018, 4),
        to: new Date(2018, 5),
      },
      {
        title: 'Refast',
        technologies: ['Javascript', 'Angular 7', 'Loopback 3', 'Typescript', 'Rest', 'Docker', 'Kubernetes', 'GCP cloud run', 'Mongodb Atlas'],
        description: 'I led the development of the API and Web Application from beginning to end, I chose the technologies and techniques to be used. I had direct contact with the client to collect requirements for the project.',
        from: new Date(2018, 1),
        to: new Date(2018, 3),
      },
      {
        title: 'Sphere (Sole developer)',
        technologies: ['Javascript', 'NodeJs', 'Loopback 2', 'AngularJs', 'Mongodb', 'Rest AWS', 'Elastic'],
        description: 'I was the sole developer of the API and Web Application from beginning to end, I chose the technologies and techniques to be used. I had direct contact with the company\'s employees to collect requirements.',
        from: new Date(2016, 6),
        to: new Date(2017, 11),
      },
    ],
  },
  {
    companyName: 'Lüphole (Beluga solutions)',
    title: 'Software Developer',
    projects: [
      {
        title: 'PlantBook',
        technologies: ['Javascript', 'NodeJs', 'Loopback 3', 'Angular 4', 'Typescript', 'Mongodb', 'Electron', 'iOS', 'Windows', 'Rest', 'AWS', 'Elastic'],
        description: 'I contributed to the development of the API and Web/Desktop/Mobile Applications from beginning to end.',
        from: new Date(2017, 2),
        to: new Date(2017, 10),
      },
      {
        title: 'ICOE Zapopan',
        technologies: ['Javascript', 'NodeJs', 'Loopback 2', 'AngularJs', 'Mongodb', 'Rest', 'AWS', 'Elastic'],
        description: 'I contributed to the development and maintenance of the API and Web Application from beginning to end.',
        from: new Date(2016, 10),
        to: new Date(2017, 3),
      },
      {
        title: 'Reto México',
        technologies: ['Javascript', 'NodeJs', 'Loopback 2', 'AngularJs', 'Mongodb', 'Rest', 'AWS', 'Elastic'],
        description: 'I contributed to the development and maintenance of the API and Web Application from beginning to end.',
        from: new Date(2016, 1),
        to: new Date(2016, 9),
      },
      {
        title: 'Reto Zapopan',
        technologies: ['Javascript', 'NodeJs', 'Loopback 2', 'AngularJs', 'Mongodb', 'Rest', 'AWS', 'Elastic'],
        description: 'I contributed to the development and maintenance of the API and Web Application from beginning to end.',
        from: new Date(2016, 0),
        to: new Date(2016, 9),
      },
    ],
    from: new Date(2016, 0),
    to: new Date(2017, 11),
  },
  {
    companyName: 'Continente Ferretero',
    title: 'e-commerce Platform Support',
    description: 'I contributed to the integration of the company\'s e-commerce site with its internal ERP to keep it updated and did maintenance to some frontend features.',
    technologies: ['Javascript', 'JQuery', '3dCart', 'Internal ERP'],
    from: new Date(2014, 11),
    to: new Date(2015,11)
  },
];

export default EXPERIENCE;
