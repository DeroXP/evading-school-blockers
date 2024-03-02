// Create a chat modal function
function createChatModal(chatUrl) {
  const modal = document.createElement('div');
  modal.id = 'chatModal';
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.width = '400px';
  modal.style.height = '600px';
  modal.style.zIndex = '10000';
  modal.style.backgroundColor = '#fff';
  modal.style.border = '1px solid #ccc';

  const closeButton = document.createElement('button');
  closeButton.innerText = 'Close';
  closeButton.id = 'closeButton';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '0';
  closeButton.style.right = '0';
  closeButton.style.padding = '5px 10px';
  closeButton.style.backgroundColor = '#f0f0f0';
  closeButton.style.border = 'none';
  closeButton.style.cursor = 'pointer';

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.appendChild(closeButton);

  const iframe = document.createElement('iframe');
  iframe.src = chatUrl;
  iframe.style.position = 'absolute';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';

  modal.appendChild(iframe);

  document.body.appendChild(modal);

  // Show the modal
  modal.style.display = 'block';
}

// Usage
const openButton = document.createElement('button');
openButton.innerText = 'Open';
openButton.id = 'openButton';
openButton.style.position = 'fixed';
openButton.style.bottom = '10px';
openButton.style.right = '10px';
openButton.style.zIndex = '9999';
document.body.appendChild(openButton);

openButton.addEventListener('click', () => {
  createChatModal('https://vortron-rd.github.io/T-Crack/');
});
