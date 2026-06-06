import React from 'react';
import ContactClient from './ContactClient';
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";

export const metadata = {
  title: 'Get a Technical Audit | Contact MBSYS',
  description: "Ready to upgrade your infrastructure? Contact Bengaluru's technical experts for a professional site audit, CCTV consultation, or networking quote.",
};

export default async function ContactPage() {
  let contactData = null;
  try {
    contactData = await fetchQuery(api.content.get, { pageName: "contact" });
  } catch (e) {
    console.error("Failed to fetch contact content from Convex", e);
  }

  return <ContactClient initialData={contactData} />;
}
