import { useState } from "react";

export const useForm = (initialState = {}, initialErrors = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);

  const reset = (newFormState = initialState) => {
    setValues(newFormState);
  };

  const resetErrors = (newErrosState = initialErrors) => {
    setErrors(newErrosState);
  };

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const handleErrorChange = (newError) => {
    setErrors((prevErrorState) => ({
      ...prevErrorState,
      ...newError,
    }));
  };

  return [
    values,
    errors,
    handleInputChange,
    handleErrorChange,
    reset,
    resetErrors,
  ];
};
