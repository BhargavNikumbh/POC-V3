import { ActionResult } from "../interfaces/ActionResult";
import { Action } from "../interfaces/Action";
import { Page } from "playwright";
import { Data } from "../interfaces/DataInterface";

export async function basicKeywords(
  page: Page,
  action: Action,
  data: Data,
  objectRepo: Map<string, string>
) {
  const { Test_Case, Action, XPath, Value } = action;
  let result: ActionResult = {
    action: Action,
    xpath: XPath,
    value: Value,
    status: "pending",
    screenshot: "",
  };

  switch (Action) {
    case "LAUNCH_URL":
      await page.goto(Value);
      result.status = "success";
      break;

    case "CLICK":
      const selector = objectRepo.get(XPath);
      if (selector) {
        await page.click(selector); // `selector` is guaranteed to be a string here
        result.status = "success";
      } else {
        await page.click(XPath);
        result.status = "success";
      }
      break;

    case "SEND_KEYS":
      if (Value !== undefined) {
        await page.fill(XPath, Value);
        result.status = "success";
      } else {
        console.error(`Value is missing for type action.`);
        result.status = "failed";
      }
      break;

    case "select":
      await page.selectOption(XPath, Value);
      result.status = "success";
      break;

    default:
      console.error(`Action "${Action}" not recognized.`);
      result.status = "failed";
  }

  const screenshotPath = `reports/${Test_Case}/screenshots/${Action}_${Date.now()}.png`;
  await page.screenshot({ path: screenshotPath });
  result.screenshot = screenshotPath;
  return result;
}
