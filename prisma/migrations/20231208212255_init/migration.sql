-- CreateTable
CREATE TABLE "resident" (
    "residentId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "resident_pkey" PRIMARY KEY ("residentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "resident_username_key" ON "resident"("username");

-- CreateIndex
CREATE UNIQUE INDEX "resident_email_key" ON "resident"("email");
