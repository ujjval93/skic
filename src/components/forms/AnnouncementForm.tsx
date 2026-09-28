"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";

import {
  announcementSchema,
  AnnouncementSchema,
} from "@/lib/formValidationSchemas";

import { createAnnouncement, updateAnnouncement } from "@/lib/actions";

import { useFormState } from "react-dom";

import { Dispatch, SetStateAction, useEffect } from "react";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type AnnouncementFormProps = {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
};

const AnnouncementForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: AnnouncementFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnnouncementSchema>({
    resolver: zodResolver(announcementSchema) as any,
  });

  const [state, formAction] = useFormState(
    type === "create" ? createAnnouncement : updateAnnouncement,
    {
      success: false,
      error: false,
    },
  );

  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction(data);
  });

  useEffect(() => {
    if (state.success) {
      toast(
        `Announcement has been ${type === "create" ? "created" : "updated"}!`,
      );

      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { classes } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      {/* Heading */}
      <h1 className="text-xl font-semibold">
        {type === "create"
          ? "Create a new announcement"
          : "Update the announcement"}
      </h1>

      {/* Form fields */}
      <div className="flex flex-wrap justify-between gap-4">
        {/* Title */}
        <InputField
          label="Announcement Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />

        {/* Date */}
        <InputField
          label="Announcement Date"
          name="date"
          defaultValue={
            data?.date ? new Date(data.date).toISOString().split("T")[0] : ""
          }
          register={register}
          error={errors?.date}
          type="date"
        />

        {/* Description */}
        <div className="flex w-full flex-col gap-2">
          <label className="text-sm font-medium text-slate-600">Description</label>

          <textarea
            {...register("description")}
            defaultValue={data?.description}
            rows={5}
            placeholder="Write announcement details..."
            className="
              w-full
              rounded-lg
              border
              border-slate-300
              bg-white
              px-3
              py-2.5
              text-sm
              text-slate-700
              outline-none
              transition-colors
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />

          {errors.description?.message && (
            <p className="text-sm text-red-600">
              {errors.description.message.toString()}
            </p>
          )}
        </div>

        {/* Target Class */}
        <div className="flex w-full flex-col gap-2 md:w-[48%]">
          <label className="text-sm font-medium text-slate-600">Target Class</label>

          <select
            {...register("classId")}
            defaultValue={data?.classId ?? ""}
            className="
              w-full
              rounded-lg
              border
              border-slate-300
              bg-white
              px-3
              py-2.5
              text-sm
              text-slate-700
              outline-none
              transition-colors
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          >
            <option value="">All Classes / School-wide</option>

            {classes?.map((item: { id: number; name: string }) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {errors.classId?.message && (
            <p className="text-sm text-red-600">
              {errors.classId.message.toString()}
            </p>
          )}
        </div>

        {/* Hidden ID for update */}
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
      </div>

      {/* Server error */}
      {state.error && (
        <span className="text-sm text-red-600">Something went wrong!</span>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="
          rounded-lg
          bg-blue-600
          px-4
          py-2.5
          text-sm
          font-medium
          text-white
          transition-colors
          duration-200
          hover:bg-blue-700
        "
      >
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AnnouncementForm;
