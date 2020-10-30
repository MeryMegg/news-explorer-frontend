export default class BaseComponent {
  constructor() {
  }

  _setHandlers = (arrayParams) => {
    arrayParams.forEach((params) => {
      this._addHandler(...params);
    });
  }

  _addHandler = (element, event, handler) => {
    element.addEventListener(event, handler);
  };

  _removeHandlers = (arrayParams) => {
    arrayParams.forEach((params) => {
      this._removeHandler(...params);
    });
  };

  _removeHandler = (element, event, handler) => {
    element.removeEventListener(event, handler);
  };
}