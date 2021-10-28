import React from "react";
import { useFormikContext } from "formik";

export default function AppFormPicker({
  items,
  name,
  placeholder,
  label,
  ...others
}) {
  const { errors, setFieldValue, touched, values, setFieldTouched } =
    useFormikContext();

  return (
    <div>
      <label htmlFor={name} className="block text-md font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        onChange={(event) => setFieldValue(name, event.target.value)}
        onBlur={() => setFieldTouched(name)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        value={values[name]}
        placeholder={placeholder}
        {...others}
      >
        {items.map((item, id) => (
          <option value={item.value} key={id}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
}
