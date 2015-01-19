(function( $, undefined ) {

var optHeading = $.mobile.collapsible.prototype.options.heading;

$.widget( "mobile.collapsible", $.mobile.collapsible, {
    
	options: {
		heading: optHeading + ",:jqmData(role='header')"
	},
    
    _childWidgets: [ "toolbar" ],

	_create: function() {
        // Calling parent's _create method
        this._super();
        
        var ui = this._ui;
        
        // removing click handler from heading
        this._off( ui.heading, "click" );
        
        // attaching custom click handler on heading
        this._on( ui.heading, {
			"click": function( event ) {
                var $target = $(event.target);
                if ($target.hasClass("ui-collapsible-heading") || $target.hasClass("ui-collapsible-heading-toggle") || $target.attr("role") === "heading") {
                    this._handleExpandCollapse( !ui.heading.hasClass( "ui-collapsible-heading-collapsed" ) );
                }
				event.preventDefault();
				event.stopPropagation();
			}
		});
	},

	_enhance: function( elem, ui ) {
        $.each( this._childWidgets, $.proxy( function( number, widgetName ) {
            if ( $.mobile[ widgetName ] ) {
                this.element.find( $.mobile[ widgetName ].initSelector ).not( $.mobile.page.prototype.keepNativeSelector() )[ widgetName ]();
            }
        }, this ));
        
        this._super( elem, ui );
        
        if (ui.heading.is(":jqmData(role='header')")) {
            ui.anchor.children().unwrap();
        }
        
		return ui;
	},
    
	_handleExpandCollapse: function( isCollapse ) {
//        this._super(isCollapse)
		var opts = this._renderedOptions,
			ui = this._ui;

		ui.status.text( isCollapse ? opts.expandCueText : opts.collapseCueText );
		ui.heading
			.toggleClass( "ui-collapsible-heading-collapsed", isCollapse )
			.find( ".ui-collapsible-heading-toggle" )
			.toggleClass( "ui-icon-" + opts.expandedIcon, !isCollapse )

			// logic or cause same icon for expanded/collapsed state would remove the ui-icon-class
			.toggleClass( "ui-icon-" + opts.collapsedIcon, ( isCollapse || opts.expandedIcon === opts.collapsedIcon ) )
			.removeClass( $.mobile.activeBtnClass );

		this.element.toggleClass( "ui-collapsible-collapsed", isCollapse );
		ui.content
			.toggleClass( "ui-collapsible-content-collapsed", isCollapse )
			.attr( "aria-hidden", isCollapse )
			.trigger( "updatelayout" );
		this.options.collapsed = isCollapse;
		this._trigger( isCollapse ? "collapse" : "expand" );
	},
    
});

})( jQuery );