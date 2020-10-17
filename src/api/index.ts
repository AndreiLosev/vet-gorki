
import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyCJ_3483R_mNTNpTiZVNI394Cnlpnipmlw",
  authDomain: "todolist-60c4c.firebaseapp.com",
  databaseURL: "https://todolist-60c4c.firebaseio.com",
  projectId: "todolist-60c4c",
  storageBucket: "todolist-60c4c.appspot.com",
  messagingSenderId: "466202960280",
  appId: "1:466202960280:web:33f00277fb5f3f14728bed",
  measurementId: "G-Y6BFWQLBKE"
});

const db = firebase.firestore();

export class Api {
  static addDocToCollection = async (collection: string, data: object) => {
    const result = await db.collection(collection).add(data)
    return result.id
  }

  static findDocFrom = async <T>(collection: string, key: string, value: string) => {
    const result = await db.collection(collection).where(key, '==', value).get()
    const returData: {[index: string]: T} = {}
    result.forEach(item => {returData[item.id] = item.data() as T})
    return returData
  }

  static deleteDoc = async (collection: string, id: string) => await db.collection(collection).doc(id).delete()
}