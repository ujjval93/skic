"use client";

import {
  deleteAnnouncement,
  deleteClass,
  deleteExam,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
} from "@/lib/actions";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useActionState,
} from "react";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";

const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteStudent,
  exam: deleteExam,

  // TODO: OTHER DELETE ACTIONS
  parent: deleteSubject,
  lesson: deleteSubject,
  assignment: deleteSubject,
  result: deleteSubject,
  attendance: deleteSubject,
  event: deleteSubject,

  // Announcement
  announcement: deleteAnnouncement,
};

// USE LAZY LOADING

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});

const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});

const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1>Loading...</h1>,
});

const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <h1>Loading...</h1>,
});

const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => <h1>Loading...</h1>,
});

// Announcement Form
const AnnouncementForm = dynamic(
  () => import("./forms/AnnouncementForm"),
  {
    loading: () => <h1>Loading...</h1>,
  }
);

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => React.JSX.Element;
} = {
  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),

  class: (setOpen, type, data, relatedData) => (
    <ClassForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),

  teacher: (setOpen, type, data, relatedData) => (
    <TeacherForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),

  student: (setOpen, type, data, relatedData) => (
    <StudentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),

  exam: (setOpen, type, data, relatedData) => (
    <ExamForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),

  // Announcement
  announcement: (setOpen, type, data, relatedData) => (
    <AnnouncementForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  const size = "h-8 w-8";

  const bgColor =
    type === "create"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : type === "update"
      ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
      : "bg-red-50 text-red-700 hover:bg-red-100";

  const [open, setOpen] = useState(false);

  const Form = () => {
    const [state, formAction] = useActionState(deleteActionMap[table], {
      success: false,
      error: false,
    });

    const router = useRouter();

    useEffect(() => {
      if (state.success) {
        toast(`${table} has been deleted!`);
        setOpen(false);
        router.refresh();
      }
    }, [state, router]);

    return type === "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text | number" name="id" value={id} hidden />

        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>

        <button className="w-max self-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table] ? (
        forms[table](setOpen, type, data, relatedData)
      ) : (
        <p className="text-center p-4">
          Form for &quot;{table}&quot; is not built yet.
        </p>
      )
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        aria-label={`${type} ${table}`}
        className={`${size} flex items-center justify-center rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image
          src={`/${type}.png`}
          alt=""
          width={16}
          height={16}
        />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-3 backdrop-blur-sm sm:p-5">
          <div
            className="
              relative
              w-full
              max-h-[90vh]
              max-w-5xl
              overflow-y-auto
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-2xl
            "
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                absolute
                right-3
                top-3
                z-20
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-slate-100
                text-slate-600
                transition-colors
                duration-200
                hover:bg-slate-200
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-200
              "
              aria-label="Close dialog"
            >
              <Image
                src="/close.png"
                alt="Close"
                width={14}
                height={14}
              />
            </button>

            <div className="p-4 sm:p-6 lg:p-7">
              <Form />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;