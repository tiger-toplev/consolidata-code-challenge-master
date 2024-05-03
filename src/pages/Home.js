import React, { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './Home.css';
import * as api from '../service/api';
import PageForm from '../components/PageForm';

function Home() {
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fn = async () => {
      setLoading(true);

      // 1. Use firebase functions
      const resp = await api.getFormStructure();
      setFormData(resp.data);

      // 2. Direct Firestore operation
      // const { docs } = await firestore
      //   .collection("form_structure")
      //   .get();
      // const form_structures = await Promise.all(
      //   docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      // );
      // setFormData(form_structures[0])

      setLoading(false);
      if (resp.data) {
        NotificationManager.success('Form Data Load Success');
      } else {
        NotificationManager.error('Form Data Load Failed');
      }
    };
    fn();
  }, []);

  return formData && formData.fields && !isLoading ? (
    <PageForm formData={formData}></PageForm>
  ) : (
    <div className="loading">Loading...</div>
  );
}

export default Home;
