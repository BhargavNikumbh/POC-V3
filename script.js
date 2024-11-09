// Load JSON data and populate the HTML report
fetch("results.json")
  .then((response) => response.json())
  .then((data) => {
    const reportContainer = document.getElementById("report");

    data.forEach((result) => {
      // Create container div for each result
      const resultDiv = document.createElement("div");
      resultDiv.classList.add("result", result.status);

      // Action details
      resultDiv.innerHTML = `
        <h2>Action: ${result.action}</h2>
        <p><strong>Status:</strong> ${result.status}</p>
        <p><strong>XPath:</strong> ${result.xpath}</p>
        <p><strong>Value:</strong> ${result.value || "N/A"}</p>
        ${
          result.message
            ? `<p><strong>Message:</strong> ${result.message}</p>`
            : ""
        }
        <div class="screenshot">
          <strong>Screenshot:</strong>
          <img src="${result.screenshot}" alt="Screenshot for ${result.action}">
        </div>
      `;

      // Append result to report container
      reportContainer.appendChild(resultDiv);
    });
  })
  .catch((error) => console.error("Error loading results:", error));
