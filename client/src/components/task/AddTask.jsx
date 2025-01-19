import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import axios from "axios";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTask = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [stage, setStage] = useState(LISTS[0]);
  //const [priority, setPriority] = useState(PRIORITY[0]);

  const submitHandler = async (data, event) => {
    event.preventDefault();
    const payload = {
      title: data.title,
      description: data.description,
      stage: data.stage,
      priority: data.priority,
      date: data.date,
    };
    console.log("Payload:", payload);
    const response = await axios
      .post("http://localhost:8800/tasks/create", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setOpen(false);
  };
  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogTitle
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          Add Task
        </DialogTitle>

        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Task Title"
            type="text"
            name="title"
            label="Task Title"
            className="w-full rounded"
            register={register("title", { required: "Title is required" })}
            error={errors.title ? errors.title.message : ""}
          />

          <Textbox
            placeholder="Description"
            type="text"
            name="description"
            label="Task Description"
            className="w-full rounded"
            register={register("description")}
            error={errors.description ? errors.description.message : ""}
          />

          <div className="flex gap-4">
            <Textbox
              placeholder="stage"
              type="text"
              name="stage"
              label="Task Stage"
              className="w-full rounded"
              register={register("stage")}
              error={errors.description ? errors.description.message : ""}
            />
            <Textbox
              placeholder="Date"
              type="date"
              name="date"
              label="Task Date"
              className="w-full rounded"
              register={register("date", { required: "Date is required!" })}
              error={errors.date ? errors.date.message : ""}
            />
          </div>

          <div className="flex gap-4">
            <Textbox
              placeholder="priority"
              type="text"
              name="priority"
              label="Task Stage"
              className="w-full rounded"
              register={register("priority")}
              error={errors.description ? errors.description.message : ""}
            />
          </div>
          <Button
            label="Submit"
            type="submit"
            className="bg-red-600 px-8 text-sm font-semibold text-white hover:bg-red-700 sm:w-auto"
            onClick={() => handleSubmit(submitHandler)}
          />
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;
