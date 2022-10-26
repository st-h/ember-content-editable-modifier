/* eslint-disable prettier/prettier */
import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';

function cleanup(instance) {
  instance.element?.removeEventListener('input', instance.domUpdated);
}

export default class ContentEditableModifier extends Modifier {

  didSetup = false;
  element;

  value = undefined;

  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }

  modify(element, positional, named) {
    this.onChange = named.onChange;

    if (!this.didSetup) {
      this.element = element;
      if (named.placeholder) {
        element.setAttribute('placeholder', named.placeholder);
      }

      element.classList.add('ember-content-editable');
      element.addEventListener('input', this.domUpdated);

      if (named.autofocus) {
        element.focus();
      }
      this.didSetup = true;
    }

    if (this.value != named.value) {
      this.updateValue(named.value);
    }

    if (named.disabled && element.getAttribute('contenteditable')) {
      element.removeAttribute('contenteditable');
    } else if (!named.disabled && !element.getAttribute('contenteditable')) {
      element.setAttribute('contenteditable', 'true');
    }
  }

  updateValue(value) {
    this.value = value;
    if (this.value) {
      this.element.innerText = this.value;
    } else {
      this.element.innerText = '';
    }
  }

  @action
  domUpdated() {
    this.value = this.element.innerText;

    if (this.onChange) {
      this.onChange(this.value);
    }
  }
}
