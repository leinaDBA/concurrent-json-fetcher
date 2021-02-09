"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _url = require("url");

var validateArgs = function validateArgs(urls) {
  var stringErr = new Error('Please provide a single url string or array of url strings');
  var urlArr;

  if (typeof urls === 'string') {
    urlArr = [urls];
  } else if (Array.isArray(urls)) {
    urls.forEach(function (url) {
      if (typeof url !== 'string') {
        throw stringErr;
      }
    });
    urlArr = (0, _toConsumableArray2["default"])(urls);
  } else {
    throw stringErr;
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
    var validUrls, response;
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
            response = _context2.sent;
            _context2.next = 6;
            return Promise.all(response.map( /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref2, index) {
                var reason, status, value, result, _yield$value$json, data;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        reason = _ref2.reason, status = _ref2.status, value = _ref2.value;
                        result = {
                          url: validUrls[index]
                        };

                        if (!(status === 'fulfilled')) {
                          _context.next = 10;
                          break;
                        }

                        _context.next = 5;
                        return value.json();

                      case 5:
                        _yield$value$json = _context.sent;
                        data = _yield$value$json.data;
                        result.data = data;
                        _context.next = 11;
                        break;

                      case 10:
                        result.reason = reason.message;

                      case 11:
                        return _context.abrupt("return", result);

                      case 12:
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