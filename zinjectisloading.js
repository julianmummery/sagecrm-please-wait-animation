var elapsed = null;
var isLoadingEnabled = false;

function addOnloadHandler(newFunction){
	if (window.addEventListener) { 
		window.addEventListener('load', newFunction, false);
	}
	else if (window.attachEvent){
		window.attachEvent('onload', newFunction);
	}
}

function tick(){
    ++seconds;
    var secs = seconds;
    var hrs = Math.floor( secs / 3600 );
    secs %= 3600;
    var mns = Math.floor( secs / 60 );
    secs %= 60;
    elapsed = ( hrs < 10 ? "0" : "" ) + hrs + ":" + ( mns < 10 ? "0" : "" ) + mns + ":" + ( secs < 10 ? "0" : "" ) + secs;

	$('#elapsedTime').html(elapsed);
}


// All pages need the navigation catered for
addOnloadHandler(runLoaderAnimNav);

// Do not activate the loading animation if on any of the following pages
//
// ACT=6001 - Dashboard
// ACT=6003 - 
if ((window.location.href.indexOf("Act=6001") > -1) || (window.location.href.indexOf("Act=6003") > -1) || (window.location.href.indexOf("InteractiveDashboard") > -1)) {}
else {
	addOnloadHandler(runLoaderAnim);
}

//addOnloadHandler(rebindOnClickToJQuery);
//function rebindOnClickToJQuery() {
//	$('[onclick]').each(function() {
//		var handler = $(this).prop('onclick');
//		$(this).removeProp('onclick');
//		$(this).click(handler);
//	});		
//}

// Only run when web browser has fully loaded the page!
function runLoaderAnimNav(){
	if ( $('.TABON').length ) {
		$('.TABON').click(function() {
			isLoadingEnabled = true;			
			$.isLoading({ text: "Processing, Please Wait.<br><div class='elapsedText'>Elapsed Time: <span id='elapsedTime'>00:00:00</span></div>" });
		});
	}

	if ( $('.TABOFF').length ) {
		$('.TABOFF').click(function() {
			isLoadingEnabled = true;			
			$.isLoading({ text: "Processing, Please Wait.<br><div class='elapsedText'>Elapsed Time: <span id='elapsedTime'>00:00:00</span></div>" });
		});
	}
	
	//$("body").append("<script>$.isLoading({ text: \"Processing, Please Wait.<br><div class='elapsedText'>Elapsed Time: <span id='elapsedTime'>00:00:00</span></div>\" });</script>");
}


// Only run when web browser has fully loaded the page!
function runLoaderAnim(){
	//
	// TODO: #buttonchange password
	//
	// #=ID, .=Class
	if ( $('a').length ) {
		$('a:not(#Button_Help, #Button_AboutCRM, .sf-with-ul, .er_profile_link, #sub-menu-Configure, #EWARE_BIN)').click(function() {
			isLoadingEnabled = true;
			$.isLoading({ text: "Processing, Please Wait.<br><div class='elapsedText'>Elapsed Time: <span id='elapsedTime'>00:00:00</span></div>" });
		});
	}
	
	if ( $('.MENUITEM').length ) {
		$('.MENUITEM').click(function() {
			isLoadingEnabled = true;
			$.isLoading({ text: "Processing, Please Wait.<br><div class='elapsedText'>Elapsed Time: <span id='elapsedTime'>00:00:00</span></div>" });
		});
	}	
	
	if ( $('.RECENTITEM ui-crmPopup-trigger').length ) {
		$('.ui-crmPopup-trigger').click(function() {
			isLoadingEnabled = true;
			$.isLoading({ text: "Processing, Please Wait.<br><div class='elapsedText'>Elapsed Time: <span id='elapsedTime'>00:00:00</span></div>" });
		});
	}	

		
	if ( $('.MENUPOPUPITEMSpan').length ) {
		$('.MENUPOPUPITEMSpan').click(function() {
			isLoadingEnabled = true;
			$.isLoading({ text: "Processing, Please Wait.<br><div class='elapsedText'>Elapsed Time: <span id='elapsedTime'>00:00:00</span></div>" });
		});
	}	
	
	
	// RECENTITEM ui-crmPopup-trigger
	
	// Looks a bit choppy when implemented
	//if ( $('.MENUADMINTEXT').length ) {
	//	$('.MENUADMINTEXT').click(function() {
	//		$.isLoading({ text: "Processing, Please Wait.<br><div class='elapsedText'>Elapsed Time: <span id='elapsedTime'>00:00:00</span></div>" });
	//	});
	//}		
	

	//$("body").append("<script>$.isLoading({ text: \"Processing, Please Wait . . .&nbsp;&nbsp;&nbsp;\" });</script>");

	// $body = $("body");

	// $(document).on({
		// ajaxStart: function() { $("body").append("<script>$.isLoading({ text: \"Processing, Please Wait . . .&nbsp;&nbsp;&nbsp;\" });</script>");    },
		// ajaxStop: function() { $.isLoading( "hide" ); }    
	// });

	$("body").append("<script>$.isLoading({ text: \"Processing, Please Wait.<br><div class='elapsedText'>Elapsed Time: <span id='elapsedTime'>00:00:00</span></div>\" });</script>");
}

