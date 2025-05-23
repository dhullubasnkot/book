import { NextRequest, NextResponse } from "next/server";
import { connection } from "@/app/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Helper function to ensure upload directory exists
const ensureUploadsDirExists = async () => {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  try {
    await mkdir(uploadsDir, { recursive: true });
  } catch (error: any) {
    console.error("Error creating uploads folder:", error);
    if (error.code === "EACCES") {
      throw new Error("Permission denied to create uploads directory.");
    }
    throw new Error("Failed to create uploads directory.");
  }
};

// POST: Add new book
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get("image") as File;

  if (!image) {
    return NextResponse.json(
      { error: "No image file provided." },
      { status: 400 }
    );
  }

  const imageBuffer = Buffer.from(await image.arrayBuffer());
  const fileName = `${Date.now()}-${image.name}`;
  const filePath = path.join(process.cwd(), "public", "uploads", fileName);

  try {
    await ensureUploadsDirExists();
    await writeFile(filePath, imageBuffer);
    const imagePath = `/uploads/${fileName}`;

    const stock = parseInt(formData.get("stock") as string) || 0;

    const values = [
      formData.get("title"),
      formData.get("category"),
      parseFloat(formData.get("price") as string),
      parseFloat(formData.get("discountPrice") as string),
      parseInt(formData.get("pageCount") as string),
      parseFloat(formData.get("weight") as string),
      formData.get("isbn"),
      formData.get("author"),
      formData.get("description"),
      formData.get("genres"),
      formData.get("language"),
      imagePath,
      stock, // Insert stock
    ];

    await connection.query(
      "INSERT INTO books (title, category, price, discountPrice, pageCount, weight, isbn, author, description, genres, language, image, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values
    );

    return NextResponse.json({ message: "Book added successfully!" });
  } catch (error) {
    console.error("Error saving the book:", error);
    return NextResponse.json(
      { error: "Failed to insert book." },
      { status: 500 }
    );
  }
}

// GET: Fetch books
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const bookId = searchParams.get("bookId");

    let query = "SELECT * FROM books";
    let values: any[] = [];

    if (bookId) {
      query += " WHERE id = ?";
      values = [bookId];
    } else if (category) {
      query += " WHERE category = ?";
      values = [category];
    }

    const [result] = await connection.query(query, values);

    if (bookId) {
      if (!Array.isArray(result) || result.length === 0) {
        return NextResponse.json({ error: "Book not found" }, { status: 404 });
      }
      return NextResponse.json({ book: result[0] });
    }

    return NextResponse.json({
      message: "Books fetched successfully!",
      books: result,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books." },
      { status: 500 }
    );
  }
}

// DELETE: Remove book by ID from the MySQL database
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get("bookId");

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    // Query to delete the book by ID in the MySQL database
    const [result] = await connection.query("DELETE FROM books WHERE id = ?", [
      bookId,
    ]);

    // If no rows were affected, it means the book wasn't found in the database
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Book removed successfully" });
  } catch (error) {
    console.error("Error removing book:", error);
    return NextResponse.json(
      { error: "Failed to remove book." },
      { status: 500 }
    );
  }
}

// PUT: Update book details (title, price, stock, etc.)
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get("bookId");

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    const { title, price, stock } = await req.json();

    const updatedValues: any[] = [];
    let updateQuery = "UPDATE books SET";

    if (title) {
      updateQuery += " title = ?,";
      updatedValues.push(title);
    }
    if (price) {
      updateQuery += " price = ?,";
      updatedValues.push(price);
    }
    if (stock !== undefined) {
      updateQuery += " stock = ?,";
      updatedValues.push(stock);
    }

    // Remove the trailing comma and add the WHERE clause
    updateQuery = updateQuery.slice(0, -1) + " WHERE id = ?";
    updatedValues.push(bookId);

    await connection.query(updateQuery, updatedValues);

    return NextResponse.json({ message: "Book updated successfully!" });
  } catch (error) {
    console.error("Error updating the book:", error);
    return NextResponse.json(
      { error: "Failed to update book." },
      { status: 500 }
    );
  }
}
