-- CreateTable
CREATE TABLE "Book" (
    "bookId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "publisher" TEXT NOT NULL,
    "publicationYear" INTEGER NOT NULL,
    "placeOfPublication" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("bookId")
);
