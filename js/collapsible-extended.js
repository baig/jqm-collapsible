(function ($, undefined) {

    var optHeading = $.mobile.collapsible.prototype.options.heading;

    $.widget("mobile.collapsible", $.mobile.collapsible, {

        _create: function () {
            // calling parent's ``_create` method
            this._super();

            var ui = this._ui;

            // removing existing click handler from the heading
            this._off(ui.heading, "click");

            // attaching click handler only on the heading
            this._on(ui.heading, {
                "click": function (event) {
                    var $target = $(event.target);
                    if ($target.hasClass("ui-collapsible-heading") || $target.hasClass("ui-collapsible-heading-toggle") || $target.attr("role") === "heading") {
                        this._handleExpandCollapse(!ui.heading.hasClass("ui-collapsible-heading-collapsed"));
                    }
                    event.preventDefault();
                    event.stopPropagation();
                }
            });
        },

        _enhance: function (elem, ui) {
            // callind parent's `_enhance` method
            this._super(elem, ui);

            ui.heading.on("flipswitchcreate", function () {
                // aligning flipswitches to the right after initialization
                ui.heading.find(".ui-flipswitch").addClass('ui-btn-right')
            });

            // setting controlgroup divs' margin to 0 
            ui.heading
                .children()
                .find(":jqmData(role='controlgroup')")
                .css('margin', '0')

            return ui;
        },

    });

})(jQuery);