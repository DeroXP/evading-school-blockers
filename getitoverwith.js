const openButton = document.createElement('button');
openButton.innerText = 'Open';
openButton.id = 'openButton';
openButton.style.position = 'fixed';
openButton.style.bottom = '10px';
openButton.style.right = '10px';
openButton.style.zIndex = '9999';
document.body.appendChild(openButton);

let chatVisible = false;
let chatContainer;

openButton.addEventListener('click', async () => {
    chatVisible = !chatVisible;

    if (chatVisible) {
        try {
            if (!chatContainer) {
                chatContainer = document.createElement('iframe');
                chatContainer.id = 'chatContainer';
                chatContainer.style.position = 'fixed';
                chatContainer.style.top = '50%';
                chatContainer.style.left = '50%';
                chatContainer.style.transform = 'translate(-50%, -50%)';
                chatContainer.style.width = '400px';
                chatContainer.style.height = '600px';
                chatContainer.style.zIndex = '10000';

                chatContainer.sandbox = 'allow-scripts allow-same-origin';

                chatContainer.src = 'https://chat.openai.com/';
            }

            await new Promise(resolve => setTimeout(resolve, 500));

            document.body.appendChild(chatContainer);
        } catch (error) {
            console.error('Error creating iframe:', error);
        }
    } else {
        if (chatContainer) {
            chatContainer.remove();
            chatContainer = null;
        }
    }

    openButton.innerText = chatVisible ? 'Close' : 'Open';
});
