
import firebase from 'firebase/app'
import 'firebase/firestore'
import {IinitialClientForm} from '../components/newClientForm/newClientForm'

firebase.initializeApp({
  apiKey: 'AIzaSyCJ_3483R_mNTNpTiZVNI394Cnlpnipmlw',
  authDomain: 'todolist-60c4c.firebaseapp.com',
  projectId: 'todolist-60c4c'
});

const db = firebase.firestore();

export class Api {
  static addClient = (data: IinitialClientForm) => {
    db.collection('clients').add(data)
  }
  
  static getClientFromSurname = (surname: string) => {
    db.collection('clients').where('surname', '==', surname).get()
  }
}