
//https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

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

function eraseCookie(name) {
    setCookie(name,"",-1)
}

var cookieName = "cookie-choice"

function getConsentCookie(){
    return getCookie(cookieName)
}

window.addEventListener('load', function(){
    var cookieNotice = document.getElementById("cookie-notice")
    var cookie = getConsentCookie()
    if (cookie !== null){
        if (cookie == "accepted")
            enableCookies()
        cookieNotice.remove() //user already agreed
    } else {
        cookieNotice.style.display = 'block'
    }
    updateCookieNotice(cookie)

    if (typeof preCookieLoad === "function")
        preCookieLoad()
})

function updateCookieNotice(cookie){

    var cookieChoice = document.getElementById('cookie-choice')
    var acceptCookies = document.getElementById('accept-cookies')
    var declineCookies = document.getElementById('decline-cookies')

    if (cookieChoice === null)
        return

    var classNoChoice = cookieChoice.dataset.noChoiceClass
    var classDeclined = cookieChoice.dataset.declinedClass
    var classAccepted = cookieChoice.dataset.acceptedClass

    if (cookie != null){
        if (cookie == "accepted"){
            cookieChoice.innerHTML = cookieChoice.dataset.acceptedText
            if (classAccepted !== undefined)
                cookieChoice.classList.add(classAccepted)
            cookieChoice.classList.remove(classDeclined)
            cookieChoice.classList.remove(classNoChoice)
            if (declineCookies !== null){
                declineCookies.style.display = "inline"
            }
            if (acceptCookies !== null){
                acceptCookies.style.display = "none"
            }
        } else {
            cookieChoice.innerHTML = cookieChoice.dataset.declinedText
            if (classDeclined !== undefined)
                cookieChoice.classList.add(classDeclined)
            cookieChoice.classList.remove(classAccepted)
            cookieChoice.classList.remove(classNoChoice)
            if (declineCookies !== null){
                declineCookies.style.display = "none"
            }
            if (acceptCookies !== null){
                acceptCookies.style.display = "inline"
            }
        }
    } else {

        cookieChoice.innerHTML = cookieChoice.dataset.noChoiceText

        if (classNoChoice !== undefined)
            cookieChoice.classList.add(classNoChoice)
        cookieChoice.classList.remove(classAccepted)
        cookieChoice.classList.remove(classDeclined)
    }
}

function agreeToCookies(){
    var cookieNotice = document.getElementById("cookie-notice")
    if (cookieNotice !== null)
        cookieNotice.remove()
    setCookie(cookieName,"accepted",120)
    enableCookies()
    updateCookieNotice("accepted")
    return false
}

function declineCookies(){
    var cookieNotice = document.getElementById("cookie-notice")
    if (cookieNotice !== null)
        cookieNotice.remove()
    setCookie(cookieName,"declined",120)
    disableCookies()
    updateCookieNotice("declined")
    return false
}

function disableCookies(){
    //https://stackoverflow.com/questions/595228/how-can-i-delete-all-cookies-with-javascript
    //this is not able to delete HTTP-Only cookies (which we do not set though)
    var cookies = document.cookie.split(";")
    console.log("Disabling cookies...")
    for (var i = 0; i < cookies.length; i++)
      eraseCookie(cookies[i].split("=")[0]);
    //we still maintain the local cookie
    setCookie(cookieName,"declined",120)
}

function enableCookies(){
    var scripts = document.getElementsByTagName("script")
    for(var i=0;i<scripts.length;i++){
        var script = scripts[i]
        var parent = script.parentElement
        //we remove and add it again to trigger a re-execution
        if (script.type == "text/javascript-opt-in"){
            parent.removeChild(script)
            script.type = "text/javascript"
            parent.appendChild(script)
        }
    }
}
