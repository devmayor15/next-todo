"use client";

import React, { FormEventHandler } from "react";
import { useState } from "react";

import { ITask } from "@/types/tasks";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { editTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter()

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setTaskToEdit("");

    setOpenModalEdit(false);
    router.refresh;
  };

  return (
    <div>
      <tr key={task.id}>
        <td className="w-full">{task.text}</td>
        <td className="flex gap-5">
          <FiEdit
            onClick={() => setOpenModalEdit(true)}
            cursor="pointer"
            className="text-blue-500"
            size={25}
          />
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form onSubmit={handleSubmitEditTodo}>
              <h3 className="font-bold text-lg">Edit task</h3>
              <div className="modal-action">
                <input
                  value={taskToEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <button type="submit" className="btn">
                  Submit
                </button>
              </div>
            </form>
          </Modal>
          <FiTrash2 cursor="pointer" className="text-red-500" size={25} />
        </td>
      </tr>
    </div>
  );
};

export default Task;
