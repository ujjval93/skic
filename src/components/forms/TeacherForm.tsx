"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useEffect,
  useState,
  useActionState,
} from "react";
import {
  teacherSchema,
  TeacherSchema,
} from "@/lib/formValidationSchemas";
import { createTeacher, updateTeacher } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";

const TeacherForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherSchema>({
    resolver: zodResolver(teacherSchema) as any,
  });

  // Store only the uploaded image URL
  const [imageUrl, setImageUrl] = useState<string>(
    data?.img || ""
  );

  const [state, formAction] = useActionState(
    type === "create" ? createTeacher : updateTeacher,
    {
      success: false,
      error: false,
    }
  );

  const router = useRouter();

  const onSubmit = handleSubmit((formData) => {
    startTransition(() => {
      formAction({
        ...formData,
        img: imageUrl,
      } as TeacherSchema);
    });
  });

  useEffect(() => {
    if (state.success) {
      toast(
        `Teacher has been ${
          type === "create" ? "created" : "updated"
        }!`
      );

      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { subjects = [] } = relatedData || {};

  return (
    <form
      onSubmit={onSubmit}
      className="flex max-h-[88vh] flex-col overflow-hidden"
    >
      {/*  HEADER  */}
      <div className="border-b border-slate-200 pb-4 pr-10">
        <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          {type === "create"
            ? "Create a new teacher"
            : "Update the teacher"}
        </h1>

        <p className="mt-1 text-xs text-slate-500">
          Fill in the information below to{" "}
          {type === "create" ? "create" : "update"} a teacher.
        </p>
      </div>

      {/*  FORM CONTENT  */}
      <div className="flex-1 overflow-y-auto py-5 pr-1 sm:pr-2">
        {/*  AUTH  */}
        <section className="mb-7">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-5 w-1 rounded-full bg-blue-500" />

            <h2 className="text-sm font-semibold text-slate-700">
              Authentication Information
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <InputField
              label="Username"
              name="username"
              defaultValue={data?.username}
              register={register}
              error={errors?.username}
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              defaultValue={data?.email}
              register={register}
              error={errors?.email}
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              defaultValue={
                type === "create" ? "" : data?.password
              }
              register={register}
              error={errors?.password}
            />
          </div>
        </section>

        {/* PERSONAL  */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <div className="h-5 w-1 rounded-full bg-blue-500" />

            <h2 className="text-sm font-semibold text-slate-700">
              Personal Information
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* First Name */}
            <InputField
              label="First Name"
              name="name"
              defaultValue={data?.name}
              register={register}
              error={errors?.name}
            />

            {/* Last Name */}
            <InputField
              label="Last Name"
              name="surname"
              defaultValue={data?.surname}
              register={register}
              error={errors?.surname}
            />

            {/* Phone */}
            <InputField
              label="Phone"
              name="phone"
              type="tel"
              defaultValue={data?.phone}
              register={register}
              error={errors?.phone}
            />

            {/* Address */}
            <div className="sm:col-span-2">
              <InputField
                label="Address"
                name="address"
                defaultValue={data?.address}
                register={register}
                error={errors?.address}
              />
            </div>

            {/* Blood Type */}
            <InputField
              label="Blood Type"
              name="bloodType"
              defaultValue={data?.bloodType}
              register={register}
              error={errors?.bloodType}
            />

            {/* Birthday */}
            <InputField
              label="Birthday"
              name="birthday"
              type="date"
              defaultValue={
                data?.birthday
                  ? new Date(data.birthday)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              register={register}
              error={errors?.birthday}
            />

            {/* Sex */}
            <div className="flex w-full flex-col gap-2">
              <label className="text-sm font-medium text-slate-600">
                Sex
              </label>

              <select
                {...register("sex")}
                defaultValue={data?.sex || "MALE"}
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>

              {errors.sex?.message && (
                <p className="text-sm text-red-600">
                  {errors.sex.message.toString()}
                </p>
              )}
            </div>

            {/*  SUBJECTS  */}
            <div className="flex w-full flex-col gap-2">
              <label className="text-sm font-medium text-slate-600">
                Subjects
              </label>

              <select
                multiple
                {...register("subjects")}
                defaultValue={data?.subjects || []}
                className="h-40 w-full cursor-pointer rounded-lg border border-slate-300 bg-white p-2 text-sm text-slate-700 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {subjects.map(
                  (subject: {
                    id: number;
                    name: string;
                  }) => (
                    <option
                      key={subject.id}
                      value={subject.id}
                      className="cursor-pointer px-2 py-1.5"
                    >
                      {subject.name}
                    </option>
                  )
                )}
              </select>

              <p className="text-xs text-slate-500">
                Hold Ctrl / Cmd to select multiple subjects.
              </p>

              {errors.subjects?.message && (
                <p className="text-sm text-red-600">
                  {errors.subjects.message.toString()}
                </p>
              )}
            </div>

            {/*  PHOTO  */}
            <div className="flex w-full flex-col gap-2">
              <label className="text-sm font-medium text-slate-600">
                Profile Photo
              </label>

              <CldUploadWidget
                uploadPreset="school"
                onSuccess={(result, { widget }) => {
                  const info = result.info as {
                    secure_url?: string;
                  };

                  if (info?.secure_url) {
                    setImageUrl(info.secure_url);
                  }

                  widget.close();
                }}
              >
                {({ open }) => (
                  <div
                    onClick={() => open()}
                    className="
                      group
                      relative
                      h-40
                      w-full
                      cursor-pointer
                      overflow-hidden
                      rounded-lg
                      border-2
                      border-dashed
                      border-slate-300
                      bg-slate-50
                      transition-colors
                      hover:border-blue-400
                      hover:bg-blue-50
                    "
                  >
                    {imageUrl ? (
                      <>
                        <Image
                          src={imageUrl}
                          alt="Teacher profile"
                          fill
                          className="object-cover"
                        />

                        {/* Hover overlay */}
                        <div className="
                          absolute
                          inset-0
                          flex
                          items-center
                          justify-center
                          bg-black/40
                          opacity-0
                          transition
                          group-hover:opacity-100
                        ">
                          <div className="rounded-lg bg-white px-3 py-2">
                            <span className="text-xs font-medium text-slate-700">
                              Change photo
                            </span>
                          </div>
                        </div>

                        {/* Uploaded badge */}
                        <div className="
                          absolute
                          bottom-2
                          left-2
                          rounded-lg
                          border
                          border-green-200
                          bg-green-50
                          px-2
                          py-1
                          text-[10px]
                          font-medium
                          text-green-700
                        ">
                          ✓ Photo uploaded
                        </div>
                      </>
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-2">
                        <Image
                          src="/upload.png"
                          alt="Upload"
                          width={34}
                          height={34}
                        />

                        <span className="text-sm font-medium text-slate-600">
                          Upload a photo
                        </span>

                        <span className="text-xs text-slate-500">
                          JPG, PNG up to supported size
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </CldUploadWidget>
            </div>

            {/* Hidden ID */}
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
        </section>

        {/* ERROR*/}
        {state.error && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-600">
              {state.message || "Something went wrong!"}
            </p>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="border-t border-slate-200 bg-white pt-4">
        <button
          type="submit"
          className="
            h-11
            w-full
            rounded-lg
            bg-blue-600
            px-4
            text-sm
            font-semibold
            text-white
            transition-colors
            duration-200
            hover:bg-blue-700
          "
        >
          {type === "create"
            ? "Create Teacher"
            : "Update Teacher"}
        </button>
      </div>
    </form>
  );
};

export default TeacherForm;