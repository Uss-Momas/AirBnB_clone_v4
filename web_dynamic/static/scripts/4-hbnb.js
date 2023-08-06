$(document).ready(function () {
  let checkedItems = {};
  $(".amenities .popover li input").on("change", function () {
    const checkedCheckbox = $(".amenities .popover ul").find(
      "input[type='checkbox']"
    );

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
    "http://172.24.73.209:5001/api/v1/status/",
    function (data, textStatus) {
      if (textStatus === "success") {
        if (data.status === "OK") $("div#api_status").addClass("available");
        else $("div#api_status").removeClass("available");
      }
    }
  );

  $.ajax({
    url: "http://172.24.73.209:5001/api/v1/places_search/",
    type: "POST",
    data: JSON.stringify({}),
    headers: { "Content-Type": "application/json" },
    success: function (response) {
      response.forEach(function (place) {
        $("section.places").append(
          "<article><h2>" +
            place.name +
            '</h2><div class="price_by_night"><p>$' +
            place.price_by_night +
            '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' +
            place.max_guest +
            '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' +
            place.number_rooms +
            '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' +
            place.number_bathrooms +
            '</p></div></div><div class="description"><p>' +
            place.description +
            "</p></div></article>"
        );
      });
    },
  });

  $(".filters > button").click(function () {
    $(".places > article").remove();
    $.ajax({
      url: "http://172.24.73.209:5001/api/v1/places_search/",
      type: "POST",
      data: JSON.stringify({"amenities": Object.keys(checkedItems)}),
      headers: { "Content-Type": "application/json" },
      success: function (response) {
        response.forEach(function (place) {
          $("section.places").append(
            "<article><h2>" +
              place.name +
              '</h2><div class="price_by_night"><p>$' +
              place.price_by_night +
              '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' +
              place.max_guest +
              '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' +
              place.number_rooms +
              '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' +
              place.number_bathrooms +
              '</p></div></div><div class="description"><p>' +
              place.description +
              "</p></div></article>"
          );
        });
      },
    });
  });
});
