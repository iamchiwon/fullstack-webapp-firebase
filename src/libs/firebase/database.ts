/* eslint-disable @typescript-eslint/no-explicit-any */

import { getFirestore } from "firebase-admin/firestore";
import { ensureFirebaseAdminInitialized } from "./initializeAdmin";

const getDB = async () => {
  await ensureFirebaseAdminInitialized();
  return getFirestore();
};

export const databaseCreateItem = async <T>(ref: string, item: T) => {
  const db = await getDB();
  const collection = db.collection(ref);
  const doc = await collection.add(item as any);
  return doc.id;
};

export const databaseCreateItemWithId = async <T>(
  ref: string,
  id: string,
  item: T
) => {
  const db = await getDB();
  const collection = db.collection(ref);
  await collection.doc(id).set(item as any);
  return id;
};

export const databaseGetList = async <T>(ref: string) => {
  const db = await getDB();
  const collection = db.collection(ref);
  const snapshot = await collection.get();
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as T)
  ) as T[];
};

export const databaseGetItem = async <T>(ref: string, id: string) => {
  const db = await getDB();
  const collection = db.collection(ref);
  const doc = await collection.doc(id).get();
  return {
    id: doc.id,
    ...doc.data(),
  } as T;
};

export const databaseUpdateItem = async <T>(
  ref: string,
  id: string,
  item: T,
  merge: boolean = true
) => {
  const db = await getDB();
  const collection = db.collection(ref);
  await collection.doc(id).update(item as any, { merge });
};

export const databaseDeleteItem = async (ref: string, id: string) => {
  const db = await getDB();
  const collection = db.collection(ref);
  await collection.doc(id).delete();
};
