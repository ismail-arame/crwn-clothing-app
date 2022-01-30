import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyC2xLud-2uUAqobZRU8rIhAr4watwpieaM",
  authDomain: "crwn-db-1cdee.firebaseapp.com",
  projectId: "crwn-db-1cdee",
  storageBucket: "crwn-db-1cdee.appspot.com",
  messagingSenderId: "1064719707064",
  appId: "1:1064719707064:web:d2653cda7123bbf882bd4d",
  measurementId: "G-0WBQRZ7YKB",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user ", error.message);
    }
  }
  //we might need THIS DocumentReference to do other CRUD operations
  return userRef;
};

//encodeURI() is a function that gets a string and returns a string that a URL can understand
//convert it to an object
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      title,
      items,
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
    };
  });

  // console.log(transformedCollection);
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

//Moving our Shop Data to firebase :)
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  //Get a New Write Batch
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    //firebase create a new empty document with a unique generated ID
    const newDocRef = collectionRef.doc();

    batch.set(newDocRef, obj);
  });

  //Commit The Batch (Fire Off our batch call => the whole request chain once)
  //return a promise (if succeeds it resolves a null value)
  return await batch.commit();
};

//for persistence
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unSubscribeFromAuth = auth.onAuthStateChanged((userAuth) => {
      //the moment we get the resolved value of the user we unsubscribe
      //obsrvables + observer pattern :)
      unSubscribeFromAuth();
      resolve(userAuth);
    }, reject);
  });
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInwithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
