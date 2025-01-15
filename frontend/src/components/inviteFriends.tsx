import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../api/axiosInstance";
import { Local } from "../environment/env";
import { createAuthHeaders } from "../utils/token";

const InviteFriends = () => {
  const [forms, setForms] = useState([{ id: Date.now(), data: {} }]);

  const initialValues = {
    fullname: "",
    emails: "",
    message: "",
  };

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Fullname is required"),
    emails: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleAddForm = () => {
    setForms([...forms, { id: Date.now(), data: {} }]);
  };

  const handleFormChange = (index:any, values:any) => {
    const updatedForms = [...forms];
    updatedForms[index].data = values;
    setForms(updatedForms);
  };

  const handleSubmitAll = async () => {
    const token = localStorage.getItem("token");
    const allData = forms.map((form) => form.data);

    if (token) {
      try {
        const response = await api.post(
          `${Local.INVITE_FRIEND}`,
          allData,
          createAuthHeaders(token)
        );
        console.log("Response:", response.data);
      } catch (error:any) {
        console.error("Error:", error.response?.data || error.message);
      }
    } else {
      console.error("Token is missing. Please log in.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "'Arial', sans-serif" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Friends</h2>
      <p style={{ fontSize: "16px", color: "#555" }}>
        Invite some friends Jasmine, show them your Waves and let's see what
        they can do!
      </p>
      {forms.map((form, index) => (
        <div
          key={form.id}
          style={{
            marginBottom: "20px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h4
            style={{
              marginBottom: "10px",
              fontSize: "18px",
              fontWeight: "600",
              color: "#333",
            }}
          >
            Friend #{index + 1}
          </h4>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleFormChange(index, values)}
          >
            {({ handleChange, handleBlur, values }) => (
              <Form>
                <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
                  <div style={{ flex: 1 }}>
                    <label
                      htmlFor={`fullname-${index}`}
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontSize: "14px",
                        color: "#555",
                      }}
                    >
                      Full Name
                    </label>
                    <Field
                      type="text"
                      id={`fullname-${index}`}
                      name="fullname"
                      placeholder="Full Name"
                      onChange={(e:any) => {
                        handleChange(e);
                        handleFormChange(index, { ...values, fullname: e.target.value });
                      }}
                      onBlur={handleBlur}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        fontSize: "14px",
                      }}
                    />
                    <ErrorMessage name="fullname" component="div"  />
                  </div>

                  <div style={{ flex: 1 }}>
                    <label
                      htmlFor={`emails-${index}`}
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontSize: "14px",
                        color: "#555",
                      }}
                    >
                      Email Address
                    </label>
                    <Field
                      type="email"
                      id={`emails-${index}`}
                      name="emails"
                      placeholder="Email"
                      onChange={(e:any) => {
                        handleChange(e);
                        handleFormChange(index, { ...values, emails: e.target.value });
                      }}
                      onBlur={handleBlur}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        fontSize: "14px",
                      }}
                    />
                    <ErrorMessage name="emails" component="div" />
                  </div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor={`message-${index}`}
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    Message
                  </label>
                  <Field
                    as="textarea"
                    id={`message-${index}`}
                    name="message"
                    placeholder="Message"
                    onChange={(e:any) => {
                      handleChange(e);
                      handleFormChange(index, { ...values, message: e.target.value });
                    }}
                    onBlur={handleBlur}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      fontSize: "14px",
                      minHeight: "80px",
                    }}
                  />
                  <ErrorMessage name="message" component="div" />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddForm}
        style={{
          display: "inline-block",
          marginTop: "10px",
          color: "#007bff",
          cursor: "pointer",
          border: "none",
          background: "none",
          fontSize: "14px",
        }}
      >
        + Add More
      </button>
      <br />
      <button
        type="button"
        onClick={handleSubmitAll}
        style={{
          marginTop: "20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Friends
      </button>
    </div>
  );
};

export default InviteFriends;
