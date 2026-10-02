import { chromium } from "@playwright/test";
import lighthouse from "lighthouse";
import process from "node:process";
import { createStaticServer } from "./static-server.js";

const server = createStaticServer({ port: 4174 });
const debuggingPort = 9223;
const browser = await chromium.launch({
  headless: true,
  args: [`--remote-debugging-port=${debuggingPort}`],
});

try {
  const result = await lighthouse("http://127.0.0.1:4174", {
    port: debuggingPort,
    output: "json",
    logLevel: "error",
    onlyCategories: ["accessibility", "best-practices", "seo"],
  });
  const minimum = 1;
  const scores = Object.fromEntries(
    Object.entries(result.lhr.categories).map(([key, category]) => [
      key,
      category.score,
    ]),
  );
  console.log(scores);
  if (Object.values(scores).some((score) => score < minimum)) {
    for (const category of Object.values(result.lhr.categories)) {
      if (category.score >= minimum) continue;
      const failures = category.auditRefs
        .map(({ id }) => result.lhr.audits[id])
        .filter((audit) => audit.score !== null && audit.score < 1)
        .map((audit) => ({
          id: audit.id,
          title: audit.title,
          details: audit.details?.items,
        }));
      console.error(`${category.title}: ${JSON.stringify(failures, null, 2)}`);
    }
    process.exitCode = 1;
  }
} finally {
  await browser.close();
  server.close();
}
