import { Fragment } from 'react';
import Head from 'next/head';

import MeetupList from '../components/meetups/MeetupList';
import { fetchAPI } from './api/fetchAPI';

export interface Meetups {
  [key: string]: Meetup[];
}

export interface Meetup {
  id?: string;
  title?: string;
  image?: string;
  address?: string;
  description?: string;
}

export default function HomePage(props: Meetups) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

export async function getStaticProps() {
  // fetch data from an API
  const { meetupsCollection, client } = await fetchAPI();

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
