/* eslint-disable prettier/prettier */
import Modifier from 'ember-modifier';
import { action } from '@ember/object';

export default class ContentEditableModifier extends Modifier {

  value = undefined;

  didInstall() {
    if (this.args.named.placeholder) {
      this.element.setAttribute('placeholder', this.args.named.placeholder);
    }

    this.element.classList.add('ember-content-editable');
    this.addEventListener();

    this.updateValue();

    if (this.args.named.autofocus) {
      this.element.focus();
    }
  }

  didReceiveArguments() {
    if (this.args.named.disabled && this.element.getAttribute('contenteditable')) {
      this.element.removeAttribute('contenteditable');
    } else if (!this.args.named.disabled && !this.element.getAttribute('contenteditable')) {
      this.element.setAttribute('contenteditable', 'true');
    }
  }

  didUpdateArguments() {
    if (this.value != this.args.named.value) {
      this.updateValue();
    }
  }

  updateValue() {
    this.value = this.args.named.value;
    if (this.value) {
      this.element.innerText = this.value;
    } else {
      this.element.innerText = '';
    }
  }

  willDestroy() {
    this.removeEventListener();
  }

  @action
  domUpdated() {
    this.value = this.element.innerText;

    if (this.args.named.onChange) {
      this.args.named.onChange(this.value);
    }
  }

  addEventListener() {
    this.element.addEventListener('input', this.domUpdated);
  }

  removeEventListener() {
    this.element.removeEventListener('input', this.domUpdated);
  }
}
