import prisma from "@/lib/prisma";
import PublicNavbar from "@/components/PublicNavbar";
import Link from "next/link";
import Image from "next/image";

export default async function HomePage() {
  const [studentCount, teacherCount, announcements] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.announcement.findMany({
      take: 3,
      orderBy: {
        date: "desc",
      },
    }),
  ]);

  return (
    <main className="w-full">
      <PublicNavbar />

      
      <section className="bg-blue-600 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
          {/* LEFT CONTENT */}
          <div>
            <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold text-yellow-300">
              ADMISSIONS OPEN 2026–27
            </span>

            <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl">
              Where Every Student{" "}
              <span className="text-yellow-300">Thrives</span>
            </h1>

            <p className="mb-6 max-w-md text-blue-100">
              Shri Krishna Inter College has been nurturing curious minds, bold
              leaders, and compassionate citizens. Join a community that
              believes in your potential.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#admissions"
                className="rounded-md bg-yellow-400 px-6 py-3 font-semibold text-blue-700 transition hover:bg-yellow-300"
              >
                Apply for Admission
              </a>

              <a
                href="#contact"
                className="rounded-md border border-white/50 px-6 py-3 transition hover:bg-white/10"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-3xl font-bold text-yellow-300">
                {studentCount}
              </p>
              <p className="text-sm text-blue-100">Enrolled Students</p>
            </div>

            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-3xl font-bold text-yellow-300">
                {teacherCount}
              </p>
              <p className="text-sm text-blue-100">Faculty Members</p>
            </div>

            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-3xl font-bold text-yellow-300">98%</p>
              <p className="text-sm text-blue-100">Pass Rate</p>
            </div>

            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-3xl font-bold text-yellow-300">45+</p>
              <p className="text-sm text-blue-100">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      
      <section id="news" className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <span className="text-xs font-semibold uppercase text-yellow-500">
          What&apos;s Happening
        </span>

        <h2 className="mb-8 text-3xl font-bold text-blue-700">
          News &amp; Announcements
        </h2>

        {announcements.length === 0 ? (
          <p className="text-gray-400">No announcements yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {announcements.map((a) => (
              <div
                key={a.id}
                className="rounded-md border-t-4 border-blue-600 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="mb-2 font-semibold text-blue-700">{a.title}</h3>

                <p className="mb-4 line-clamp-3 text-sm text-gray-500">
                  {a.description}
                </p>

                <span className="text-xs text-gray-400">
                  {new Intl.DateTimeFormat("en-GB").format(a.date)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      
      <section id="academics" className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase text-yellow-500">
              Excellence In Every Field
            </span>

            <h2 className="mt-2 text-3xl font-bold text-blue-700">
              Academic Programs
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Science & Technology",
                desc: "State-of-the-art labs and a dedicated STEM curriculum.",
                color: "text-blue-600",
              },
              {
                title: "Arts & Humanities",
                desc: "Visual arts, music, and creative writing programs.",
                color: "text-orange-500",
              },
              {
                title: "Athletics & Sports",
                desc: "Multiple sports teams and modern facilities.",
                color: "text-green-600",
              },
              {
                title: "Global Exchange",
                desc: "Exchange programs with partner schools nationwide.",
                color: "text-pink-600",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className={`mb-2 font-semibold ${item.color}`}>
                  {item.title}
                </h3>

                <p className="text-sm leading-6 text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section id="admissions" className="bg-blue-600 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:px-8 md:text-left">
          <div>
            <span className="text-xs font-semibold uppercase text-yellow-300">
              Start Your Journey
            </span>

            <h2 className="mt-2 text-3xl font-bold">Admissions Are Open</h2>

            <p className="mt-2 max-w-xl text-blue-100">
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

      
      <section id="contact" className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase text-yellow-500">
            We&apos;d Love To Hear From You
          </span>

          <h2 className="mt-2 text-3xl font-bold text-blue-700">
            Get in Touch
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* CONTACT INFORMATION */}
          <div className="flex flex-col gap-5">
            {/* PHONE */}
            <div className="flex items-start gap-4 rounded-lg bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97a1.125 1.125 0 00.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="font-semibold text-blue-700">Call Us</h3>

                <p className="text-sm text-gray-500">+91-9621379990</p>

                <p className="text-sm text-gray-500">Mon–Sat, 8am–4pm</p>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex items-start gap-4 rounded-lg bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>

              <div>
                <h3 className="font-semibold text-blue-700">Email Us</h3>

                <p className="text-sm text-gray-500">
                  info@shrikrishnacollege.edu
                </p>

                <p className="text-sm text-gray-500">
                  admissions@shrikrishnacollege.edu
                </p>
              </div>
            </div>

            {/* LOCATION */}
            <div className="flex items-start gap-4 rounded-lg bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="font-semibold text-blue-700">Visit Us</h3>

                <p className="text-sm text-gray-500">
                  Rajabazar - Gaddopur Road
                </p>

                <p className="text-sm text-gray-500">
                  Maharajganj, Jaunpur 222125
                </p>
              </div>
            </div>

            <Link
              href="/sign-in"
              className="mt-2 inline-flex w-fit rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Student / Teacher / Admin Sign In
            </Link>
          </div>

          {/* CONTACT FORM */}
          <form className="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-blue-700">Send us a message</h3>

            <input
              type="text"
              placeholder="Your Name"
              className="rounded-md border border-gray-200 p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="rounded-md border border-gray-200 p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <textarea
              placeholder="Your Message"
              rows={5}
              className="resize-none rounded-md border border-gray-200 p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="submit"
              className="rounded-md bg-yellow-400 px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-yellow-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      
      <section
  id="contact"
  className="bg-slate-50 py-16 md:py-20"
>
  <div className="mx-auto max-w-7xl px-4 md:px-8">
    <div className="mb-10">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-yellow-500">
        Come See Us
      </p>

      <h2 className="text-3xl font-bold text-blue-700 md:text-4xl">
        Find Us on the Map
      </h2>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
        Visit Shri Krishna Inter College at our campus in
        Purabahoriya, Gaddopur, Maharajganj, Jaunpur.
      </p>
    </div>

    <div className="grid overflow-hidden rounded-2xl bg-white shadow-lg lg:grid-cols-[0.8fr_1.8fr]">
      <div className="flex flex-col justify-between bg-blue-950 p-7 text-white md:p-9">
        <div>
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 text-2xl text-blue-950">
            📍
          </div>

          <h3 className="text-2xl font-bold">
            Shri Krishna Inter College
          </h3>

          <p className="mt-4 text-sm leading-6 text-blue-200">
            Purabahoriya, Gaddopur
            <br />
            Maharajganj, Jaunpur
            <br />
            Uttar Pradesh - 222125
          </p>

          <div className="mt-7 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-yellow-300">
                Classes
              </p>
              <p className="mt-1 text-sm text-blue-100">
                LKG to Class 12
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-yellow-300">
                Medium
              </p>
              <p className="mt-1 text-sm text-blue-100">
                Hindi & English Medium
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-yellow-300">
                Principal
              </p>
              <p className="mt-1 text-sm text-blue-100">
                Arti Yadav
              </p>
            </div>
          </div>
        </div>

        <a
          href="https://www.google.com/maps/search/?api=1&query=Shri+Krishna+Uchattar+Higher+Secondary+School"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-yellow-400 px-5 py-3 text-sm font-semibold text-blue-950 transition hover:bg-yellow-300"
        >
          Get Directions
          <span>↗</span>
        </a>
      </div>

      <div className="min-h-87.5 lg:min-h-125">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d920127.9784348615!2d81.41265667812499!3d25.729247700000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399073069d128c69%3A0xcb4d8296cdcaef75!2sShri%20Krishna%20Uchattar%20Higher%20Secondary%20School!5e0!3m2!1sen!2sus!4v1789375766585!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          title="Shri Krishna Inter College Location"
          className="min-h-87.5 lg:min-h-125"
        />
      </div>
    </div>
  </div>
</section>

      
      <footer className="bg-blue-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <Image
                  src="/school-logo.png"
                  alt="Shri Krishna Inter College Logo"
                  width={55}
                  height={55}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <h2 className="text-2xl font-bold">
                  Shri Krishna Inter College
                </h2>
              </div>

              <p className="mt-4 max-w-lg text-sm leading-6 text-blue-200">
                Purabahoriya, Gaddopur, Maharajganj, Jaunpur, Uttar Pradesh -
                222125
              </p>

              <p className="mt-4 max-w-lg text-sm leading-6 text-blue-200">
                Providing quality education from LKG to Class 12 in both Hindi
                and English medium.
              </p>

              <p className="mt-4 text-sm text-blue-200">
                Principal:{" "}
                <span className="font-medium text-white">Arti Yadav</span>
              </p>

              <p className="mt-2 text-sm text-blue-200">Private School</p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-yellow-300">
                Quick Links
              </h3>

              <div className="flex flex-col gap-3 text-sm text-blue-200">
                <a href="#about" className="transition hover:text-yellow-300">
                  About
                </a>

                <a
                  href="#academics"
                  className="transition hover:text-yellow-300"
                >
                  Academics
                </a>

                <a
                  href="#admissions"
                  className="transition hover:text-yellow-300"
                >
                  Admissions
                </a>

                <a href="#news" className="transition hover:text-yellow-300">
                  News & Events
                </a>

                <a href="#contact" className="transition hover:text-yellow-300">
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-yellow-300">
                School
              </h3>

              <div className="flex flex-col gap-3 text-sm text-blue-200">
                <p>LKG to Class 12</p>
                <p>Hindi Medium</p>
                <p>English Medium</p>
                <p>Private School</p>

                <a
                  href="https://www.instagram.com/skicgaddopur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-yellow-300"
                >
                  Instagram: @skicgaddopur
                </a>

                <Link
                  href="/sign-in"
                  className="mt-1 font-medium text-yellow-300 transition hover:text-yellow-200"
                >
                  Student / Teacher / Admin Sign In
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-blue-800 pt-6">
            <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
              <p className="text-sm text-blue-300">
                © {new Date().getFullYear()} Shri Krishna Inter College. All
                rights reserved.
              </p>

              <p className="text-xs text-blue-400">
                Purabahoriya, Gaddopur, Jaunpur, Uttar Pradesh
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
