import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class CopyService {
  textArea;
  constructor(private sb: MatSnackBar) {}
  copy(text) {
    this.createTextArea(text);
    this.selectText();
    this.copyToClipboard();
    this.sb.open('Kopiert', '', {duration: 1000});
  }
  isOS() {
    return navigator.userAgent.match(/ipad|iphone/i);
  }
  createTextArea(text) {
    this.textArea = document.createElement('textArea');
    this.textArea.value = text;
    document.body.appendChild(this.textArea);
  }
  selectText() {
    let range,
      selection;

    if (this.isOS()) {
      range = document.createRange();
      range.selectNodeContents(this.textArea);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      this.textArea.setSelectionRange(0, 999999);
    } else {
      this.textArea.select();
    }
  }

  copyToClipboard() {
    document.execCommand('copy');
    document.body.removeChild(this.textArea);
  }
}
