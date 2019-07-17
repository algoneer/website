(function(){

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    
    var bannerCookieName = "banner-choice"
    
    window.addEventListener('load', function(){
        var banner = document.getElementById("banner")
        var cookie = getCookie(window.bannerCookieName || bannerCookieName)
        if (cookie !== null){
            banner.remove()
        } else {
            banner.style.display = 'block'
        }
    })

    window.banner = {
        close: function(){
            setCookie(window.bannerCookieName || bannerCookieName, "close", 1200)
            updateCookieNotice("declined")
            var banner = document.getElementById("banner")
            banner.remove()
        }
    }
})()
