$(document).ready(function () {
  console.log('DOM Is Loaded');
  $('.amenities .popover li input').on('change', function () {
    const checkedCheckbox = $('.amenities .popover ul').find("input[type='checkbox']");
    const checkedItems = {};
    checkedCheckbox.each(function () {
      if ($(this).is(':checked')) { checkedItems[$(this).attr('data-id')] = $(this).attr('data-name'); } else { delete checkedItems[$(this).attr('data-id')]; }
    });
    $('.amenities h4').text(Object.values(checkedItems).join(', '));
  });
});
