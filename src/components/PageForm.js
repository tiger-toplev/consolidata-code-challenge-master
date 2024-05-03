import React, { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './PageForm.css';
import * as api from '../service/api';
//import useFirestore from '../../hooks/useFirestore';

function PageForm({ formData }) {
  //const firestore = useFirestore();
  const [data, setData] = useState({});
  const [dataError, setDataError] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let result = {};
    formData.fields.map(({ name }) => {
      result = { ...result, [name]: '' };
      return result;
    });
    setData(result);
    setDataError(result);
  }, [formData]);

  // Checks form field input validation
  const validateInput = (value, name) => {
    if (!value) {
      setDataError((dataError) => ({ ...dataError, [name]: 'This field should not be empty.' }));
      return false;
    } else {
      setDataError((dataError) => ({ ...dataError, [name]: '' }));
      return true;
    }
  };

  // Handles form field change
  const handleChange = (e, name) => {
    validateInput(e.target.value, name);
    setData({ ...data, [name]: e.target.value });
  };

  // Handles Form Submit
  const handleFormSubmit = async () => {
    if (isLoading) return;
    setLoading(true);

    const result = Object.keys(data).map((key) => {
      return validateInput(data[key], key);
    });

    const isValid = result.filter((r) => !r).length > 0;

    if (isValid) {
      setLoading(false);
      return false;
    }

    // 1. Use firebase function
    const resp = await api.saveFormData(data);

    // 2. Direct Firestore operation
    // firestore.collection("form_data").add({...data});

    if (resp.data) {
      NotificationManager.success('Form Data Save Success');
    } else {
      NotificationManager.error('Form Data Save Failed');
    }
    setLoading(false);
  };

  return (
    <div className="custom-form">
      <h1 className="title">{formData.title}</h1>
      <div>
        {formData.fields.map((field) => {
          return (
            <div key={field.name} className="form-group">
              <div className="form-field">
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  id={field.name}
                  value={data[field.name]}
                  name={field.name}
                  onChange={(e) => handleChange(e, field.name)}
                  type={field.type}
                />
              </div>
              {dataError[field.name] && <p className="error-text">{dataError[field.name]}</p>}
            </div>
          );
        })}
      </div>
      <button onClick={handleFormSubmit} className="primary-btn">
        Submit
      </button>
    </div>
  );
}

export default PageForm;
