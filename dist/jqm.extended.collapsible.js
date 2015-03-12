/*global jQuery: true */
/*jslint nomen: true */

(function ($, undefined) {
    "use strict";
    
    var optHeading = $.mobile.collapsible.prototype.options.heading;

    $.widget("mobile.collapsible", $.mobile.collapsible, {
        
        _clickHandler: null,
        _tapHandler: null,

        _create: function () {
            // calling parent's ``_create` method
            this._super();

            var ui = this._ui;
            
            // saving the existing `click` and `tap` event handlers
            var evt = $._data(ui.heading[0], "events");
            this._clickHandler = evt.click[0].handler;
            this._tapHandler = evt.tap[0].handler

            // removing existing `click handler from the heading
            this._off(ui.heading, "click tap");

            // attaching click handler only on the heading
            this._on( ui.heading, {
                "click": "_handleTapOrClick",
                "tap": "_handleTapOrClick",
            });
        },
    
        _handleTapOrClick: function(e) {
            var $target = $(e.target);
            if ($target.hasClass("ui-collapsible-heading") || $target.hasClass("ui-collapsible-heading-toggle")) {
                switch (e.type) {
                    case "click":
                        this._clickHandler(e)
                        break;
                    case "tap":
                        this._tapHandler(e);
                        break;
                }
            }
        },

        _enhance: function (elem, ui) {
            // callind parent's `_enhance` method
            this._super(elem, ui);

            ui.heading.on("flipswitchcreate", function () {
                // aligning flipswitches to the right after initialization
                ui.heading.find(".ui-flipswitch").addClass('ui-btn-right');
            });

            // setting controlgroup divs' margin to 0 
            ui.heading
                .children()
                .find(":jqmData(role='controlgroup')")
                .css('margin', '0');

            return ui;
        }

    });

}(jQuery));