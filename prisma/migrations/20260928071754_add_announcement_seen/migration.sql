-- CreateTable
CREATE TABLE "AnnouncementSeen" (
    "userId" TEXT NOT NULL,
    "lastSeenId" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AnnouncementSeen_pkey" PRIMARY KEY ("userId")
);
