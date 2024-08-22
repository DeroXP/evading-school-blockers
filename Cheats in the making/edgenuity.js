// Prototype of edgenuity auto answer
const iframe = document.querySelector('#stageFrame');
    if (iframe) {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

        const mainContainer = iframeDocument.querySelector('.main-container');
        if (mainContainer) {
            const copyButton = document.createElement('button');
            copyButton.textContent = 'Copy Text';
            copyButton.style.position = 'fixed';
            copyButton.style.bottom = '5px';
            copyButton.style.right = '10px';
            copyButton.style.padding = '10px 20px';
            copyButton.style.backgroundColor = '#007BFF';
            copyButton.style.color = 'white';
            copyButton.style.border = 'none';
            copyButton.style.borderRadius = '5px';
            copyButton.style.cursor = 'pointer';

            mainContainer.appendChild(copyButton);

            copyButton.addEventListener('click', function() {
                const textElements = iframeDocument.querySelectorAll('.question-container');
                let combinedText = '';
                textElements.forEach(element => {
                    combinedText += element.innerText + '\n';
                });

                combinedText += '\nPLEASE PUT THE CORRECT ANSWER IN BOLD AND ONLY THE CORRECT ANSWER AND NOTHING ELSE!!!!';

                navigator.clipboard.writeText(combinedText).then(() => {
                    alert('Text copied to clipboard with instructions!');
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            });
        } else {
            console.error('Main container not found inside the iframe.');
        }
    } else {
        console.error('Iframe with id "stageFrame" not found.');
    }
