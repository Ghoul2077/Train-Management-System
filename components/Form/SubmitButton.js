import React from "react";
import { useFormikContext } from "formik";

const SubmitButton = ({ title, ...others }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <button type="submit" onClick={() => handleSubmit()} {...others}>
      {title}
    </button>
  );
};

export default SubmitButton;
