import { useContext } from 'react';
import FirestoreContext from '../context/firestore';

function useFirestore() {
  return useContext(FirestoreContext);
}

export default useFirestore;
