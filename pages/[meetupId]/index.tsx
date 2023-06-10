import { ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';
import { fetchAPI } from '../api/fetchAPI';
import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Meetup } from '..';

interface MeetupDetailsProps {
  meetupData: Meetup;
}

export default function MeetupDetails(props: MeetupDetailsProps) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const { meetupsCollection, client } = await fetchAPI();

  const meetups = await meetupsCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  // fetch data for a single meetup

  const { meetupId } = context.params as ParsedUrlQuery;

  const { meetupsCollection, client } = await fetchAPI();

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId as string),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup?._id.toString(),
        title: selectedMeetup?.title,
        address: selectedMeetup?.address,
        image: selectedMeetup?.image,
        description: selectedMeetup?.description,
      },
    },
  };
}
