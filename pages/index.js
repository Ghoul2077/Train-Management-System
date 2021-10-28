import React from "react";
import * as Yup from "yup";
import { useQuery } from "react-query";
import AppForm from "../components/Form/AppForm";
import AppFormField from "../components/Form/AppFormField";
import AppFormPicker from "../components/Form/AppFormPicker";
import SubmitButton from "../components/Form/SubmitButton";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().label("First name").required(),
  lastname: Yup.string().label("Last Name").required(),
  train: Yup.number().label("Train").required(),
  seats: Yup.number().label("Number of Seats").required(),
});

const fetchData = async () => {
  const response = await fetch("https://localhost:3000/api/trains");
  if (!response.ok) {
    throw new Error("Error occured");
  }
  return response.json();
};

export default function Home() {
  const { data, refetch, isLoading, error } = useQuery("count", fetchData);

  console.log(data);

  return (
    <div className="flex-1 flex flex-col bg-gray-100 p-5">
      <div className="grid grid-cols-4 flex-1">
        <AppForm
          initialValues={{
            firstname: "",
            lastname: "",
            train: 1,
            seats: 1,
          }}
          validationSchema={validationSchema}
        >
          <div className="grid bg-white h-full shadow-sm p-3">
            <h1 className="text-xl font-semibold text-gray-900 mx-auto">
              Ticket Booking Form
            </h1>
            <AppFormField label="First Name" name="firstname" />
            <AppFormField label="Last Name" name="lastname" />
            <AppFormPicker
              items={[{ title: 1 }, { title: 2 }, { title: 3 }]}
              label="Choose Train"
              name="train"
            />
            <AppFormField
              type="number"
              min={1}
              max={7}
              label="Seats"
              name="seats"
            />
            <SubmitButton
              className="bg-blue-500 text-lg text-white rounded-md h-12 mt-auto"
              title="Book Now"
            />
          </div>
        </AppForm>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
