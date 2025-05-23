import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, status, is_delivered } = body;

    if (!id || (status === undefined && is_delivered === undefined)) {
      return NextResponse.json(
        { success: false, message: "ID and at least status or is_delivered required." },
        { status: 400 }
      );
    }

    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "bookstore",
    });

    let query = "";
    let params: any[] = [];

    if (status !== undefined && is_delivered !== undefined) {
      query = "UPDATE cod_orders SET status = ?, is_delivered = ? WHERE id = ?";
      params = [status, is_delivered, id];
    } else if (status !== undefined) {
      query = "UPDATE cod_orders SET status = ? WHERE id = ?";
      params = [status, id];
    } else if (is_delivered !== undefined) {
      query = "UPDATE cod_orders SET is_delivered = ? WHERE id = ?";
      params = [is_delivered, id];
    }

    const [result]: any = await db.execute(query, params);

    if (result.affectedRows > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: "No rows updated." }, { status: 404 });
    }
  } catch (error: any) {
    console.error("Update Error:", error.message);
    return NextResponse.json({ success: false, message: "Server error." }, { status: 500 });
  }
}
