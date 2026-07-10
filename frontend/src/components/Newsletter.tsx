"use client";
import { useState } from "react";
import { Mail, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="container-x my-16">
      <div className="overflow-hidden rounded-2xl bg-ink px-6 py-12 text-center text-white md:px-12">
        <h2 className="text-2xl font-extrabold md:text-3xl">اشترك في نشرتنا البريدية</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/70">
          كن أول من يعرف عن العروض الحصرية والمنتجات الجديدة فور وصولها.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
          className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
        >
          <div className="flex flex-1 items-center overflow-hidden rounded-lg bg-white">
            <span className="grid w-11 place-items-center text-muted"><Mail width={18} height={18} /></span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="البريد الإلكتروني" className="h-11 flex-1 bg-transparent pe-3 text-sm text-ink outline-none" />
          </div>
          <button className="btn-primary h-11 px-6">{done ? <><Check width={16} height={16}/> تم</> : "اشتراك"}</button>
        </form>
      </div>
    </section>
  );
}
