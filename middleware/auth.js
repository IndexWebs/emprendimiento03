import { firebase } from '@/plugins/firebase';

export default function ({ redirect }) {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // Redirige al login si no hay usuario autenticado
        redirect('/login');
      }
      resolve();
    });
  });
}