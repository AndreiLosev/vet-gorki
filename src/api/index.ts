
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
  static addDocToCollection = async <T>(collection: string, data: T) => {
    const result = await db.collection(collection).add(data)
    return result.id
  }

  static getAll = async <T>(collection: string) => {
    const result = await db.collection(collection).get()
    const returnData = {} as {[index: string]: T}
    result.forEach(item => {
      returnData[item.id] = item.data() as T
    })
    return returnData
  }

  static findDocFromID = async <T>(collection: string, id: string) => {
    const result = await db.collection(collection).doc(id).get()
    if (result.data()) return {[id]: result.data() as T}
    else throw new Error('в базе не наден элемент с таким id (Api.findDocFromID)')
  }

  static deleteDoc = async (collection: string, id: string) => await db.collection(collection).doc(id).delete()

  static updateDoc = async <T>(collection: string, id: string, data: T) =>
    await db.collection(collection).doc(id).set(data)

  static findDocsFrom = async <T>(collection: string, search: string, fild: string) => {
    const result = await db.collection(collection).orderBy(fild).startAt(search).endAt(search+"\uf8ff").get()
    const returnData = {} as {[x: string]: T}
    result.forEach(item => {
      if (item.data()) {
        const x = item.data() as T
        returnData[item.id] = x
      } else {
        throw new Error('Api.findDocsFrom')
      }
    })
    return returnData
  }
    
}