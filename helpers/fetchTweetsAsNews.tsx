import fetch, { Headers } from 'cross-fetch';

import News from '../types/News';

type ApiUser = {
  id: string;
  name: string;
  username: string;
};

type ApiTweet = {
  author_id: string;
  id: string;
  text: string;
};

type ApiRes = {
  data: ApiTweet[];
  includes: {
    users: ApiUser[];
  };
  meta: {
    newest_id: string;
    oldest_id: string;
    result_count: number;
    next_token: string;
  };
};

const fetchTweetsAsNews = async (query: string): Promise<News[]> => {
  try {
    const headers = new Headers({
      Authorization: `Bearer ${process.env.TWITTER_BREARER}`,
    });
    const res = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=${query}&expansions=author_id&max_results=20`, {
      method: 'GET',
      headers,
    });

    if (!res.ok) {
      console.error(await res.text());
      return [];
    }

    const apiRes: ApiRes = await res.json();
    const authors: Record<string, ApiUser> = apiRes.includes.users.reduce((acc, author) => ({ ...acc, [author.id]: author}), {});

    return apiRes.data.map((apiTweet) => ({
      title: apiTweet.text,
      subtitle: `@${authors[apiTweet.author_id].username}`,
      blank: true,
      target: `https://twitter.com/${authors[apiTweet.author_id].username}/status/${apiTweet.id}`,
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
};

export default fetchTweetsAsNews;
