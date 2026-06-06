import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  pages: defineTable({
    pageName: v.string(), // "home", "about", "services", "contact"
    data: v.any(), // Flexible page content JSON
  }).index("by_pageName", ["pageName"]),
});
