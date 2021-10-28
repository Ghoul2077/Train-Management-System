import React from "react";
import { useFormikContext } from "formik";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import clsx from "clsx";

const AppFormField = ({
  name,
  multiline = false,
  hideErrorMessage = false,
  containerStyle,
  containerProps,
  errorProps,
  label,
  ...otherProps
}) => {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext();
  const inputProps = {
    id: name,
    name: name,
    onChange: handleChange(name),
    onBlur: () => setFieldTouched(name),
    className: clsx(
      {
        "border-2 border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500":
          errors[name] && touched[name],
      },
      "block w-full pr-10 border-2 focus:outline-none border-gray-300 focus:border-gray-600 sm:text-sm rounded-md py-2 pl-2"
    ),
    value: values[name],
  };

  return (
    <div className="max-w-xl">
      <label htmlFor={name} className="block text-md font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm" {...containerProps}>
        {!multiline && <input {...inputProps} {...otherProps} />}
        {multiline && <textarea {...inputProps} {...otherProps} />}
        {!hideErrorMessage && errors[name] && touched[name] && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <HiOutlineExclamationCircle
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {!hideErrorMessage && errors[name] && touched[name] && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errors[name]}
        </p>
      )}
    </div>
  );
};

export default AppFormField;
