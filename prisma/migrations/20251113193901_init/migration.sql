-- CreateTable
CREATE TABLE "USERS" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "USERS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ROOMS" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "ROOMS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SERVICES" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "SERVICES_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BOOKINGS" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "room_id" INTEGER NOT NULL,
    "check_in" TIMESTAMP(3) NOT NULL,
    "check_out" TIMESTAMP(3) NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "BOOKINGS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoomToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_RoomToService_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "USERS_username_key" ON "USERS"("username");

-- CreateIndex
CREATE UNIQUE INDEX "USERS_email_key" ON "USERS"("email");

-- CreateIndex
CREATE INDEX "BOOKINGS_user_id_idx" ON "BOOKINGS"("user_id");

-- CreateIndex
CREATE INDEX "BOOKINGS_room_id_idx" ON "BOOKINGS"("room_id");

-- CreateIndex
CREATE INDEX "_RoomToService_B_index" ON "_RoomToService"("B");

-- AddForeignKey
ALTER TABLE "BOOKINGS" ADD CONSTRAINT "BOOKINGS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BOOKINGS" ADD CONSTRAINT "BOOKINGS_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "ROOMS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToService" ADD CONSTRAINT "_RoomToService_A_fkey" FOREIGN KEY ("A") REFERENCES "ROOMS"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToService" ADD CONSTRAINT "_RoomToService_B_fkey" FOREIGN KEY ("B") REFERENCES "SERVICES"("id") ON DELETE CASCADE ON UPDATE CASCADE;
