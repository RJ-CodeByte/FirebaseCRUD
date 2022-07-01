import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";



const firebaseConfig = {
    apiKey: "AIzaSyAivFQzAMNVWed_F32mMInY43OctflkIwU",
    authDomain: "fir-demo-99d40.firebaseapp.com",
    dataBaseUrl: "https://fir-demo-99d40-default-rtdb.firebaseio.com/",
    projectId: "fir-demo-99d40",
    storageBucket: "fir-demo-99d40.appspot.com",
    messageSenderId: "321735861258",
    appId: "1:321735861258:android:a896c87aaf1fb5c5702bf3"
}


class FireConfig {
    constructor(callback) {
        this.init(callback)
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }

        auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user)
            } else {
                auth().signInAnonymously().catch(err => { callback(error) })
            }
        })
    }

    getLists(callback) {
        let ref = this.ref.orderByValue('name')

        this.unsubscribe = ref.on('value', dataSnapshot => {
            lists = [];
            dataSnapshot.forEach(doc => {
                lists.push({ id: doc.ref.key, ...doc.val() })
            })
            callback(lists)
        })
    }

    addList(list) {
        let ref = this.ref
        ref.push(list);
    }

    updateList(list) {
        let ref = this.ref
        console.log('list.id', list.id)
        ref.child(list.id).update(list);
    }

    get ref() {
        return database().ref('users/' + this.userId).child('lists')
    }
    get userId() {
        return auth().currentUser.uid;
    }

    detach() {
        this.unsubscribe;
    }
}


export default FireConfig