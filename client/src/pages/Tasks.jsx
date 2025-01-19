import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import Table from "../components/task/Table";
//import { tasks } from "./../assets/data";
import AddTask from "../components/task/AddTask";
import axios from "axios";

const TABS = [
  { title: "Tile View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> }, //board view
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};
const Tasks = () => {
  const params = useParams(); //detect the parameters of the route

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const status = params?.status || "";

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://trail-tracker-phi.vercel.app/tasks");
        setTasks(response.data);
        setLoading(false);
        //console.log(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return loading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between m-4">
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-red-500 text-white rounded-md py-2 2xl:py-2.5 hover:bg-red-700"
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
            <TaskTitle label="To-do" className={TASK_TYPE.todo} />
            <TaskTitle
              label="In Progress"
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle label="Completed" className={TASK_TYPE.completed} />
          </div>
        )}
        {selected !== 1 ? (
          <BoardView tasks={tasks} />
        ) : (
          <div className="w-full">
            <Table tasks={tasks} />
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tasks;
