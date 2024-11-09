export interface ActionResult {
  action: string;
  xpath: string;
  value: string;
  status: "success" | "failed" | "pending";
  screenshot: string; // Path to the screenshot
  message?: string; // Any additional message (e.g., error message)
}
