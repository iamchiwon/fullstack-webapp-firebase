/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getFirestore } from "firebase-admin/firestore";

export const databaseCreateItem = async <T>(ref: string, item: T) => {
  const db = await getFirestore();
  const collection = db.collection(ref);
  const doc = await collection.add(item as any);
  return doc.id;
};

export const databaseGetList = async (ref: string) => {
  const db = await getFirestore();
  const collection = db.collection(ref);
  const snapshot = await collection.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const databaseGetItem = async (ref: string, id: string) => {
  const db = await getFirestore();
  const collection = db.collection(ref);
  const doc = await collection.doc(id).get();
  return {
    id: doc.id,
    ...doc.data(),
  };
};

export const databaseUpdateItem = async <T>(
  ref: string,
  id: string,
  item: T,
  merge: boolean = true
) => {
  const db = await getFirestore();
  const collection = db.collection(ref);
  await collection.doc(id).update(item as any, { merge });
};

export const databaseDeleteItem = async (ref: string, id: string) => {
  const db = await getFirestore();
  const collection = db.collection(ref);
  await collection.doc(id).delete();
};
