import fetch from 'cross-fetch';

import News from '../types/News';

export type YcomStory = {
  id: number;
  by: string;
  descendants: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: 'story';
  url: string;
};

const getStory = async (id: number): Promise<YcomStory> => {
  const req = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  return req.json();
};

const fetchYcomBestStoriesAsNews = async (numOfStories: number = 20): Promise<News[]> => {
  try {
    const storiesReq = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');

    if (!storiesReq.ok) {
      console.error(await storiesReq.text());
      return [];
    }

    const storiesIds = await storiesReq.json();
    const storyPromises = [];

    for (let idIndex = 0; idIndex < numOfStories; idIndex += 1) {
      const storyId = storiesIds[idIndex];
      storyPromises.push(getStory(storyId));
    }

    const stories: YcomStory[] = await Promise.all(storyPromises);

    return stories.map((story) => {
      const news: News = {
        title: story.title,
        subtitle: story.by,
        blank: true,
      };
      if (story.url) {
        news.target = story.url;
      }
      return news;
    });
  } catch (e) {
    console.error(e);
    return [];
  }
};

export default fetchYcomBestStoriesAsNews;
