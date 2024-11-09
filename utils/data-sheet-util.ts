import * as XLSX from "xlsx";
import { Data } from "../interfaces/DataInterface"; // Adjust the import path
import { Signup } from "../pom/Signup-pom";
import { Login } from "../pom/Login-pom";
import { Contact } from "../pom/Contact-pom";

export function readDataExcelFile(filePath: string, testCase: string): Data {
  const workbook = XLSX.readFile(filePath);

  const data: Data = {
    Signup: { Username: "", Password: "" },
    Login: { Username: "", Password: "" },
    Contact: { Contact_Email: "", Contact_Name: "", Message: "" },
  };

  // Read Signup sheet
  const signupSheet = workbook.Sheets["Signup"];
  if (signupSheet) {
    const signupData: Signup[] = XLSX.utils.sheet_to_json(signupSheet);
    const matchingSignup = signupData.find(
      (row: any) => row.Test_Case === testCase
    );
    if (matchingSignup) {
      data.Signup = matchingSignup; // Assuming only one entry in the Signup sheet
    }
  }

  // Read Login sheet
  const loginSheet = workbook.Sheets["Login"];
  if (loginSheet) {
    const loginData: Login[] = XLSX.utils.sheet_to_json(loginSheet);
    const matchingLogin = loginData.find(
      (row: any) => row.Test_Case === testCase
    );
    if (matchingLogin) {
      data.Login = matchingLogin; // Assign matching entry
    }
  }

  // Read Contact sheet
  const contactSheet = workbook.Sheets["Contact"];
  if (contactSheet) {
    const contactData: Contact[] = XLSX.utils.sheet_to_json(contactSheet);
    const matchingContact = contactData.find(
      (row: any) => row.Test_Case === testCase
    );
    if (matchingContact) {
      data.Contact = matchingContact; // Assign matching entry
    }
  }

  // Check if any section has been populated
  if (
    data.Signup.Username ||
    data.Login.Username ||
    data.Contact.Contact_Email
  ) {
    return data; // Return populated data
  }
  return data;
}
