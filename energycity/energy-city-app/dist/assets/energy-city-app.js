"use strict";



define('energy-city-app/app', ['exports', 'energy-city-app/resolver', 'ember-load-initializers', 'energy-city-app/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('energy-city-app/authenticators/token', ['exports', 'ember-simple-auth/authenticators/base'], function (exports, _base) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = _base.default.extend({
    restore: function restore(data) {
      return Ember.RSVP.Promise.resolve(data);
    },
    authenticate: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(code, state) {
        var resp;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                //get signed webtoken using moneybutton oauth code and state
                Ember.Logger.log('authenticate', code);

                _context.next = 3;
                return $.ajax({
                  method: 'POST',
                  url: '/auth/moneybutton',
                  data: { code: code, state: state }
                });

              case 3:
                resp = _context.sent;


                console.log("RESP", resp);

                return _context.abrupt('return', Ember.RSVP.Promise.resolve({ token: resp.token }));

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function authenticate(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return authenticate;
    }(),
    invalidate: function invalidate() {
      return Ember.RSVP.Promise.resolve();
    }
  });
});
define('energy-city-app/components/bs-accordion', ['exports', 'ember-bootstrap/components/bs-accordion'], function (exports, _bsAccordion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsAccordion.default;
    }
  });
});
define('energy-city-app/components/bs-accordion/item', ['exports', 'ember-bootstrap/components/bs-accordion/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('energy-city-app/components/bs-accordion/item/body', ['exports', 'ember-bootstrap/components/bs-accordion/item/body'], function (exports, _body) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _body.default;
    }
  });
});
define('energy-city-app/components/bs-accordion/item/title', ['exports', 'ember-bootstrap/components/bs-accordion/item/title'], function (exports, _title) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _title.default;
    }
  });
});
define('energy-city-app/components/bs-alert', ['exports', 'ember-bootstrap/components/bs-alert'], function (exports, _bsAlert) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsAlert.default;
    }
  });
});
define('energy-city-app/components/bs-button-group', ['exports', 'ember-bootstrap/components/bs-button-group'], function (exports, _bsButtonGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsButtonGroup.default;
    }
  });
});
define('energy-city-app/components/bs-button-group/button', ['exports', 'ember-bootstrap/components/bs-button-group/button'], function (exports, _button) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _button.default;
    }
  });
});
define('energy-city-app/components/bs-button', ['exports', 'ember-bootstrap/components/bs-button'], function (exports, _bsButton) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsButton.default;
    }
  });
});
define('energy-city-app/components/bs-carousel', ['exports', 'ember-bootstrap/components/bs-carousel'], function (exports, _bsCarousel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsCarousel.default;
    }
  });
});
define('energy-city-app/components/bs-carousel/slide', ['exports', 'ember-bootstrap/components/bs-carousel/slide'], function (exports, _slide) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _slide.default;
    }
  });
});
define('energy-city-app/components/bs-collapse', ['exports', 'ember-bootstrap/components/bs-collapse'], function (exports, _bsCollapse) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsCollapse.default;
    }
  });
});
define('energy-city-app/components/bs-dropdown', ['exports', 'ember-bootstrap/components/bs-dropdown'], function (exports, _bsDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsDropdown.default;
    }
  });
});
define('energy-city-app/components/bs-dropdown/button', ['exports', 'ember-bootstrap/components/bs-dropdown/button'], function (exports, _button) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _button.default;
    }
  });
});
define('energy-city-app/components/bs-dropdown/menu', ['exports', 'ember-bootstrap/components/bs-dropdown/menu'], function (exports, _menu) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _menu.default;
    }
  });
});
define('energy-city-app/components/bs-dropdown/menu/divider', ['exports', 'ember-bootstrap/components/bs-dropdown/menu/divider'], function (exports, _divider) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _divider.default;
    }
  });
});
define('energy-city-app/components/bs-dropdown/menu/item', ['exports', 'ember-bootstrap/components/bs-dropdown/menu/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('energy-city-app/components/bs-dropdown/menu/link-to', ['exports', 'ember-bootstrap/components/bs-dropdown/menu/link-to'], function (exports, _linkTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
});
define('energy-city-app/components/bs-dropdown/toggle', ['exports', 'ember-bootstrap/components/bs-dropdown/toggle'], function (exports, _toggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
});
define('energy-city-app/components/bs-form', ['exports', 'ember-bootstrap/components/bs-form'], function (exports, _bsForm) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsForm.default;
    }
  });
});
define('energy-city-app/components/bs-form/element', ['exports', 'ember-bootstrap/components/bs-form/element'], function (exports, _element) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
});
define('energy-city-app/components/bs-form/element/control', ['exports', 'ember-bootstrap/components/bs-form/element/control'], function (exports, _control) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _control.default;
    }
  });
});
define('energy-city-app/components/bs-form/element/control/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/control/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('energy-city-app/components/bs-form/element/control/input', ['exports', 'ember-bootstrap/components/bs-form/element/control/input'], function (exports, _input) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _input.default;
    }
  });
});
define('energy-city-app/components/bs-form/element/control/radio', ['exports', 'ember-bootstrap/components/bs-form/element/control/radio'], function (exports, _radio) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _radio.default;
    }
  });
});
define('energy-city-app/components/bs-form/element/control/textarea', ['exports', 'ember-bootstrap/components/bs-form/element/control/textarea'], function (exports, _textarea) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _textarea.default;
    }
  });
});
define('energy-city-app/components/bs-form/element/errors', ['exports', 'ember-bootstrap/components/bs-form/element/errors'], function (exports, _errors) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _errors.default;
    }
  });
});
define('energy-city-app/components/bs-form/element/feedback-icon', ['exports', 'ember-bootstrap/components/bs-form/element/feedback-icon'], function (exports, _feedbackIcon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _feedbackIcon.default;
    }
  });
});
define('energy-city-app/components/bs-form/element/help-text', ['exports', 'ember-bootstrap/components/bs-form/element/help-text'], function (exports, _helpText) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _helpText.default;
    }
  });
});
define('energy-city-app/components/bs-form/element/label', ['exports', 'ember-bootstrap/components/bs-form/element/label'], function (exports, _label) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _label.default;
    }
  });
});
define('energy-city-app/components/bs-form/element/layout/horizontal', ['exports', 'ember-bootstrap/components/bs-form/element/layout/horizontal'], function (exports, _horizontal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _horizontal.default;
    }
  });
});
define('energy-city-app/components/bs-form/element/layout/horizontal/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/layout/horizontal/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('energy-city-app/components/bs-form/element/layout/inline', ['exports', 'ember-bootstrap/components/bs-form/element/layout/inline'], function (exports, _inline) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _inline.default;
    }
  });
});
define('energy-city-app/components/bs-form/element/layout/inline/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/layout/inline/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('energy-city-app/components/bs-form/element/layout/vertical', ['exports', 'ember-bootstrap/components/bs-form/element/layout/vertical'], function (exports, _vertical) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _vertical.default;
    }
  });
});
define('energy-city-app/components/bs-form/element/layout/vertical/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/layout/vertical/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('energy-city-app/components/bs-form/group', ['exports', 'ember-bootstrap/components/bs-form/group'], function (exports, _group) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _group.default;
    }
  });
});
define('energy-city-app/components/bs-modal-simple', ['exports', 'ember-bootstrap/components/bs-modal-simple'], function (exports, _bsModalSimple) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsModalSimple.default;
    }
  });
});
define('energy-city-app/components/bs-modal', ['exports', 'ember-bootstrap/components/bs-modal'], function (exports, _bsModal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsModal.default;
    }
  });
});
define('energy-city-app/components/bs-modal/body', ['exports', 'ember-bootstrap/components/bs-modal/body'], function (exports, _body) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _body.default;
    }
  });
});
define('energy-city-app/components/bs-modal/dialog', ['exports', 'ember-bootstrap/components/bs-modal/dialog'], function (exports, _dialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dialog.default;
    }
  });
});
define('energy-city-app/components/bs-modal/footer', ['exports', 'ember-bootstrap/components/bs-modal/footer'], function (exports, _footer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _footer.default;
    }
  });
});
define('energy-city-app/components/bs-modal/header', ['exports', 'ember-bootstrap/components/bs-modal/header'], function (exports, _header) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _header.default;
    }
  });
});
define('energy-city-app/components/bs-modal/header/close', ['exports', 'ember-bootstrap/components/bs-modal/header/close'], function (exports, _close) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _close.default;
    }
  });
});
define('energy-city-app/components/bs-modal/header/title', ['exports', 'ember-bootstrap/components/bs-modal/header/title'], function (exports, _title) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _title.default;
    }
  });
});
define('energy-city-app/components/bs-nav', ['exports', 'ember-bootstrap/components/bs-nav'], function (exports, _bsNav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsNav.default;
    }
  });
});
define('energy-city-app/components/bs-nav/item', ['exports', 'ember-bootstrap/components/bs-nav/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('energy-city-app/components/bs-nav/link-to', ['exports', 'ember-bootstrap/components/bs-nav/link-to'], function (exports, _linkTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
});
define('energy-city-app/components/bs-navbar', ['exports', 'ember-bootstrap/components/bs-navbar'], function (exports, _bsNavbar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsNavbar.default;
    }
  });
});
define('energy-city-app/components/bs-navbar/content', ['exports', 'ember-bootstrap/components/bs-navbar/content'], function (exports, _content) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _content.default;
    }
  });
});
define('energy-city-app/components/bs-navbar/link-to', ['exports', 'ember-bootstrap/components/bs-navbar/link-to'], function (exports, _linkTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
});
define('energy-city-app/components/bs-navbar/nav', ['exports', 'ember-bootstrap/components/bs-navbar/nav'], function (exports, _nav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _nav.default;
    }
  });
});
define('energy-city-app/components/bs-navbar/toggle', ['exports', 'ember-bootstrap/components/bs-navbar/toggle'], function (exports, _toggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
});
define('energy-city-app/components/bs-popover', ['exports', 'ember-bootstrap/components/bs-popover'], function (exports, _bsPopover) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsPopover.default;
    }
  });
});
define('energy-city-app/components/bs-popover/element', ['exports', 'ember-bootstrap/components/bs-popover/element'], function (exports, _element) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
});
define('energy-city-app/components/bs-progress', ['exports', 'ember-bootstrap/components/bs-progress'], function (exports, _bsProgress) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsProgress.default;
    }
  });
});
define('energy-city-app/components/bs-progress/bar', ['exports', 'ember-bootstrap/components/bs-progress/bar'], function (exports, _bar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bar.default;
    }
  });
});
define('energy-city-app/components/bs-tab', ['exports', 'ember-bootstrap/components/bs-tab'], function (exports, _bsTab) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsTab.default;
    }
  });
});
define('energy-city-app/components/bs-tab/pane', ['exports', 'ember-bootstrap/components/bs-tab/pane'], function (exports, _pane) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pane.default;
    }
  });
});
define('energy-city-app/components/bs-tooltip', ['exports', 'ember-bootstrap/components/bs-tooltip'], function (exports, _bsTooltip) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsTooltip.default;
    }
  });
});
define('energy-city-app/components/bs-tooltip/element', ['exports', 'ember-bootstrap/components/bs-tooltip/element'], function (exports, _element) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
});
define('energy-city-app/components/ember-popper-targeting-parent', ['exports', 'ember-popper/components/ember-popper-targeting-parent'], function (exports, _emberPopperTargetingParent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPopperTargetingParent.default;
    }
  });
});
define('energy-city-app/components/ember-popper', ['exports', 'ember-popper/components/ember-popper'], function (exports, _emberPopper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPopper.default;
    }
  });
});
define('energy-city-app/components/location-list', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define('energy-city-app/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('energy-city-app/controllers/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Ember$Controller$ext;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  exports.default = Ember.Controller.extend((_Ember$Controller$ext = {

    geolocation: Ember.inject.service(),

    currentLocation: null

  }, _defineProperty(_Ember$Controller$ext, 'geolocation', null), _defineProperty(_Ember$Controller$ext, 'socket', null), _defineProperty(_Ember$Controller$ext, 'connected', false), _defineProperty(_Ember$Controller$ext, 'session', Ember.inject.service()), _Ember$Controller$ext));
});
define('energy-city-app/controllers/business', ['exports', 'ember-get-config'], function (exports, _emberGetConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  var calculator = [];

  var _generateInvoice = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(account_id, amount, accessToken) {
      var headers, resp;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('generate', account_id);
              headers = {
                'Authorization': 'Basic ' + btoa(accessToken + ":")
              };
              _context.next = 4;
              return Ember.$.ajax({
                method: 'POST',
                url: '/invoices',
                data: {
                  amount: parseFloat(amount),
                  account_id: parseInt(account_id),
                  redirect_url: 'https://nrg.city/#/payments'
                },
                headers: headers
              });

            case 4:
              resp = _context.sent;
              return _context.abrupt('return', resp);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function _generateInvoice(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  exports.default = Ember.Controller.extend({
    session: Ember.inject.service(),
    amount: '0.00',

    isShowNextButton: Ember.computed('amount', function () {
      return this.get("amount") > 0;
    }),

    actions: {
      calculatorPress: function calculatorPress(event) {
        var n = Ember.$(event.target).html();
        var decimalIndex = calculator.indexOf('.');
        if (decimalIndex > 0 && decimalIndex === calculator.length - 3) {
          return;
        }
        if (n === '.') {
          if (decimalIndex !== -1) {
            return;
          }
          if (calculator.length === 0) {
            return;
          }
        }
        console.log("calculator press", n);
        calculator.push(n);
        var decimalPlaces = this.get('denominationCurrency.decimal_places') || 2;
        var total = parseFloat(calculator.join('')) / Math.pow(10, decimalPlaces);
        this.set('amount', total.toFixed(decimalPlaces));

        console.log('amount', this.get('amount'));
        if (parseFloat(this.get('amount')) > 0) {
          Ember.$("#collect-amount").show();
        } else {
          Ember.$("#collect-amount").hide();
        }
      },
      pressBackspace: function pressBackspace() {
        console.log('back');
        calculator.splice(-1, 1);
        var decimalPlaces = this.get('denominationCurrency.decimal_places') || 2;
        var total = calculator.join('') / Math.pow(10, decimalPlaces || 0);
        console.log('total', total);
        this.set('amount', total.toFixed(decimalPlaces));
      },
      clearCalculator: function clearCalculator() {
        calculator = [];
        this.set('amount', this.getAmountMask());
        Ember.$("#collect-amount").hide();
      },
      generateInvoice: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var token, resp;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  token = this.get('session')['session']['content']['authenticated']['token'];


                  $('.loading').show();
                  _context2.next = 4;
                  return _generateInvoice(this.get('business').id, this.get('amount'), token);

                case 4:
                  resp = _context2.sent;

                  console.log(resp);

                  window.location = 'https://anypayapp.com/invoices/' + resp.invoice.uid;

                case 7:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function generateInvoice() {
          return _ref2.apply(this, arguments);
        }

        return generateInvoice;
      }()
    }

  });
});
define('energy-city-app/controllers/cities', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({

    socket: null,

    connected: false

  });
});
define('energy-city-app/controllers/city', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({

    socket: null,

    connected: false,

    locations: [],

    session: Ember.inject.service(),

    handleInvoicePaid: function handleInvoicePaid(invoice) {

      console.log('invoice.paid', invoice);
    },
    handleInvoiceCreated: function handleInvoiceCreated(invoice) {

      console.log('invoice.created', invoice);

      var locations = this.get('locations');

      var _loop = function _loop(i) {
        console.log(locations[i]);

        if (locations[i].account_id === invoice.account_id) {

          Ember.set(locations[i], 'invoice', invoice);

          setTimeout(function () {

            Ember.set(locations[i], 'invoice', null);
          }, 10000);
        }
      };

      for (var i = 0; i < locations.length; i++) {
        _loop(i);
      }
    }
  });
});
define('energy-city-app/controllers/moneybutton-auth-redirect', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    queryParams: ['code', 'state']
  });
});
define('energy-city-app/helpers/-link-to-params', ['exports', 'ember-angle-bracket-invocation-polyfill/helpers/-link-to-params'], function (exports, _linkToParams) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkToParams.default;
    }
  });
});
define('energy-city-app/helpers/app-version', ['exports', 'energy-city-app/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    var versionOnly = hash.versionOnly || hash.hideSha;
    var shaOnly = hash.shaOnly || hash.hideVersion;

    var match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('energy-city-app/helpers/bs-contains', ['exports', 'ember-bootstrap/helpers/bs-contains'], function (exports, _bsContains) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsContains.default;
    }
  });
  Object.defineProperty(exports, 'bsContains', {
    enumerable: true,
    get: function () {
      return _bsContains.bsContains;
    }
  });
});
define('energy-city-app/helpers/bs-eq', ['exports', 'ember-bootstrap/helpers/bs-eq'], function (exports, _bsEq) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsEq.default;
    }
  });
  Object.defineProperty(exports, 'eq', {
    enumerable: true,
    get: function () {
      return _bsEq.eq;
    }
  });
});
define('energy-city-app/helpers/cancel-all', ['exports', 'ember-concurrency/helpers/cancel-all'], function (exports, _cancelAll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _cancelAll.default;
    }
  });
});
define('energy-city-app/helpers/is-after', ['exports', 'ember-moment/helpers/is-after'], function (exports, _isAfter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isAfter.default;
    }
  });
});
define('energy-city-app/helpers/is-before', ['exports', 'ember-moment/helpers/is-before'], function (exports, _isBefore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isBefore.default;
    }
  });
});
define('energy-city-app/helpers/is-between', ['exports', 'ember-moment/helpers/is-between'], function (exports, _isBetween) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isBetween.default;
    }
  });
});
define('energy-city-app/helpers/is-same-or-after', ['exports', 'ember-moment/helpers/is-same-or-after'], function (exports, _isSameOrAfter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isSameOrAfter.default;
    }
  });
});
define('energy-city-app/helpers/is-same-or-before', ['exports', 'ember-moment/helpers/is-same-or-before'], function (exports, _isSameOrBefore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isSameOrBefore.default;
    }
  });
});
define('energy-city-app/helpers/is-same', ['exports', 'ember-moment/helpers/is-same'], function (exports, _isSame) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isSame.default;
    }
  });
});
define('energy-city-app/helpers/moment-add', ['exports', 'ember-moment/helpers/moment-add'], function (exports, _momentAdd) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentAdd.default;
    }
  });
});
define('energy-city-app/helpers/moment-calendar', ['exports', 'ember-moment/helpers/moment-calendar'], function (exports, _momentCalendar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentCalendar.default;
    }
  });
});
define('energy-city-app/helpers/moment-diff', ['exports', 'ember-moment/helpers/moment-diff'], function (exports, _momentDiff) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentDiff.default;
    }
  });
});
define('energy-city-app/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, _momentDuration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentDuration.default;
    }
  });
});
define('energy-city-app/helpers/moment-format', ['exports', 'ember-moment/helpers/moment-format'], function (exports, _momentFormat) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentFormat.default;
    }
  });
});
define('energy-city-app/helpers/moment-from-now', ['exports', 'ember-moment/helpers/moment-from-now'], function (exports, _momentFromNow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentFromNow.default;
    }
  });
});
define('energy-city-app/helpers/moment-from', ['exports', 'ember-moment/helpers/moment-from'], function (exports, _momentFrom) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentFrom.default;
    }
  });
});
define('energy-city-app/helpers/moment-subtract', ['exports', 'ember-moment/helpers/moment-subtract'], function (exports, _momentSubtract) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentSubtract.default;
    }
  });
});
define('energy-city-app/helpers/moment-to-date', ['exports', 'ember-moment/helpers/moment-to-date'], function (exports, _momentToDate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentToDate.default;
    }
  });
});
define('energy-city-app/helpers/moment-to-now', ['exports', 'ember-moment/helpers/moment-to-now'], function (exports, _momentToNow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentToNow.default;
    }
  });
});
define('energy-city-app/helpers/moment-to', ['exports', 'ember-moment/helpers/moment-to'], function (exports, _momentTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentTo.default;
    }
  });
});
define('energy-city-app/helpers/moment-unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _unix) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _unix.default;
    }
  });
});
define('energy-city-app/helpers/moment', ['exports', 'ember-moment/helpers/moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _moment.default;
    }
  });
});
define('energy-city-app/helpers/now', ['exports', 'ember-moment/helpers/now'], function (exports, _now) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _now.default;
    }
  });
});
define('energy-city-app/helpers/perform', ['exports', 'ember-concurrency/helpers/perform'], function (exports, _perform) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _perform.default;
    }
  });
});
define('energy-city-app/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('energy-city-app/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('energy-city-app/helpers/task', ['exports', 'ember-concurrency/helpers/task'], function (exports, _task) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _task.default;
    }
  });
});
define('energy-city-app/helpers/unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _unix) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _unix.default;
    }
  });
});
define('energy-city-app/helpers/utc', ['exports', 'ember-moment/helpers/utc'], function (exports, _utc) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _utc.default;
    }
  });
  Object.defineProperty(exports, 'utc', {
    enumerable: true,
    get: function () {
      return _utc.utc;
    }
  });
});
define('energy-city-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'energy-city-app/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('energy-city-app/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('energy-city-app/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('energy-city-app/initializers/ember-concurrency', ['exports', 'ember-concurrency/initializers/ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberConcurrency.default;
    }
  });
});
define('energy-city-app/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('energy-city-app/initializers/ember-simple-auth', ['exports', 'energy-city-app/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service', 'ember-simple-auth/initializers/setup-session-restoration'], function (exports, _environment, _configuration, _setupSession, _setupSessionService, _setupSessionRestoration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth',

    initialize: function initialize(registry) {
      var config = _environment.default['ember-simple-auth'] || {};
      config.rootURL = _environment.default.rootURL || _environment.default.baseURL;
      _configuration.default.load(config);

      (0, _setupSession.default)(registry);
      (0, _setupSessionService.default)(registry);
      (0, _setupSessionRestoration.default)(registry);
    }
  };
});
define('energy-city-app/initializers/export-application-global', ['exports', 'energy-city-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('energy-city-app/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('energy-city-app/initializers/load-bootstrap-config', ['exports', 'energy-city-app/config/environment', 'ember-bootstrap/config'], function (exports, _environment, _config) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() /* container, application */{
    _config.default.load(_environment.default['ember-bootstrap'] || {});
  }

  exports.default = {
    name: 'load-bootstrap-config',
    initialize: initialize
  };
});
define('energy-city-app/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('energy-city-app/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("energy-city-app/initializers/websockets", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() /* application */{
    // application.inject('route', 'foo', 'service:foo');
  }

  exports.default = {
    initialize: initialize
  };
});
define("energy-city-app/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('energy-city-app/instance-initializers/ember-simple-auth', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth',

    initialize: function initialize() {}
  };
});
define('energy-city-app/modifiers/ref', ['exports', 'ember-ref-modifier/modifiers/ref'], function (exports, _ref) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ref.default;
    }
  });
});
define('energy-city-app/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('energy-city-app/router', ['exports', 'energy-city-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    //this.route('geolocate', { path: '/' });
    this.route('city', { path: '/cities/:city' });
    this.route('business', { path: '/businesses/:stub' });
    this.route('cities', { path: '/' });
    this.route('moneybutton-auth-redirect', { path: '/auth/moneybutton/redirect' });
    this.route('payments');
    this.route('logout');
    this.route('index');
  });

  exports.default = Router;
});
define('energy-city-app/routes/application', ['exports', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _applicationRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_applicationRouteMixin.default, {

    geolocation: Ember.inject.service(),

    socketIOService: Ember.inject.service('socket-io'),

    sessionAlreadyAuthenticated: function sessionAlreadyAuthenticated() {

      console.log('TT');
      this.transitionTo('cities');
    },

    sessionAuthenticationSucceeded: function sessionAuthenticationSucceeded() {

      try {
        console.log("TRANSITION");

        this.transitionTo('cities');
      } catch (err) {
        console.log('error catch:', err);
        //this.get('errorManager').catchError(err, 'application', 'route', 'sessionAuthenticationSucceeded - try-catch');
      }
    },

    setupController: function setupController(controller) {

      var socket = this.get("socketIOService").socketFor('wss://nrgcty.com');

      controller.set('socket', socket);

      socket.on('connect', function () {
        controller.set('connected', true);
        Ember.Logger.info('socket.connected');
        socket.emit('subscribe');
        Ember.Logger.info('socket.subscribed');
      });

      socket.on('close', function () {
        controller.set('connected', false);
        Ember.Logger.info('socket.disconnected');
      });

      socket.on('error', function (error) {
        Ember.Logger.info('socket.error', error.message);
      });
    }
  });
});
define('energy-city-app/routes/business', ['exports', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _authenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Route.extend(_authenticatedRouteMixin.default, {
    session: Ember.inject.service(),

    model: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {
        var token, resp;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = this.get('session')['session']['content']['authenticated']['token'];
                _context.next = 3;
                return Ember.$.ajax({
                  method: 'GET',
                  url: '/businesses/' + params.stub,
                  headers: {
                    'Authorization': 'Basic ' + btoa(token + ':')
                  }
                });

              case 3:
                resp = _context.sent;
                return _context.abrupt('return', resp);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function model(_x) {
        return _ref.apply(this, arguments);
      }

      return model;
    }(),
    setupController: function setupController(controller, model) {
      controller.set('business', model);
    }
  });
});
define('energy-city-app/routes/cities', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    cities: Ember.inject.service('cities'),

    socketIOService: Ember.inject.service('socket-io'),

    model: function model(params) {

      return this.get('cities').listCities();
    },
    setupController: function setupController(controller, model) {

      Ember.Logger.info(model);
      controller.set('cities', model);

      var socket = this.get("socketIOService").socketFor('wss://nrgcty.com');
      controller.set('socket', socket);
    }
  });
});
define('energy-city-app/routes/city', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Route.extend({

    //geolocation: service(),

    cities: Ember.inject.service(),
    session: Ember.inject.service(),

    socketIOService: Ember.inject.service('socket-io'),

    model: function model(params) {

      return this.get('cities').getCity(params.city);
    },
    setupController: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(controller, model) {
        var locations, socket;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                /*
                 let location = await this.get("geolocation").getLocation();
                 console.log(model);
                 controller.set('city', model);
                controller.set('location', location);
                 console.log('location', location);
                */

                Ember.Logger.info('city', { city: model });

                locations = model.accounts.map(function (account) {

                  var assign = {};

                  var bch_tipjar = account.tipjars.find(function (jar) {
                    return jar.currency === 'BCH';
                  });

                  if (bch_tipjar) {

                    assign['bch_tipjar'] = bch_tipjar;
                  }

                  var bsv_tipjar = account.tipjars.find(function (jar) {
                    return jar.currency === 'BSV';
                  });

                  if (bsv_tipjar) {

                    assign['bsv_tipjar'] = bsv_tipjar;
                  }

                  var dash_tipjar = account.tipjars.find(function (jar) {
                    return jar.currency === 'DASH';
                  });

                  if (dash_tipjar) {

                    assign['dash_tipjar'] = dash_tipjar;
                  }

                  return Object.assign(account, assign);
                });


                console.log(locations);

                controller.set('locations', locations);

                socket = this.get("socketIOService").socketFor('wss://nrgcty.com');

                controller.set('socket', socket);

                socket.on('invoice.created', controller.handleInvoiceCreated, controller);
                socket.on('invoice.paid', controller.handleInvoicePaid, controller);

                socket.on('close', function () {
                  controller.set('connected', false);
                  Ember.Logger.info('socket.disconnected');
                });

                socket.on('error', function (error) {
                  Ember.Logger.info('socket.error', error.message);
                });

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setupController(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return setupController;
    }()
  });
});
define('energy-city-app/routes/geolocate', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Route.extend({

    geolocation: Ember.inject.service(),

    setupController: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(controller) {
        var location, city, cities;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:

                controller.set('geolocating', true);
                controller.set('location', null);
                controller.set('geolocationError', null);

                _context.prev = 3;
                _context.next = 6;
                return this.get('geolocation').geolocate();

              case 6:
                location = _context.sent;


                controller.set('location', location);
                controller.set('geolocating', false);

                if (!(location.address.stateCode === 'NH')) {
                  _context.next = 18;
                  break;
                }

                console.log("YES NH");
                city = location.address.city;
                _context.next = 14;
                return this.get('cities');

              case 14:
                cities = _context.sent;


                controller.transitionToRoute('city', city.toLowerCase() + '-nh');

                _context.next = 19;
                break;

              case 18:

                controller.transitionToRoute('cities');

              case 19:

                console.log("NOT NH");

                _context.next = 25;
                break;

              case 22:
                _context.prev = 22;
                _context.t0 = _context['catch'](3);


                controller.set('geolocationError', _context.t0);

              case 25:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 22]]);
      }));

      function setupController(_x) {
        return _ref.apply(this, arguments);
      }

      return setupController;
    }()
  });
});
define('energy-city-app/routes/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    setupController: function setupController() {
      this.transitionTo('cities');
    }
  });
});
define('energy-city-app/routes/logout', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    session: Ember.inject.service('session'),

    setupController: function setupController() {
      var _this = this;

      this.get('session').invalidate().then(function () {
        _this.transitionTo('login');
      });
    }
  });
});
define('energy-city-app/routes/moneybutton-auth-redirect', ['exports', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _unauthenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Route.extend(_unauthenticatedRouteMixin.default, {
    session: Ember.inject.service(),

    model: function model(params) {
      return params;
    },


    routeIfAlreadyAuthenticated: 'payments',
    routeAfterAuthenticated: 'payments',

    setupController: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(controller, model) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:

                controller.set('signing_in', true);

                _context.prev = 1;
                _context.next = 4;
                return this.get('session').authenticate('authenticator:token', model.code, model.state);

              case 4:
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context['catch'](1);


                console.log('error', _context.t0);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 6]]);
      }));

      function setupController(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return setupController;
    }()
  });
});
define('energy-city-app/routes/payments', ['exports', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _authenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Route.extend(_authenticatedRouteMixin.default, {
    session: Ember.inject.service(),

    model: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var token, resp;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = this.get('session')['session']['content']['authenticated']['token'];
                _context.next = 3;
                return Ember.$.ajax({
                  method: 'GET',
                  url: '/payments',
                  headers: {
                    'Authorization': 'Basic ' + btoa(token + ':')
                  }
                });

              case 3:
                resp = _context.sent;
                return _context.abrupt('return', resp.invoices);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function model() {
        return _ref.apply(this, arguments);
      }

      return model;
    }(),
    setupController: function setupController(controller, model) {

      console.log(model);

      controller.set('payments', model);
    }
  });
});
define('energy-city-app/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('energy-city-app/services/cities', ['exports', 'ember-get-config'], function (exports, _emberGetConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  exports.default = Ember.Service.extend({

    cities: null,
    geolocation: Ember.inject.service(),

    listCities: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.get('cities')) {
                  _context.next = 5;
                  break;
                }

                Ember.$.ajax({
                  method: "GET",
                  url: _emberGetConfig.default.apiEndpoint + '/api/cities'
                }).then(function (result) {

                  _this.set('cities', result.cities);
                });

                return _context.abrupt('return', this.get('cities'));

              case 5:
                _context.next = 7;
                return Ember.$.ajax({
                  method: "GET",
                  url: _emberGetConfig.default.apiEndpoint + '/api/cities'
                });

              case 7:
                result = _context.sent;


                this.set('cities', result.cities);

                return _context.abrupt('return', result.cities);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function listCities() {
        return _ref.apply(this, arguments);
      }

      return listCities;
    }(),
    getCity: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(city_tag) {
        var city;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.get('cities')) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this.listCities();

              case 3:
                city = this.get('cities').find(function (city) {

                  return city.city_tag === city_tag;
                });

                /*let accounts =  this.orderByDistance(location.coords, city.accounts);
                 city.accounts = accounts;*/

                // order by distance from you, add distance

                return _context2.abrupt('return', city);

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getCity(_x) {
        return _ref2.apply(this, arguments);
      }

      return getCity;
    }(),
    orderByDistance: function orderByDistance(coordinates, businesses) {
      var _this2 = this;

      console.log('businesses', businesses);

      return businesses.map(function (business) {

        return Object.assign(business, {
          distance: _this2.get('geolocation').getDistance(coordinates, {
            latitude: business.latitude,
            longitude: business.longitude
          })
        });
      }).sort(function (a, b) {
        return a.distance - b.distance;
      });
    }
  });
});
define('energy-city-app/services/cookies', ['exports', 'ember-cookies/services/cookies'], function (exports, _cookies) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _cookies.default;
});
define('energy-city-app/services/geolocation', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function toRad(value) {
        return value * Math.PI / 180;
    }

    exports.default = Ember.Service.extend({

        location: null,

        geolocate: function geolocate(options) {
            var _this = this;

            return new Ember.RSVP.Promise(function (resolve, reject) {

                geolocator.config({
                    language: "en",
                    google: {
                        version: "3",
                        key: "AIzaSyDHprMrEY-JrNMw4q55ZhoG4HXspKeG8V8"
                    }
                });

                options = Object.assign({
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumWait: 10000, // max wait time for desired accuracy
                    maximumAge: 0, // disable cache
                    desiredAccuracy: 30, // meters
                    fallbackToIP: true, // fallback to IP if Geolocation fails or rejected
                    addressLookup: true, // requires Google API key if true
                    timezone: true // requires Google API key if true
                }, options);

                _this.set('geolocating', true);

                window.geolocator.locate(options, function (err, location) {
                    _this.set('location', location);
                    _this.set('geolocating', false);

                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    console.log(location);
                    resolve(location);
                });
            });
        },
        getDistance: function getDistance(from, to) {
            var fromLat = from.latitude;
            var fromLon = from.longitude;
            var toLat = to.latitude;
            var toLon = to.longitude;

            var earthRadius = 6378137;

            var distance = Math.acos(normalizeACosArg(Math.sin(toRad(toLat)) * Math.sin(toRad(fromLat)) + Math.cos(toRad(toLat)) * Math.cos(toRad(fromLat)) * Math.cos(toRad(fromLon) - toRad(toLon)))) * earthRadius;

            var accuracy = 1;

            return Math.round(distance / accuracy) * accuracy;
        },
        getLocation: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var location;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                location = this.get('location');

                                if (location) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 4;
                                return this.geolocate();

                            case 4:
                                location = _context.sent;

                            case 5:
                                return _context.abrupt('return', location);

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getLocation() {
                return _ref.apply(this, arguments);
            }

            return getLocation;
        }()
    });


    function normalizeACosArg(val) {
        if (val > 1) {
            return 1;
        }
        if (val < -1) {
            return -1;
        }
        return val;
    };
});
define('energy-city-app/services/moment', ['exports', 'ember-moment/services/moment', 'energy-city-app/config/environment'], function (exports, _moment, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var get = Ember.get;
  exports.default = _moment.default.extend({
    defaultFormat: get(_environment.default, 'moment.outputFormat')
  });
});
define('energy-city-app/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _session) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _session.default;
});
define('energy-city-app/services/socket-io', ['exports', 'ember-websockets/services/socket-io'], function (exports, _socketIo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _socketIo.default;
    }
  });
});
define('energy-city-app/services/websockets', ['exports', 'ember-websockets/services/websockets'], function (exports, _websockets) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _websockets.default;
    }
  });
});
define('energy-city-app/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _adaptive) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _adaptive.default.extend();
});
define("energy-city-app/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "LIN7VyGi", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[2,\"<nav class=\\\"navbar navbar-light\\\" style=\\\"background-color: #039454;\\\">\"],[0,\"\\n\"],[6,\"nav\"],[9,\"class\",\"navbar navbar-dark \"],[9,\"style\",\"background-color: #039454;\"],[7],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"container\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"float-left\"],[7],[0,\"\\n      \"],[6,\"img\"],[9,\"class\",\"float-left logo\"],[9,\"src\",\"/white.png\"],[7],[8],[0,\"\\n      \"],[6,\"h1\"],[9,\"class\",\"float-left\"],[7],[4,\"link-to\",[\"cities\"],null,{\"statements\":[[0,\"NrgCty\"]],\"parameters\":[]},null],[8],[0,\"\\n\"],[4,\"if\",[[19,0,[\"connected\"]]],null,{\"statements\":[[0,\"        \"],[6,\"span\"],[9,\"class\",\"badge badge-success\"],[7],[0,\"connected\"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[6,\"span\"],[9,\"class\",\"badge badge-dark\"],[7],[0,\"not connected\"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\\n\"],[4,\"if\",[[19,0,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"        \"],[4,\"link-to\",[\"logout\"],null,{\"statements\":[[0,\"sign out\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[6,\"a\"],[9,\"href\",\"/auth/moneybutton\"],[7],[0,\"sign in\"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"container bodycontainer\"],[7],[0,\"\\n\\n\"],[6,\"div\"],[9,\"style\",\"display:none\"],[9,\"class\",\"loading\"],[7],[8],[0,\"\\n  \"],[1,[18,\"outlet\"],false],[0,\"\\n\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "energy-city-app/templates/application.hbs" } });
});
define("energy-city-app/templates/business", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "a5iwKoeH", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false],[0,\"\\n\\n\"],[6,\"h1\"],[7],[0,\"La Maison Navarre\"],[8],[0,\"\\n\\n\"],[6,\"section\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"container page-layout page-layout--background-primary\\n  calculator-pad-top noselect\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"invoice-amount\"],[7],[0,\"\\n\"],[0,\"      \"],[6,\"h1\"],[9,\"class\",\"invoice-amount\"],[9,\"id\",\"invoice-amount\"],[7],[6,\"span\"],[7],[0,\"$\"],[1,[18,\"amount\"],false],[8],[0,\" \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"page-layout__content calculator-pad-top noselect\"],[9,\"style\",\"display: block;\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"row calculator-pad noselect\"],[9,\"id\",\"calculator-pad\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"col-sm-4 noselect\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"calculatorPress\"],null],null],[9,\"id\",\"calculator-1\"],[7],[0,\"1\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"col-sm-4 noselect\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"calculatorPress\"],null],null],[9,\"id\",\"calculator-2\"],[7],[0,\"2\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"col-sm-4 noselect\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"calculatorPress\"],null],null],[9,\"id\",\"calculator-3\"],[7],[0,\"3\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"col-sm-4 noselect\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"calculatorPress\"],null],null],[9,\"id\",\"calculator-4\"],[7],[0,\"4\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"col-sm-4 noselect\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"calculatorPress\"],null],null],[9,\"id\",\"calculator-5\"],[7],[0,\"5\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"col-sm-4 noselect\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"calculatorPress\"],null],null],[9,\"id\",\"calculator-6\"],[7],[0,\"6\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"col-sm-4 noselect\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"calculatorPress\"],null],null],[9,\"id\",\"calculator-7\"],[7],[0,\"7\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"col-sm-4 noselect\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"calculatorPress\"],null],null],[9,\"id\",\"calculator-8\"],[7],[0,\"8\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"col-sm-4 noselect\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"calculatorPress\"],null],null],[9,\"id\",\"calculator-9\"],[7],[0,\"9\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"col-sm-4 noselect invisible\"],[9,\"id\",\"calculator-delete\"],[7],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"col-sm-4 noselect\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"calculatorPress\"],null],null],[9,\"id\",\"calculator-0\"],[7],[0,\"0\"],[8],[0,\"\\n\"],[4,\"if\",[[19,0,[\"isShowNextButton\"]]],null,{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"col-sm-4\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"pressBackspace\"],null],null],[9,\"id\",\"calculator-backspace\"],[7],[0,\"\\n            \"],[6,\"img\"],[9,\"class\",\"left-chevron-back\"],[10,\"src\",[26,[[18,\"rootURL\"],\"left-chevron.png\"]]],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[6,\"div\"],[9,\"class\",\"col-sm-4 invisible\"],[7],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"      \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"invoice-page__controls\"],[7],[0,\"\\n\\n\"],[4,\"if\",[[19,0,[\"isShowNextButton\"]]],null,{\"statements\":[[0,\"        \"],[6,\"img\"],[9,\"class\",\"new-invoice-next-button\"],[10,\"src\",[26,[[18,\"rootURL\"],\"img/Green_Anypay_Next_Arrow.svg\"]]],[3,\"action\",[[19,0,[]],\"generateInvoice\"]],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[2,\"\\n<section>\\n  <h2>Leave a Tip</h2>\\n</section>\\n\\n<section>\\n  <h2>Service People</h2>\\n</section>\\n\"],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "energy-city-app/templates/business.hbs" } });
});
define("energy-city-app/templates/cities", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "IAH9Qt7o", "block": "{\"symbols\":[\"city\"],\"statements\":[[1,[18,\"outlet\"],false],[0,\"\\n\\n\"],[6,\"table\"],[9,\"class\",\"table table-striped\"],[7],[0,\"\\n\"],[4,\"each\",[[19,0,[\"cities\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"td\"],[7],[0,\"\\n\"],[4,\"link-to\",[\"city\",[19,1,[\"city_tag\"]]],null,{\"statements\":[[0,\"          \"],[1,[19,1,[\"name\"]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[8],[0,\"\\n\\n      \"],[6,\"td\"],[7],[0,\"\\n\"],[4,\"if\",[[19,1,[\"accounts\"]]],null,{\"statements\":[[0,\"          \"],[6,\"a\"],[9,\"target\",\"_blank\"],[7],[0,\"\\n            \"],[6,\"span\"],[9,\"class\",\"badge badge-success\"],[7],[1,[19,1,[\"accounts\",\"length\"]],false],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[8],[0,\"\\n\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[8],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "energy-city-app/templates/cities.hbs" } });
});
define("energy-city-app/templates/city", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "QrKxcU3w", "block": "{\"symbols\":[\"location\"],\"statements\":[[1,[18,\"outlet\"],false],[0,\"\\n\\n\"],[6,\"button\"],[9,\"class\",\"btn btn-large float-left\"],[7],[0,\"\\n  \"],[4,\"link-to\",[\"cities\"],null,{\"statements\":[[0,\"all cities\"]],\"parameters\":[]},null],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[6,\"h2\"],[9,\"class\",\"banner\"],[7],[1,[20,[\"city\",\"name\"]],false],[8],[0,\"\\n\\n  \"],[6,\"ul\"],[7],[0,\"\\n\"],[4,\"each\",[[19,0,[\"locations\"]]],null,{\"statements\":[[0,\"    \"],[6,\"li\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"half-left\"],[7],[0,\"\\n\\n\"],[4,\"if\",[[19,0,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[4,\"link-to\",[\"business\",[19,1,[\"stub\"]]],null,{\"statements\":[[0,\"              \"],[6,\"h4\"],[7],[1,[19,1,[\"business_name\"]],false],[8],[0,\"\\n              \"],[6,\"i\"],[7],[1,[19,1,[\"distance\"]],false],[0,\"meters\"],[8],[0,\"\\n              \"],[6,\"span\"],[9,\"class\",\"badge badge-primary\"],[7],[0,\"Pay Now\"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},{\"statements\":[[0,\"            \"],[6,\"a\"],[9,\"target\",\"_blank\"],[10,\"href\",[26,[\"https://anypayapp.com/pay/\",[19,1,[\"stub\"]]]]],[7],[0,\"\\n              \"],[6,\"h4\"],[7],[1,[19,1,[\"business_name\"]],false],[8],[0,\"\\n              \"],[6,\"i\"],[7],[1,[19,1,[\"distance\"]],false],[0,\"meters\"],[8],[0,\"\\n              \"],[6,\"span\"],[9,\"class\",\"badge badge-primary\"],[7],[0,\"Pay Now\"],[8],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"half-right\"],[7],[0,\"\\n\"],[4,\"if\",[[19,1,[\"bch_tipjar\"]]],null,{\"statements\":[[0,\"          \"],[6,\"a\"],[9,\"target\",\"_blank\"],[10,\"href\",[19,1,[\"bch_tipjar\",\"address\"]],null],[7],[0,\"\\n            \"],[6,\"span\"],[9,\"class\",\"badge badge-success\"],[7],[0,\"BCH Tip\"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[19,1,[\"bsv_tipjar\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"a\"],[9,\"target\",\"_blank\"],[10,\"href\",[26,[\"bitcoin:\",[19,1,[\"bsv_tipjar\",\"address\"]]]]],[7],[0,\"\\n            \"],[6,\"span\"],[9,\"class\",\"badge badge-warning\"],[7],[0,\"BSV Tip\"],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"money-button\"],[10,\"data-to\",[26,[[20,[\"bsv_tipjar\",\"address\"]]]]],[9,\"data-type\",\"tip\"],[9,\"data-label\",\"BSV Tip\"],[9,\"data-currency\",\"USD\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"clear\"],[7],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"clear\"],[7],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[8],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "energy-city-app/templates/city.hbs" } });
});
define('energy-city-app/templates/components/ember-popper-targeting-parent', ['exports', 'ember-popper/templates/components/ember-popper-targeting-parent'], function (exports, _emberPopperTargetingParent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPopperTargetingParent.default;
    }
  });
});
define('energy-city-app/templates/components/ember-popper', ['exports', 'ember-popper/templates/components/ember-popper'], function (exports, _emberPopper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPopper.default;
    }
  });
});
define("energy-city-app/templates/components/location-list", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "plLNXzj6", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "energy-city-app/templates/components/location-list.hbs" } });
});
define("energy-city-app/templates/geolocate", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0/sXA3sB", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"box\"],[7],[0,\"\\n\\n\"],[4,\"if\",[[19,0,[\"geolocating\"]]],null,{\"statements\":[[0,\"\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"h1\"],[9,\"class\",\"flex-center\"],[7],[0,\"Locating Nearby Businesses\"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\n    \"],[6,\"div\"],[7],[0,\"\\n      \"],[6,\"h1\"],[9,\"class\",\"flex-center\"],[7],[1,[20,[\"location\",\"address\",\"city\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "energy-city-app/templates/geolocate.hbs" } });
});
define("energy-city-app/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "4bL8NOQ6", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "energy-city-app/templates/index.hbs" } });
});
define("energy-city-app/templates/moneybutton-auth-redirect", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "jMYMO83m", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false],[0,\"\\n\\n\"],[4,\"if\",[[19,0,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"  Signed In\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  Signing In\\n\"]],\"parameters\":[]}],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "energy-city-app/templates/moneybutton-auth-redirect.hbs" } });
});
define("energy-city-app/templates/payments", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "EPkHQuLc", "block": "{\"symbols\":[\"payment\"],\"statements\":[[1,[18,\"outlet\"],false],[0,\"\\n\"],[6,\"h1\"],[7],[0,\"My Payments\"],[8],[0,\"\\n\\n\"],[6,\"ul\"],[9,\"class\",\"payments-list\"],[7],[0,\"\\n\"],[4,\"each\",[[19,0,[\"payments\"]]],null,{\"statements\":[[0,\"\\n  \"],[6,\"li\"],[7],[0,\"\\n    \"],[6,\"h2\"],[7],[1,[19,1,[\"account\",\"business_name\"]],false],[8],[0,\"\\n    \"],[6,\"p\"],[7],[1,[19,1,[\"invoice_amount_paid\"]],false],[0,\" \"],[1,[19,1,[\"currency\"]],false],[8],[0,\"\\n    \"],[6,\"p\"],[7],[1,[19,1,[\"denomination_amount_paid\"]],false],[0,\" \"],[1,[19,1,[\"denomination_currency\"]],false],[8],[0,\"\\n    \"],[6,\"p\"],[7],[1,[25,\"moment-format\",[[19,1,[\"completed_at\"]],\"dddd, MMMM Do YYYY hh:mm a\"],null],false],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "energy-city-app/templates/payments.hbs" } });
});
define("energy-city-app/templates/root", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "p1EjChqh", "block": "{\"symbols\":[\"location\"],\"statements\":[[1,[18,\"outlet\"],false],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"jumbotron\"],[7],[0,\"\\n  \"],[6,\"h1\"],[9,\"class\",\"align-center center\"],[7],[0,\"Energy City\"],[8],[0,\"\\n\"],[4,\"if\",[[19,0,[\"connected\"]]],null,{\"statements\":[[0,\"    \"],[6,\"span\"],[9,\"class\",\"badge badge-success\"],[7],[0,\"connected\"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[6,\"span\"],[9,\"class\",\"badge badge-warning\"],[7],[0,\"not connected\"],[8],[0,\"\\n\"]],\"parameters\":[]}],[8],[0,\"\\n\\n\"],[6,\"table\"],[9,\"class\",\"table table-striped\"],[7],[0,\"\\n\"],[4,\"each\",[[19,0,[\"locations\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"td\"],[7],[0,\"\\n        \"],[6,\"a\"],[9,\"target\",\"_blank\"],[10,\"href\",[26,[\"https://anypayapp.com/pay/\",[19,1,[\"stub\"]]]]],[7],[0,\"\\n          \"],[1,[19,1,[\"name\"]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"td\"],[7],[0,\"\\n\"],[4,\"if\",[[19,1,[\"tipjar\"]]],null,{\"statements\":[[0,\"          \"],[6,\"a\"],[9,\"target\",\"_blank\"],[10,\"href\",[19,1,[\"tipjar\"]],null],[7],[0,\"\\n            \"],[6,\"span\"],[9,\"class\",\"badge badge-primary\"],[7],[0,\"tipjar\"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[8],[0,\"\\n\\n      \"],[6,\"td\"],[9,\"class\",\"align-right\"],[7],[0,\"\\n\\n\"],[4,\"if\",[[19,1,[\"invoice\"]]],null,{\"statements\":[[0,\"\\n          \"],[6,\"span\"],[9,\"class\",\"badge badge-warning\"],[7],[0,\"\\n\\n            \"],[6,\"a\"],[9,\"target\",\"_blank\"],[10,\"href\",[19,1,[\"invoice\",\"uri\"]],null],[7],[0,\"\\n\\n              Pay $\"],[1,[19,1,[\"invoice\",\"denomination_amount\"]],false],[0,\" \"],[1,[19,1,[\"invoice\",\"currency\"]],false],[0,\"\\n\\n            \"],[8],[0,\"\\n\\n          \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[8],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "energy-city-app/templates/root.hbs" } });
});


define('energy-city-app/config/environment', ['ember'], function(Ember) {
  var prefix = 'energy-city-app';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("energy-city-app/app")["default"].create({"name":"energy-city-app","version":"0.0.0+1ebf8bdf"});
}
//# sourceMappingURL=energy-city-app.map
