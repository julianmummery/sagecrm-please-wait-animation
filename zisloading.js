// JM - Stop the isLoading animation very shortly after the page has finished loading.
function addOnloadHandler(newFunction){
	if (window.addEventListener) { 
		window.addEventListener('load', newFunction, false);
	}
	else if (window.attachEvent){
		window.attachEvent('onload', newFunction);
	}
}

function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

function stopLoadingAnim() {

	// Get the body element for use with taking away the blur
	var body=document.getElementsByTagName('body')[0];

	// Hide animation
	setTimeout( function(){$.isLoading( "hide" );clearInterval(ticker);elapsed=0;injectStyles('body{-moz-filter: blur(0px) !important; -o-filter: blur(0px) !important; -ms-filter: blur(0px) !important; filter: blur(0px) !important; -webkit-animation: none;}');}, 0 );	
}

function injectStyles(rule) {
  var div = $("<div />", {
    html: '<style>' + rule + '</style>'
  }).appendTo("body");    
}

loadjscssfile("../js/custom/isloading/font-awesome.min.css", "css");
loadjscssfile("../js/custom/isloading/isloading.css", "css");
	
// Do not activate the loading animation if on any of the following pages
//
// ACT=6001 - Dashboard
if ((window.location.href.indexOf("Act=6001") > -1) || (window.location.href.indexOf("Act=6003") > -1) || (window.location.href.indexOf("InteractiveDashboard") > -1)) {
	// Do Nothing
}
else {
	// Dynamically load and add .css file 
	//loadjscssfile("../js/custom/isloading/font-awesome.min.css", "css");
	//loadjscssfile("../js/custom/isloading/isloading.css", "css");
	addOnloadHandler(stopLoadingAnim);
}
 
var seconds = null;
var ticker = null;

function startTimer()
{
    seconds = -1;
    ticker = setInterval(tick, 1000);
    tick();
}

;(function ( $, window, document, undefined ) {
    // Create the defaults once
    var pluginName = "isLoading",
        defaults = {
            'position': "right",        // right | inside | overlay
            'text': "",                 // Text to display next to the loader
            'class': "fa fa-refresh",   // loader CSS class
            'transparency': 0.3,        // background transparency for using with overlay
            'tpl': '<span class="isloading-wrapper %wrapper%">%text%<i class="%class% fa-spin"></i><div class="dismissText"><a href="#" class="likkleLink" onclick="javascript:stopLoadingAnim();" id="linkDismiss">Dismiss</a></div></span>',    // loader base Tag. Change to support bootstrap > 3.x
            'disableSource': true,      // true | false
            'disableOthers': []
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // Merge user options with default ones
        this.options 		= $.extend( {}, defaults, options );
        this._defaults     	= defaults;
        this._name         	= pluginName;
        this._loader       	= null; // Contain the loading tag element
        this.init();
    }

    // Contructor function for the plugin (only once on page load)
    function contruct() {
        if ( !$[pluginName] ) {
            $.isLoading = function( opts ) {
				if (isLoadingEnabled) {
					$( "body" ).isLoading( opts );					
				}
                //$( "body" ).isLoading( opts );
            };
			//startTimer();
		}
    }

    Plugin.prototype = {

        init: function() {
			
			startTimer(); // Starts the elapsed time ticker
			
            if( $( this.element ).is( "body") ) {
                this.options.position = "overlay";
            }
            this.show();
        },

        show: function() {
				
            var self = this,
                tpl = self.options.tpl.replace( '%wrapper%', ' isloading-show ' + ' isloading-' + self.options.position );
            tpl = tpl.replace( '%class%', self.options['class'] );
            tpl = tpl.replace( '%text%', ( self.options.text !== "" ) ? self.options.text + ' ' : '' );
            self._loader = $( tpl );

            // Disable the element
            if( $( self.element ).is( "input, textarea" ) && true === self.options.disableSource ) {

                $( self.element ).attr( "disabled", "disabled" );

            }
            else if( true === self.options.disableSource ) {

                $( self.element ).addClass( "disabled" );

            }

            // Set position
            switch( self.options.position ) {

                case "inside":
                    $( self.element ).html( self._loader );
                    break;

                case "overlay":
                    var $wrapperTpl = null;

                    if( $( self.element ).is( "body") ) {
                        $wrapperTpl = $('<div class="isloading-overlay" style="position:fixed; left:0; top:0; z-index: 10000; background: rgba(0,0,0,' + self.options.transparency + '); width: 100%; height: ' + $(window).height() + 'px;" />');
                        $( "body" ).prepend( $wrapperTpl );

                        $( window ).on('resize', function() {
                            $wrapperTpl.height( $(window).height() + 'px' );
                            self._loader.css({top: ($(window).height()/2 - self._loader.outerHeight()/2) + 'px' });
                        });
                    } else {
                        var cssPosition = $( self.element ).css('position'),
                            pos = {},
                            height = $( self.element ).outerHeight() + 'px',
                            width = $(self.element).css("width"); // $( self.element ).outerWidth() + 'px;

                        if( 'relative' === cssPosition || 'absolute' === cssPosition) {
                            pos = { 'top': 0,  'left': 0 };
                        } else {
                            pos = $( self.element ).position();
                        }
                        $wrapperTpl = $('<div class="isloading-overlay" style="body.style.filter=\'blur(0px)\';body.style.webkitFilter=\'blur(0px)\';body.style.mozFilter=\'blur(0px)\';body.style.oFilter=\'blur(0px)\';body.style.msFilter=\'blur(0px)\';position:absolute; top: ' + pos.top + 'px; left: ' + pos.left + 'px; z-index: 10000; background: rgba(0,0,0,' + self.options.transparency + '); width: ' + width + '; height: ' + height + ';" />');
                        $( self.element ).prepend( $wrapperTpl );

                        $( window ).on('resize', function() {
                            $wrapperTpl.height( $( self.element ).outerHeight() + 'px' );
                            self._loader.css({top: ($wrapperTpl.outerHeight()/2 - self._loader.outerHeight()/2) + 'px' });
                        });
                    }

                    $wrapperTpl.html( self._loader );
                    self._loader.css({top: ($wrapperTpl.outerHeight()/2 - self._loader.outerHeight()/2) + 'px' });
                    break;

                default:
                    $( self.element ).after( self._loader );
                    break;
            }

            self.disableOthers();
        },

        hide: function() {

            if( "overlay" === this.options.position ) {

                $( this.element ).find( ".isloading-overlay" ).first().remove();

            } else {

                $( this._loader ).remove();
                $( this.element ).text( $( this.element ).attr( "data-isloading-label" ) );

            }

            $( this.element ).removeAttr("disabled").removeClass("disabled");

            this.enableOthers();
        },

        disableOthers: function() {
            $.each(this.options.disableOthers, function( i, e ) {
                var elt = $( e );
                if( elt.is( "button, input, textarea" ) ) {
                    elt.attr( "disabled", "disabled" );
                }
                else {
                    elt.addClass( "disabled" );
                }
            });
        },

        enableOthers: function() {
            $.each(this.options.disableOthers, function( i, e ) {
                var elt = $( e );
                if( elt.is( "button, input, textarea" ) ) {
                    elt.removeAttr( "disabled" );
                }
                else {
                    elt.removeClass( "disabled" );
                }
            });
        }
    };

    // Constructor
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( options && "hide" !== options || !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            } else {
                var elt = $.data( this, "plugin_" + pluginName );

                if( "hide" === options )    { elt.hide(); }
                else                        { elt.show(); }
            }
        });
    };

    contruct();

})( jQuery, window, document );