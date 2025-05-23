// ✅ File: /api/cashdelivery/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Incoming order data:", body); // DEBUG: Log incoming data

    const {
      name,
      phone,
      email,
      street,
      locationUrl,
      notes,
      cartItems,
      totalAmount,
      totalBooks,
    } = body;

    // Validate data (e.g., ensure cartItems are not empty)
    if (!cartItems || !totalAmount || !totalBooks) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Connect to MySQL
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'bookstore',
    });

    // Insert the order into the cod_orders table
    const [result] = await db.execute(
      `INSERT INTO cod_orders 
        (name, phone, email, street, location_url, notes, cart_items, total_amount, total_books, status, is_delivered) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        phone,
        email,
        street,
        locationUrl,
        notes,
        JSON.stringify(cartItems),
        totalAmount,
        totalBooks,
        'pending',
        0,
      ]
    );

    console.log("Order inserted successfully:", result); // DEBUG: Log successful insertion

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error inserting order:', error); // Log error
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}
