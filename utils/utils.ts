import * as XLSX from "xlsx";
import { Action, Driver } from "../interfaces/Action";

export function readExcelFile(filePath: string) {
  const workbook = XLSX.readFile(filePath);
  // const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets["driver"];
  const rows: Driver[] = XLSX.utils.sheet_to_json(sheet);
  return getTestCasesByExecutionFlag(filePath, rows);
}

function getTestCasesByExecutionFlag(filePath: string, drivers: Driver[]) {
  let sheetname = "";
  let testCaseNo = "";
  let testcase: Action[] = [];
  const workbook = XLSX.readFile(filePath);
  drivers.forEach((driver) => {
    if (driver.Flag === "Y") {
      sheetname = driver.Sheet;
      testCaseNo = driver.Test_Case;
    }
  });

  const scenarioSheet = workbook.Sheets[sheetname];
  const scenarios: Action[] = XLSX.utils.sheet_to_json(scenarioSheet);

  scenarios.forEach((scenario) => {
    if (scenario.Test_Case === testCaseNo) {
      testcase.push(scenario);
    }
  });
  return testcase;
}
