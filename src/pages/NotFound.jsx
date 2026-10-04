import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[70vh] grid place-items-center px-4">
        <div className="text-center">
          <p className="font-mono text-[hsl(var(--accent))] text-lg">404</p>
          <h1 className="mt-2 text-3xl font-display font-extrabold">Page not found</h1>
          <p className="mt-3 text-slate-600">The page you're looking for doesn't exist.</p>
          <Link to="/" className="inline-block mt-6 btn-cta px-6 h-12 leading-[3rem] rounded-md font-semibold">Back to Home</Link>
        </div>
      </div>
    </Layout>
  );
}
