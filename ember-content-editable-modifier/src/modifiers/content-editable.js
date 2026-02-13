import './content-editable.css';

/* eslint-disable prettier/prettier */
import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';

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
      
      element.classList.add('ember-content-editable');
      element.addEventListener('input', this.domUpdated);
      
      if (named.autofocus) {
        schedule('afterRender', element, function() {
          // this will be executed in the 'afterRender' queue
          console.log('scheduled on afterRender queue');
          this.focus();
        });
      }
      this.didSetup = true;
    }

    if (named.placeholder) {
      element.setAttribute('placeholder', named.placeholder);
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

    // Browsers may leave behind <br> elements when all text is deleted,
    // preventing the CSS :empty pseudo-class from matching for placeholder display
    if (!this.value.trim()) {
      this.element.innerHTML = '';
      this.value = '';
    }

    if (this.onChange) {
      this.onChange(this.value);
    }
  }
}
