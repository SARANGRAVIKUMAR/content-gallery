/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBsfuPsjJ2RHuuEDhjATl1lLz5JGro4YGE',
  authDomain: 'vms-dev-197e4.firebaseapp.com',
  projectId: 'vms-dev-197e4',
  storageBucket: 'vms-dev-197e4.appspot.com',
  messagingSenderId: '110000970550',
  appId: '1:110000970550:web:e301c88077d8058f26f197',
  measurementId: 'G-BBVSQ0SMV2',
});

// Production

// firebase.initializeApp({
//   apiKey: 'AIzaSyDLaYo61v4dgIzYgcrot-zB2OX-PIEPODI',
//   authDomain: 'vms-prod-f4a52.firebaseapp.com',
//   projectId: 'vms-prod-f4a52',
//   storageBucket: 'vms-prod-f4a52.appspot.com',
//   messagingSenderId: '1017083362725',
//   appId: '1:1017083362725:web:c121f03f92ace3a67f3c4c',
//   measurementId: 'G-NRH2L8JPBW',
// });

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: './logo.png',
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
