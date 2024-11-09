import * as XLSX from "xlsx";
import { ObjectRepo } from "../interfaces/ObjectRepoInterface";

export function getObjectRepository(filePath: string) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets["object-repo"];
  const rows: ObjectRepo[] = XLSX.utils.sheet_to_json(sheet);

  //creating a hashmap for faster lookup
  const objectRepo: Map<string, string> = new Map();
  rows.forEach((row) => {
    objectRepo.set(row.Object, row.Locator);
  });
  return objectRepo;
}
