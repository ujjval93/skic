import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type Field = { label: string; value?: string | number | null };
type Section = { title: string; fields: Field[] };

const fmtDate = (d?: Date | null) =>
  d ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(d) : null;

const cap = (s?: string | null) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : null;

const fullName = (p?: { name: string; surname: string } | null) =>
  p ? `${p.name} ${p.surname}` : null;

const ProfilePage = async () => {
  const { userId, sessionClaims } = await auth();
  if (!userId) redirect("/sign-in");

  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const clerkUser = await currentUser();
  const clerkEmail = clerkUser?.emailAddresses?.[0]?.emailAddress;

  let name = clerkUser?.username ?? "User";
  let img: string | null = null;
  let chips: string[] = [];
  let sections: Section[] = [];
  let found = false;

  // Always looked up with the logged-in user's own ID, never an ID from the URL.
  if (role === "student") {
    const s = await prisma.student.findUnique({
      where: { id: userId },
      include: {
        class: { include: { supervisor: true } },
        grade: true,
        parent: true,
      },
    });
    if (s) {
      found = true;
      name = `${s.name} ${s.surname}`;
      img = s.img;
      chips = [
        s.class?.name ? `Class ${s.class.name}` : "",
        s.grade ? `Grade ${s.grade.level}` : "",
      ].filter(Boolean);
      sections = [
        {
          title: "School information",
          fields: [
            { label: "Class", value: s.class?.name },
            { label: "Grade", value: s.grade?.level },
            { label: "Class Teacher", value: fullName(s.class?.supervisor) },
            { label: "Student ID", value: s.username },
            { label: "Joined", value: fmtDate(s.createdAt) },
          ],
        },
        {
          title: "Parent / Guardian",
          fields: [
            { label: "Parent Name", value: fullName(s.parent) },
            { label: "Parent Phone", value: s.parent?.phone },
            { label: "Parent Email", value: s.parent?.email },
          ],
        },
        {
          title: "Personal information",
          fields: [
            { label: "Email", value: s.email ?? clerkEmail },
            { label: "Phone", value: s.phone },
            { label: "Address", value: s.address },
            { label: "Blood Type", value: s.bloodType },
            { label: "Birthday", value: fmtDate(s.birthday) },
            { label: "Gender", value: cap(s.sex) },
          ],
        },
      ];
    }
  } else if (role === "teacher") {
    const t = await prisma.teacher.findUnique({
      where: { id: userId },
      include: { subjects: true, classes: true },
    });
    if (t) {
      found = true;
      name = `${t.name} ${t.surname}`;
      img = t.img;
      chips = t.subjects.map((x) => x.name);
      sections = [
        {
          title: "Teaching information",
          fields: [
            { label: "Subjects", value: t.subjects.map((x) => x.name).join(", ") },
            { label: "Class Teacher of", value: t.classes.map((x) => x.name).join(", ") },
            { label: "Teacher ID", value: t.username },
            { label: "Joined", value: fmtDate(t.createdAt) },
          ],
        },
        {
          title: "Personal information",
          fields: [
            { label: "Email", value: t.email ?? clerkEmail },
            { label: "Phone", value: t.phone },
            { label: "Address", value: t.address },
            { label: "Blood Type", value: t.bloodType },
            { label: "Birthday", value: fmtDate(t.birthday) },
            { label: "Gender", value: cap(t.sex) },
          ],
        },
      ];
    }
  } else if (role === "parent") {
    const p = await prisma.parent.findUnique({
      where: { id: userId },
      include: { students: { include: { class: true } } },
    });
    if (p) {
      found = true;
      name = `${p.name} ${p.surname}`;
      chips = [`${p.students.length} child${p.students.length === 1 ? "" : "ren"}`];
      sections = [
        {
          title: "Children",
          fields: p.students.length
            ? p.students.map((st) => ({
                label: `${st.name} ${st.surname}`,
                value: st.class ? `Class ${st.class.name}` : null,
              }))
            : [{ label: "Children", value: null }],
        },
        {
          title: "Contact information",
          fields: [
            { label: "Username", value: p.username },
            { label: "Email", value: p.email ?? clerkEmail },
            { label: "Phone", value: p.phone },
            { label: "Address", value: p.address },
          ],
        },
      ];
    }
  } else if (role === "admin") {
    const a = await prisma.admin.findUnique({ where: { id: userId } });
    if (a) {
      found = true;
      name = a.username;
      sections = [
        {
          title: "Account information",
          fields: [
            { label: "Username", value: a.username },
            { label: "Email", value: clerkEmail },
          ],
        },
      ];
    }
  }

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="m-4 mt-0 flex flex-1 flex-col gap-4">
      {/* HEADER CARD */}
      <div className="overflow-hidden rounded-md bg-white">
        <div className="h-24 bg-linear-to-r from-blue-500 to-indigo-500" />
        <div className="flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end">
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={img}
              alt={name}
              className="-mt-12 h-24 w-24 rounded-full border-4 border-white object-cover"
            />
          ) : (
            <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-3xl font-semibold text-white">
              {initials}
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900">{name}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium capitalize text-blue-700">
                {role ?? "No role"}
              </span>
              {chips.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL CARDS */}
      {found ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title} className="rounded-md bg-white p-6">
              <h2 className="mb-3 text-base font-semibold text-gray-900">
                {section.title}
              </h2>
              <dl>
                {section.fields.map((f) => (
                  <div
                    key={f.label}
                    className="flex justify-between gap-4 border-b border-gray-100 py-2.5 text-sm last:border-0"
                  >
                    <dt className="text-gray-500">{f.label}</dt>
                    <dd className="text-right font-medium text-gray-800">
                      {f.value || "-"}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-md bg-white p-6">
          <h2 className="mb-2 text-base font-semibold text-gray-900">
            Account details
          </h2>
          <p className="text-sm text-gray-500">
            You are signed in, but no profile record is linked to this account
            yet. Please contact the administrator.
          </p>
          {process.env.NODE_ENV === "development" && (
            <p className="mt-3 break-all rounded bg-slate-50 p-2 text-xs text-gray-500">
              Dev only: your Clerk ID is {userId}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;