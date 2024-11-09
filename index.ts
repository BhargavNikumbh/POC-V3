import { chromium, Browser, Page } from "playwright";
import * as fs from "fs";
import { readExcelFile } from "./utils/utils";
import { Action } from "./interfaces/Action";
import { ActionResult } from "./interfaces/ActionResult";
import { basicKeywords } from "./keywords/Basic_Keywords";
import { readDataExcelFile } from "./utils/data-sheet-util";
import { getObjectRepository } from "./utils/object-repo-util";

async function runScenario() {
  const browser: Browser = await chromium.launch({ headless: false });
  const page: Page = await browser.newPage();

  // Reading Driver, Data sheets, Object Repository
  const actions: Action[] = readExcelFile(
    "./sheets/scenarios.xlsx"
  ) as Action[];
  const results: ActionResult[] = [];
  const data = readDataExcelFile(
    "./sheets/data-sheet.xlsx",
    actions[0].Test_Case
  );
  const objectRepo = getObjectRepository("./sheets/object-repo.xlsx");

  try {
    for (const action of actions) {
      results.push(await basicKeywords(page, action, data, objectRepo));
    }
  } catch (error) {
    console.error("An error occurred during the test execution:", error);
  } finally {
    // Ensure the browser closes only after all actions are complete
    fs.writeFileSync(`results.json`, JSON.stringify(results, null, 2));
    await browser.close();
  }
}

// Run the scenario
runScenario();
