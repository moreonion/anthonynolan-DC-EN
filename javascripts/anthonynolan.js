$(window).load(function(){
  // two column layout
  sortTwoColumn();
  $('.eaSubmitResetButtonGroup').appendTo($('.eaFormField').last().parent());
  $('body').addClass('twocolumn');

  // hacky
  // EN buts &nbsp; after the .eaQuestionCheckbox (for whatever reason)
  // and these need to be deleted for css styling (otherwise some myterious
  // "margin" appears at the bottom)
  var checkbox = $('.eaQuestionCheckbox');
  var parent = checkbox.parent();
  parent.html('');
  parent.html(checkbox);

  // move validation icon next to label
  // and the error message below the label
  $('.eaErrorMessage').each(function() {
    var self = $(this);
    var label = self.siblings('.eaFormElementLabel');
    var field = self.siblings('.eaFormField');
    var icon = $('.eaValidationIcon', label.parent());
    icon.appendTo(label);
    self.appendTo(field);
  });

  // add class to field, where error occured
  $(window).on('DOMSubtreeModified', '.eaErrorMessage', function(e) {
    var self = $(e.target);
    if (!self.is(':empty')) {
      self.closest('.eaFormField').addClass('validationError');
    }
  });
  // enable Picker and Selector
  // see http://www.benplum.com/formstone/
  if (typeof $.fn.picker == 'function') {
    $('input[type=radio], input[type=checkbox]').picker();
  }


  // change labels to placeholders if they are supported
  // and mark that we did so by setting a class on the body
  $("form :input[type='text']").each(function(index, elem) {
    var eId = $(elem).attr("id");
    var label = null;
    if (eId && (label = $(elem).parents("form").find("label[for="+eId+"]")).length == 1) {
      $(elem).attr("placeholder", $(label).text());
      $(label).addClass('label-to-placeholder');
    }
    $('body').addClass('labels-to-placeholders');
  });
  // call jquery.placeholder plugin to fake placeholder for IE 9
  $('input, textarea').placeholder();

  // configure progressbar = thermometer = counter
  var $thermometerEl = $('.pgbar-thermometer');
  var thermometerTarget = 250; // default
  var thermometerStart = 0; // default
  // read target value from data-target
  var thermometerDataTarget = $thermometerEl.data('target');
  if (typeof thermometerDataTarget !== 'undefined') {
    var parsedTarget = parseInt(thermometerDataTarget, 10);
    if (!isNaN(parsedTarget) && parsedTarget > 0) {
      thermometerTarget = parsedTarget;
    }
  }
  // read start value from data-start
  var thermometerDataStart = $thermometerEl.data('start');
  if (typeof thermometerDataStart !== 'undefined') {
    var parsedStart = parseInt(thermometerDataStart, 10);
    if (!isNaN(parsedStart) && parsedStart > 0) {
      thermometerStart = parsedStart;
    }
  }
  // initialize eActivistThermometer
  $thermometerEl.eActivistThermometer({
    token: '5492e5df-ba39-41e6-b76c-768212a7bf38',
    campaignId: $('input[name="ea.campaign.id"]').val(),
    target: thermometerTarget,
    initialValue: thermometerStart,
    service: 'EaEmailAOTarget',
    targetDataColumn: 'participatingSupporters'
  });

  // get the XML from the data service
  // BEWARE: you have to prevent a cross-origin request because getting XML
  // from a server which does not send any Accept-* headers will not work
  // accross origins
  //
  // then filter the XML document by the selected constiuency to get the needed
  // data
  var contacts = $('#select_contacts_containerDiv .eaContactOrgContainer');
  var referenceResult = "";
  var dataServiceUrl = '/ea-dataservice/data.service?service=EaReferenceData&token=5492e5df-ba39-41e6-b76c-768212a7bf38&referenceDataName=Donor%20numbers';
  if (contacts.length > 0) {
    $.ajax({
      method: 'GET',
      url: dataServiceUrl,
      dataType: 'xml',
      success: function (data, status, jqxhr) {
        var constituency = $.trim(contacts.first().text());
        var referenceResult1 = $(data).find("[name=organization]").filter(function() {return $(this).text() == constituency} ).parent().find("[name=COLUMN1]").text();
        var referenceResult2 = $(data).find("[name=organization]").filter(function() {return $(this).text() == constituency} ).parent().find("[name=COLUMN2]").text();
        var referenceResult3 = $(data).find("[name=organization]").filter(function() {return $(this).text() == constituency} ).parent().find("[name=COLUMN3]").text();
        var referenceResult4 = $(data).find("[name=organization]").filter(function() {return $(this).text() == constituency} ).parent().find("[name=COLUMN4]").text();
        $('.reference-data-container.column1').text(referenceResult1);
        $('.reference-data-container.column2').text(referenceResult2);
        $('.reference-data-container.column3').text(referenceResult3);
        $('.reference-data-container.column4').text(referenceResult4);
      }
    });
  }
});
