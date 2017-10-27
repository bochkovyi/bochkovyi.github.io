$(function () {
    
    var currentPath = window.location.pathname.split("/");
    currentPath = currentPath[currentPath.length-1];

    jQuery.get("/nav.html", function(data) {
        $("#navbar").html(data);
        

        var foundElements = $("ul.nav > li > a[href='/" + currentPath + "']");
        if (foundElements.length > 0) {
            foundElements.addClass("entered");
        }
        
    });

    var $footer = $("#footer");
    if ($footer.length > 0) {
        jQuery.get("/footer.html", function(data) {
            data = data.replace("{{year}}", new Date().getFullYear());
            $footer.html(data);
            if (currentPath === "contacts.html") {
                $footer.find(".panel").html("");
            }
        });
    }
});