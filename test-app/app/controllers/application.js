import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @tracked placeholder = 'enter something';

  value = 'this field should be focused';

  @action
  randomPlaceholder() {
    this.placeholder = (Math.random() + 1).toString(36).substring(7);
  }
}
