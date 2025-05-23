import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  try {
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'bookstore',
    });

    const [rows] = await db.execute('SELECT * FROM cod_orders ORDER BY created_at DESC');
    const orders = rows as Array<{ id: number; status: string; is_delivered: number }>;

    const totalOrders = orders.length;
    const approvedCount = orders.filter((order) => order.status === 'approved').length;
    const pendingCount = orders.filter((order) => order.status === 'pending').length;
    const declinedCount = orders.filter((order) => order.status === 'declined').length;

    return NextResponse.json({
      orders,
      totalOrders,
      approvedCount,
      pendingCount,
      declinedCount,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
