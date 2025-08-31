async function generatePaper() {
  const subject = document.getElementById("subject").value;
  const questions = document.getElementById("questions").value;
  const level = document.getElementById("level").value;
  const outputDiv = document.getElementById("output");

  outputDiv.innerHTML = "⏳ Generating... Please wait...";

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyBNpdw3aVCMdcEmqi2ShTY6krPImoDfv6M",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `Generate a ${level} level question paper for ${subject} with ${questions} questions.` }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.candidates && data.candidates.length > 0) {
      outputDiv.innerHTML = data.candidates[0].content.parts[0].text;
    } else if (data.error) {
      outputDiv.innerHTML = "⚠ API Error: " + data.error.message;
    } else {
      outputDiv.innerHTML = "⚠ Unexpected response format. Please check console.";
    }

  } catch (error) {
    outputDiv.innerHTML = "⚠ Request Failed: " + error.message;
  }
}
