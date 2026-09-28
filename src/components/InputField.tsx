import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  hidden?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  hidden,
  inputProps,
}: InputFieldProps) => {
  return (
    <div
      className={
        hidden
          ? "hidden"
          : "flex w-full min-w-0 flex-col gap-2"
      }
    >
      <label className="text-sm font-medium text-slate-600">
        {label}
      </label>

      <input
        type={type}
        {...register(name)}
        {...inputProps}
        defaultValue={defaultValue}
        className="
          h-11
          w-full
          min-w-0
          rounded-lg
          border
          border-slate-300
          bg-white
          px-3
          text-sm
          text-slate-700
          outline-none
          transition-colors
          duration-200
          placeholder:text-slate-400
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
        "
      />

      {error?.message && (
        <p className="text-sm text-red-600">
          {error.message.toString()}
        </p>
      )}
    </div>
  );
};

export default InputField;