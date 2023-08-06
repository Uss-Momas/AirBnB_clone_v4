$(document).ready(function () {
  $(".amenities .popover li input").on("change", function () {
    const checkedCheckbox = $(".amenities .popover ul").find(
      "input[type='checkbox']"
    );
    const checkedItems = {};
    checkedCheckbox.each(function () {
      if ($(this).is(":checked")) {
        checkedItems[$(this).attr("data-id")] = $(this).attr("data-name");
      } else {
        delete checkedItems[$(this).attr("data-id")];
      }
    });
    $(".amenities h4").text(Object.values(checkedItems).join(", "));
  });

  $.get(
    'http://172.24.73.209:5001/api/v1/status/',
    function (data, textStatus) {
      if (textStatus === 'success') {
        if (data.status === 'OK') $('div#api_status').addClass('available');
        else $('div#api_status').removeClass('available');
      }
    }
  );
});
