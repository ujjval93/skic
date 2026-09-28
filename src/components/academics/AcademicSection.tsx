const programs = [
  {
    title: "Science & Technology",
    description:
      "State-of-the-art labs and a dedicated STEM curriculum.",
    color: "text-blue-600",
  },
  {
    title: "Arts & Humanities",
    description:
      "Visual arts, music, and creative writing programs.",
    color: "text-orange-500",
  },
  {
    title: "Athletics & Sports",
    description:
      "Multiple sports teams and modern facilities.",
    color: "text-green-600",
  },
  {
    title: "Global Exchange",
    description:
      "Exchange programs with partner schools nationwide.",
    color: "text-pink-600",
  },
];

const AcademicSection = () => {
  return (
    <section id="academics" className="bg-gray-50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-yellow-500">
            Excellence In Every Field
          </span>

          <h2 className="mt-2 text-3xl font-bold text-blue-700 md:text-4xl">
            Academic Programs
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <div
              key={program.title}
              className="rounded-lg bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className={`mb-2 font-semibold ${program.color}`}>
                {program.title}
              </h3>

              <p className="text-sm leading-6 text-gray-500">
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicSection;