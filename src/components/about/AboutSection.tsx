const AboutSection = ({
  studentCount,
  teacherCount,
}: {
  studentCount: number;
  teacherCount: number;
}) => {
  return (
    <section id="about" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10">
          <p className="mb-2 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-yellow-500">
            About Us
            <span className="h-0.5 w-10 bg-yellow-400" />
          </p>

          <h2 className="text-3xl font-bold text-[#125b1c] md:text-4xl">
            Welcome To Shri Krishna Inter College
          </h2>

          <div className="mt-4 h-1 w-20 bg-yellow-400" />
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-sm leading-7 text-gray-600 md:text-base">
              Shri Krishna Inter College is committed to providing quality
              education in a nurturing and supportive environment. Our school
              focuses on academic excellence, character development,
              creativity, discipline, and the overall growth of every student.
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-600 md:text-base">
              We believe that every student has unique potential. Through
              dedicated teachers, meaningful learning experiences, and
              opportunities beyond the classroom, we encourage our students to
              become confident, responsible, and successful individuals.
            </p>

            <a
              href="#academics"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-yellow-400 px-5 py-3 text-sm font-semibold text-blue-900 transition hover:bg-yellow-300"
            >
              Explore Our Academics
              <span>→</span>
            </a>

            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-gray-200 pt-8 sm:grid-cols-4 sm:gap-0">
              <div className="border-gray-200 px-3 text-center sm:border-r">
                <p className="text-2xl font-bold text-blue-700">
                  23+
                </p>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Years of
                  <br />
                  Excellence
                </p>
              </div>

              <div className="border-gray-200 px-3 text-center sm:border-r">
                <p className="text-2xl font-bold text-blue-700">
                  {studentCount}+
                </p>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Enrolled
                  <br />
                  Students
                </p>
              </div>

              <div className="border-gray-200 px-3 text-center sm:border-r">
                <p className="text-2xl font-bold text-blue-700">
                  {teacherCount}+
                </p>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Dedicated
                  <br />
                  Faculty
                </p>
              </div>

              <div className="px-3 text-center">
                <p className="text-2xl font-bold text-blue-700">
                  2
                </p>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Language
                  <br />
                  Mediums
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg md:flex-row md:p-7">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12s3.75-6 9.75-6 9.75 6 9.75 6-3.75 6-9.75 6-9.75-6-9.75-6z"
                  />

                  <circle cx="12" cy="12" r="2.75" />
                </svg>
              </div>

              <div>
                <p className="text-xl font-semibold uppercase tracking-widest text-blue-600">
                  Our Vision
                </p>

                <div className="mt-2 h-0.5 w-8 bg-blue-600" />

                <p className="mt-4 text-sm leading-7 text-gray-600">
                  To create an inspiring learning environment where students
                  develop knowledge, confidence, character, and the skills
                  needed to succeed in a changing world.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg md:flex-row md:p-7">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-yellow-50 text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-8 w-8"
                >
                  <circle cx="12" cy="12" r="8.5" />

                  <circle cx="12" cy="12" r="3" />

                  <path
                    strokeLinecap="round"
                    d="M12 3.5v2M20.5 12h-2M12 20.5v-2M3.5 12h2"
                  />
                </svg>
              </div>

              <div>
                <p className="text-xl font-semibold uppercase tracking-widest text-yellow-500">
                  Our Mission
                </p>

                <div className="mt-2 h-0.5 w-8 bg-yellow-400" />

                <p className="mt-4 text-sm leading-7 text-gray-600">
                  Our mission is to nurture curiosity, creativity, discipline,
                  critical thinking, and compassion while providing students
                  with strong academic foundations and opportunities for
                  holistic development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;