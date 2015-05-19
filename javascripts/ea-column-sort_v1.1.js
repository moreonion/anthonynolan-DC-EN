function sortTwoColumn() {

	if ( $('.eaFormTwoColumn').length != 0 )  { $(".eaform").show();  return; }
	if ( $('.eaRightColumnContent').length == 0 ) { $(".eaform").show(); return; }
	

    var main_wrap_count, replacement_div, left_wrapper, right_wrapper, valid_classes, firsttime, previous, skip;
	
	main_wrap_count=0;
    replacement_div=jQuery('<div/>', {
        id: 'replacement_div'
	}).addClass("en_wrapper");

	left_wrapper=jQuery('<div/>', {
		id: 'left_wrapper' + main_wrap_count
	}).addClass("en_left_wrapper");

	right_wrapper=jQuery('<div/>', {
		id: 'right_wrapper' + main_wrap_count
	}).addClass("en_right_wrapper");

    valid_classes=[".eaFullWidthContent", ".eaTwoColumnFiller", ".eaLeftColumnContent", ".eaLeftColumnFiller", ".eaRightColumnContent", ".eaRightColumnFiller"];

	firsttime=true;
    previous="";
    skip=false;
	

    $(".eaform").find( valid_classes.toString() ).each(function (index, value) {

        var add_to_right=false;
        var this_classname=$(this).attr("class");

		{


            if (( ( firsttime && ($(this).hasClass("eaLeftColumnContent")||$(this).hasClass("eaLeftColumnFiller")) ) || previous == "eaFullWidthContent" || previous == "eaTwoColumnFiller"  )
				&& ( ($(this).next().hasClass("eaLeftColumnContent") || $(this).next().hasClass("eaLeftColumnFiller") ) || ( $(this).next().hasClass("eaRightColumnContent") || $(this).next().hasClass("eaRightColumnFiller") ) )
	

            ) {
                main_wrap_count++;
                left_wrapper=jQuery('<div/>', {
                    id: 'left_wrapper' + main_wrap_count
                }).addClass("en_left_wrapper");

                right_wrapper=jQuery('<div/>', {
                    id: 'right_wrapper' + main_wrap_count
                }).addClass("en_right_wrapper");
                skip=false;
				firsttime=false;				

            } else {
                skip=true;
            }


            if (this_classname == "eaFullWidthContent" || this_classname == "eaTwoColumnFiller") {
                if (previous == "" || (previous == "eaFullWidthContent" || previous == "eaTwoColumnFiller")) {
                    replacement_div.append($(this));
                } else {
                    add_to_right=true;
                }

            } else if (this_classname == "eaLeftColumnContent" || this_classname == "eaLeftColumnFiller") {
                left_wrapper.append($(this));
            } else if (this_classname == "eaRightColumnContent" || this_classname == "eaRightColumnFiller") {
                right_wrapper.append($(this));
            }


            if (add_to_right) {
                replacement_div.append($(this));
            } else if (!skip) {
                left_wrapper.appendTo(replacement_div);
                right_wrapper.appendTo(replacement_div);
            }


            previous=this_classname;

        }
    });


    $(".eaSubmitResetButtonGroup").before(replacement_div);
	$(".eaform").show();

}