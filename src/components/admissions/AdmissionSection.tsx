import Link from "next/link";

const AdmissionSection = () => {
  return (
    <section
      id="admissions"
      className="bg-blue-600 py-16 text-white md:py-20"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:px-8 md:text-left">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-yellow-300">
            Start Your Journey
          </span>

          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Admissions Are Open
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 md:text-base">
            Give your child an environment where curiosity, confidence, and
            creativity can grow.
          </p>
        </div>

        <Link
          href="/sign-in"
          className="whitespace-nowrap rounded-md bg-yellow-400 px-6 py-3 font-semibold text-blue-700 transition hover:bg-yellow-300"
        >
          Apply Now
        </Link>
      </div>
    </section>
  );
};

export default AdmissionSection;