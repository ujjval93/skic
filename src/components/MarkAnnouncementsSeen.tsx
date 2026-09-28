"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { markAnnouncementsSeen } from "@/lib/announcementSeenAction";

const MarkAnnouncementsSeen = () => {
  const router = useRouter();

  useEffect(() => {
    markAnnouncementsSeen().then((res) => {
      if (res.changed) router.refresh();
    });
  }, [router]);

  return null;
};

export default MarkAnnouncementsSeen;