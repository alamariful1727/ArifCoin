import * as firebase from "firebase/app";
import "firebase/messaging";

// firebase initialization
const initializedFirebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyAqPOstYGr2y0T58hW5K5k31l_M_IxXUe4",
	authDomain: "push-notification-js.firebaseapp.com",
	databaseURL: "https://push-notification-js.firebaseio.com",
	projectId: "push-notification-js",
	storageBucket: "push-notification-js.appspot.com",
	messagingSenderId: "198403718492",
	appId: "1:198403718492:web:3ee5bd6258a5a1b5"
});
const messaging = initializedFirebaseApp.messaging();

// use server validApikey found in projectsetting=> cloud messaging => web push
messaging.usePublicVapidKey(
	"BJCaFdZQGXKfOkFXIHIvFsjmmnCGP3lE-xbnpjOf1pXYQH4KQ3Yb2Ghndw5S2BJynUkCJtcmDHgOCsU2BL-ydWc"
);

export { messaging };
