import React from "react";

import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import styles from "./App.module.css";

interface FormValues {
  name: string;
  email: string;
  phoneNumber: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .test("len", "Phone number must be exactly 12 digits", (val) => {
      return (val?.match(/\d/g) || []).length === 12;
    })
    .required("Phone number is required"),
});

const initialValues: FormValues = {
  name: "",
  email: "",
  phoneNumber: "",
};

const App: React.FC = () => {
  const handleSubmit = (values: FormValues, { setSubmitting }: any) => {
    console.log("Form values:", values);

    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className={styles.formContainer}>
      <h1>ДЗ 27. formik</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name" className={styles.label}>
                Name:
              </label>
              <Field type="text" name="name" className={styles.inputField} />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>

            <div>
              <label htmlFor="email" className={styles.label}>
                Email:
              </label>
              <Field type="email" name="email" className={styles.inputField} />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className={styles.label}>
                Phone Number:
              </label>
              <Field name="phoneNumber">
                {({ field }: FieldProps) => (
                  <InputMask
                    {...field}
                    mask="+38 (099) 999-99-99"
                    maskChar=" "
                    className={styles.inputField}
                  />
                )}
              </Field>
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className={styles.error}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
