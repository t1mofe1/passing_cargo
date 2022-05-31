import * as WebBrowser from 'expo-web-browser';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAZLfKZJCMiFK0osVMQDagw2rK6z_dUB2s',
	authDomain: 'passing-cargo.firebaseapp.com',
	projectId: 'passing-cargo',
	storageBucket: 'passing-cargo.appspot.com',
	messagingSenderId: '165583901398',
	appId: '1:165583901398:web:cb7c5f065e2afa45f62f77',
	measurementId: 'G-GLZYB77T3M',
};

initializeApp(firebaseConfig);

const auth = getAuth();

onAuthStateChanged(auth, user => {
	if (!user) return;

	console.log(`User ${user.uid} is signed in.`);
});
