import prisma from "@/lib/prisma";
import PublicNavbar from "@/components/layout/PublicNavbar";
import HeroSection from "@/components/layout/HeroSection";
import NewsSection from "@/components/layout/NewsSection";
import AcademicSection from "@/components/academics/AcademicSection";
import AdmissionSection from "@/components/admissions/AdmissionSection";
import ContactSection from "@/components/layout/ContactSection";
import MapSection from "@/components/layout/MapSection";
import PublicFooter from "@/components/layout/PublicFooter";
import AboutSection from "@/components/about/AboutSection";
import ResultSection from "@/components/layout/ResultSection";
import AffiliationSection from "@/components/layout/AffiliationSection";

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

      <HeroSection
        studentCount={studentCount}
        teacherCount={teacherCount}
      />

      <AffiliationSection />

      < AboutSection
        studentCount={studentCount}
        teacherCount={teacherCount} />

      <NewsSection announcements={announcements} />

      <AcademicSection />

      <AdmissionSection />

      <ContactSection />

      <ResultSection />

      <MapSection />

      <PublicFooter />
    </main>
  );
}