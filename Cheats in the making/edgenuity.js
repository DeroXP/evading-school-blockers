// Prototype of edgenuity auto answer
const iframe = document.querySelector('#stageFrame');
if (iframe) {
    iframe.addEventListener('load', function() {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        
        if (!iframeDocument) {
            console.error('Failed to access iframe document. Ensure iframe is fully loaded.');
            return;
        }

        let mainContainer = iframeDocument.querySelector('.main-container');
        let mainArea;
        let contentContainer;

        if (!mainContainer) {
            mainArea = iframeDocument.querySelector('html body div div div#main_area');
            if (mainArea) {
                contentContainer = iframeDocument.querySelector('html body div.content');
            }
        }

        console.log('mainContainer:', mainContainer);
        console.log('contentContainer:', contentContainer);

        if (mainContainer || contentContainer) {
            const copyButton = document.createElement('button');
            copyButton.textContent = 'Copy Text';
            copyButton.style.position = 'absolute';
            copyButton.style.bottom = '5px';
            copyButton.style.right = '10px';
            copyButton.style.padding = '10px 20px';
            copyButton.style.backgroundColor = '#007BFF';
            copyButton.style.color = 'white';
            copyButton.style.border = 'none';
            copyButton.style.borderRadius = '5px';
            copyButton.style.cursor = 'pointer';
            copyButton.style.zIndex = '1000';

            const targetContainer = mainContainer || mainArea;
            targetContainer.style.position = 'relative';
            targetContainer.appendChild(copyButton);

            copyButton.addEventListener('click', function() {
                let combinedText = '';
                let hasImage = false;

                if (mainContainer) {
                    const textElements = iframeDocument.querySelectorAll('.question-container');
                    textElements.forEach(element => {
                        combinedText += element.innerText + '\n';
                        if (element.querySelector('img')) {
                            hasImage = true;
                        }
                    });
                } else if (contentContainer) {
                    combinedText = contentContainer.innerText;

                    if (contentContainer.querySelector('img')) {
                        hasImage = true;
                    }
                }

                combinedText += '\nPLEASE PUT THE CORRECT ANSWER IN BOLD AND ONLY THE CORRECT ANSWER AND NOTHING ELSE!!!!';

                if (hasImage) {
                    combinedText += '\n\nTHERE ALSO MIGHT BE A IMAGE PLEASE SEARCH TO FIND ANSWERS ON THE WEB, IF YOU CAN.';
                }

                navigator.clipboard.writeText(combinedText).then(() => {
                    console.log('Text copied to clipboard with instructions!');
                }).catch(err => {
                    alert('Failed to copy text, check console for more information.')
                    console.error('Failed to copy text: ', err);
                });
            });
        } else {
            console.error('Neither main container nor alternative selectors were found inside the iframe.');
            console.log('Document HTML:', iframeDocument.documentElement.outerHTML);
        }
    });
} else {
    console.error('Iframe with id "stageFrame" not found.');
}
