import React from 'react';
import ServicesClient from './ServicesClient';
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";

export const metadata = {
  title: 'Expert Technical Services | IT, Security & Infrastructure',
  description: "Explore MBSYS's comprehensive technical services in Bengaluru. From IT AMC and network security to CCTV and smart office solutions.",
};

export default async function ServicesPage() {
  let servicesData = null;
  try {
    servicesData = await fetchQuery(api.content.get, { pageName: "services" });
  } catch (e) {
    console.error("Failed to fetch services content from Convex", e);
  }

  return <ServicesClient initialData={servicesData} />;
}
