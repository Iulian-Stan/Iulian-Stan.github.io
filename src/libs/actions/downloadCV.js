const link = document.createElement("a");
link.href = "./CV - Iulian STAN.pdf";
link.setAttribute("download", "CV - Iulian STAN.pdf");

/**
 * Downloads PDF version of the resume
 */
export default function downloadCV() {
  link.click();
}