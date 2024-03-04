const style = document.createElement('style');
style.innerHTML = `
  .record-protected {
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
`;
document.head.appendChild(style);

const element = document.querySelector('.element-to-protect');
element.classList.add('record-protected');
