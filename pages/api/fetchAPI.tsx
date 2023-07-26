import React from 'react';
import { MongoClient } from 'mongodb';

export async function fetchAPI() {
  const client = await MongoClient.connect(
    'mongodb+srv://lalodosanjos:hI1LgiVbQf02ky0j@cluster0.zbgexjr.mongodb.net/meetups?retryWrites=true&w=majority'
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  return { meetupsCollection, client };
}
