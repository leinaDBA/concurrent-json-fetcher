"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _url = require("url");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var validateArgs = function validateArgs(urls) {
  var urlArr;

  if (typeof urls === 'string') {
    urlArr = [urls];
  } else if (!Array.isArray(urls)) {
    throw new Error('Please provide a single url or array of urls');
  } else {
    urlArr = (0, _toConsumableArray2["default"])(urls);
  }

  urlArr.forEach(function (url) {
    try {
      new _url.URL(url);
    } catch (err) {
      throw new Error("".concat(err.input, " is not a valid url"));
    }
  });
  return urlArr;
};

var requestJSONs = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(urls) {
    var validUrls, results;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            validUrls = validateArgs(urls);
            _context2.next = 3;
            return Promise.allSettled(validUrls.map(function (url) {
              return (0, _nodeFetch["default"])(url);
            }));

          case 3:
            results = _context2.sent;
            _context2.next = 6;
            return Promise.all(results.map( /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref2, index) {
                var reason, status, value, res;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        reason = _ref2.reason, status = _ref2.status, value = _ref2.value;
                        _context.next = 3;
                        return value.json();

                      case 3:
                        res = _context.sent;
                        return _context.abrupt("return", _objectSpread(_objectSpread({
                          url: validUrls[index]
                        }, status === 'rejected' ? {
                          reason: reason.message
                        } : {}), status === 'fulfilled' ? {
                          value: res.data
                        } : {}));

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x2, _x3) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 6:
            return _context2.abrupt("return", _context2.sent);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function requestJSONs(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = requestJSONs;
exports["default"] = _default;
//# sourceMappingURL=index.js.map