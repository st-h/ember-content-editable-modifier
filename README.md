# ember-content-editable-modifier

[![Greenkeeper badge](https://badges.greenkeeper.io/st-h/ember-content-editable.svg)](https://greenkeeper.io/)
[![Latest NPM release][npm-badge]][npm-badge-url]
[![Code Climate][codeclimate-badge]][codeclimate-badge-url]
[![Ember Observer Score][ember-observer-badge]][ember-observer-badge-url]
[![Dependencies][dependencies-badge]][dependencies-badge-url]
[![Dev Dependencies][devDependencies-badge]][devDependencies-badge-url]

This addons allows you to add contenteditable functionality to dom elements by providing an ember modifier.

## Compatibility

* Ember.js v3.28 or above
* Ember CLI v3.28 or above
* Node.js v14 or above

If you need support for older ember versions, please check version 2.0.0-rc.0
 or 1.0.5

## Installation

```
ember install ember-content-editable
```


## Usage

Just apply the `content-editable` modifier and provide a `value` attribute and a `onChange` function in order to update the value. Ember does not allow for two way bindings, therefore you will need to take care of updating the value yourself.

## Simplest use case

```
<div {{content-editable value=this.myText onChange=(fn (mut this.myText))}}></div>
```

However, it is recommended to use a setter in order to update your variable. Additionally it is recommended to create an ember component around above statement in order to provide further customizations and features that you need for your app.

## Additional attributes

*autofocus*: If true, the element will be focused once inserted into the document

*placeholder*: Placeholder displayed when value is blank

### Clear the placeholder on focus

Add the following css code to your app:

```
.ember-content-editable:empty:focus:before {
  content: '';
}
```

## Contributing

Please send PRs. However, this addon aims to provide basic contenteditable functionality only, which can easily be extended by using custom components. Otherwise see the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).

[npm-badge]: https://img.shields.io/npm/v/ember-content-editable-modifier.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-content-editable-modifier
<!-- [codeclimate-badge]: https://api.codeclimate.com/v1/badges/8688ab1cea89cb7cb918/maintainability -->
[codeclimate-badge-url]: https://codeclimate.com/github/st-h/ember-content-editable-modifier/maintainability
[ember-observer-badge]: http://emberobserver.com/badges/ember-content-editable-modifier.svg
[ember-observer-badge-url]: http://emberobserver.com/addons/ember-content-editable-modifier
[dependencies-badge]: https://img.shields.io/david/st-h/ember-content-editable-modifier.svg
[dependencies-badge-url]: https://david-dm.org/st-h/ember-content-editable-modifier
[devDependencies-badge]: https://img.shields.io/david/dev/st-h/ember-content-editable-modifier.svg
[devDependencies-badge-url]: https://david-dm.org/st-h/ember-content-editable-modifier#info=devDependencies
