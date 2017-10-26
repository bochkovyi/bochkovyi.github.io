$(function () {

    jQuery.get("/nav.html", function(data) {
        $("#navbar").html(data);
        var currentPath = window.location.pathname.split("/");
        currentPath = currentPath[currentPath.length-1];

        var foundElements = $("ul.nav > li > a[href='/" + currentPath + "']");
        if (foundElements.length > 0) {
            console.log("test1")
            foundElements.addClass("entered");
        }
        
    });
});