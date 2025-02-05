-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Finance" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Finance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
