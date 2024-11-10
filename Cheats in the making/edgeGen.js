javascript:void function(){
  const a = document.querySelector("#stageFrame");

  if (a) {
    const b = a.contentDocument || a.contentWindow.document;
    const c = b.body;
    const d = b.querySelector(".main-container");

    if (d) {
      const copyButton = document.createElement("button");
      copyButton.textContent = "Copy Text";
      copyButton.style.position = "fixed";
      copyButton.style.bottom = "5px";
      copyButton.style.left = "10px";
      copyButton.style.padding = "10px 20px";
      copyButton.style.backgroundColor = "#007BFF";
      copyButton.style.color = "white";
      copyButton.style.border = "none";
      copyButton.style.borderRadius = "5px";
      copyButton.style.cursor = "pointer";
      d.appendChild(copyButton);

      const responseFrame = document.createElement("div");
      responseFrame.style.position = "fixed";
      responseFrame.style.bottom = "60px";
      responseFrame.style.left = "10px";
      responseFrame.style.width = "90%";
      responseFrame.style.maxHeight = "300px";
      responseFrame.style.overflowY = "auto";
      responseFrame.style.backgroundColor = "rgba(245, 245, 245, 0.7)"; 
      responseFrame.style.padding = "20px";
      responseFrame.style.borderRadius = "10px";
      responseFrame.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
      responseFrame.style.fontFamily = "Arial, sans-serif";
      responseFrame.style.fontSize = "16px";
      responseFrame.style.whiteSpace = "pre-wrap";
      responseFrame.style.wordWrap = "break-word"; 
      responseFrame.style.display = "none";
      responseFrame.style.pointerEvents = "none";
      d.appendChild(responseFrame);

      copyButton.addEventListener("click", function(){
        const questionContainers = b.querySelectorAll(".question-container");
        let finalText = "";
        let containsImage = false;

        questionContainers.forEach(container => {
          finalText += container.innerText + "\n";
          if (container.querySelector("img")) {
            containsImage = true;
          }
        });

        finalText += "\nPLEASE PUT THE CORRECT ANSWER IN BOLD AND ONLY THE CORRECT ANSWER AND NOTHING ELSE!!!!";
        if (containsImage) {
          finalText += "\n\nTHERE ALSO MIGHT BE AN IMAGE, PLEASE SEARCH TO FIND ANSWERS ON THE WEB, IF YOU CAN.";
        }

        navigator.clipboard.writeText(finalText).then(() => {
          console.log("Text copied to clipboard with instructions!");
        }).catch(err => {
          alert("Failed to copy text, check console for more information.");
          console.error("Failed to copy text: ", err);
        });

        responseFrame.innerHTML = `<div style="text-align:center;"><div class="spinner" style="border: 4px solid #f3f3f3; border-top: 4px solid #007BFF; border-radius: 50%; width: 50px; height: 50px; animation: spin 2s linear infinite;"></div><p style="margin-top: 10px;">Sending to server...</p></div>`;
        responseFrame.style.display = "block";

        setTimeout(function() {
          const apiUrl = "http://localhost:3000/process-text";
          fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ finalText: finalText })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            const geminiResponse = data.response;
            
            responseFrame.innerHTML = '';
            showTypingEffect(responseFrame, geminiResponse);
          })
          .catch(err => {
            console.error("API request failed:", err);
            responseFrame.innerHTML = `<p style="color: red; text-align:center;">Failed to fetch response from server. Please try again later.</p>`;
          });
        }, 2000);
      });

      function showTypingEffect(element, text) {
        element.style.display = "block";
        element.innerHTML = "";

        const regex = /\*\*(.*?)\*\*/g; 
        const matches = [...text.matchAll(regex)];

        let responseText = "";

        if (matches.length > 0) {
          matches.forEach(match => {
            const boldText = document.createElement("span");
            boldText.style.fontWeight = "bold";
            boldText.textContent = match[1];
            responseText += boldText.outerHTML + "<br>";
          });
        } else {
          responseText = text.replace(/\n/g, "<br>");
        }

        element.innerHTML = responseText;

        let index = 0;
        let typingSpeed = 50;
        const textContent = element.textContent || element.innerText;

        function type() {
          if (index < textContent.length) {
            element.innerHTML += textContent.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
          }
        }

        type();
      }

    } else {
      console.error("Main container not found inside the iframe.");
    }
  } else {
    console.error('Iframe with id "stageFrame" not found.');
  }
}();
