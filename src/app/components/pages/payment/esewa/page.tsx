// app/payment/esewa/page.tsx
"use client";

import { useEffect } from "react";

export default function EsewaPaymentPage() {
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0
    );

    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", "https://uat.esewa.com.np/epay/main");

    const fields = {
      amt: total,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: total,
      pid: `bookstore-${Date.now()}`,
      scd: "EPAYTEST",
      su: "http://localhost:3000/payment/success",
      fu: "http://localhost:3000/payment/failed",
    };

    for (const key in fields) {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", fields[key].toString());
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  }, []);

  return <p>Redirecting to eSewa...</p>;
}
