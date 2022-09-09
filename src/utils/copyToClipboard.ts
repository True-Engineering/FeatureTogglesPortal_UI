// @ts-nocheck
const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
    return;
  }

  if (
    window.clipboardData !== undefined &&
    window.clipboardData.setData !== undefined
  ) {
    window.clipboardData.setData('Text', text);
    return;
  }

  const inputToCopy = document.createElement('input');
  inputToCopy.setAttribute('value', text);
  document.body.appendChild(inputToCopy);
  inputToCopy.select();
  document.execCommand('copy');
  document.body.removeChild(inputToCopy);
};

export { copyToClipboard };
