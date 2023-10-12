$(document).ready(function () {
    // Populate the provinces dropdown on page load
    $.ajax({
        url: "https://psgc.gitlab.io/api/island-groups/luzon/provinces/",
        type: "GET",
        success: function (data) {
            var options = JSON.parse(data);
            var dropdown = $("#provinces_drop_down");

            $.each(options, function (index, value) {
                dropdown.append("<option value='" + value.code + "'>" + value.name + "</option>");
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error:', errorThrown);
        }
    });

    // Detect when the provinces dropdown changes and populate the cities dropdown
    $("#provinces_drop_down").change(function () {
        var provinceCode = $(this).val();

        var citiesDropdown = $("#cities_municipalities_drop_down");

        $.ajax({
            url: "https://psgc.gitlab.io/api/provinces/" + provinceCode + "/cities-municipalities/",
            type: "GET",
            success: function (data) {
                var options = JSON.parse(data);
                citiesDropdown.empty(); // clear the cities dropdown

                $.each(options, function (index, value) {
                    citiesDropdown.append("<option value='" + value.code + "'>" + value.name + "</option>");
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error:', errorThrown);
            }
        });
    });
});
