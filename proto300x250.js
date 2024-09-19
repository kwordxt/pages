
function getCenterPosition(element) {
    var rect = element.getBoundingClientRect();
    var centerPosition = rect.left + (rect.width / 2);
    return centerPosition;
}

function isMobile() {
    return window.innerWidth <= 768;
}

function isElementVisible50(element) {
    var rect = element.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var scrollTop = window.scrollY;
    var scrollBottom = scrollTop + windowHeight;
    var topAd50 = (rect.top + window.scrollY) + (rect.height / 2)
    document.getElementById("scrolltop").innerHTML = scrollTop
    document.getElementById("scrollbottom").innerHTML = scrollBottom
    document.getElementById("topad").innerHTML = topAd50
    document.getElementById("isvisible").innerHTML = (topAd50 < scrollBottom) && (topAd50 > scrollTop)
    return (topAd50 < scrollBottom) && (topAd50 > scrollTop)
}

function isCursorOverElement(element) {
    var rect = element.getBoundingClientRect();
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    return (
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom
    );
}


function insertAdunits(y) {
    const y_ad = `
    <div onmouseleave="outHandler(this)" onmouseenter="inHandler(this)" class='y_adunit_container y_visible' onclick="window.open('${y.getAttribute("data-redirect")}')">
        <img src="${y.getAttribute('data-img')}">
    </div>
    `
    let tempElement = document.createElement('div');
    tempElement.innerHTML = y_ad;
    let realElement = tempElement.firstElementChild;
    if (isMobileDevice()) {
        realElement.style.left = "50%"
    }
    else {
        realElement.style.left = getCenterPosition(y) + "px"
    }
    y.insertAdjacentHTML('afterend', realElement.outerHTML);
}

function isMobileDevice() {
    return window.innerWidth <= 768;
}



const css = `
.y_adunit_container{
    position:absolute;
    transition-duration:0.3s;
    position: absolute;
    transition-duration: 0.3s;
    transform: translateX(-50%);
    opacity:0;
    pointer-events:none;
}
.y_visible{
    opacity:1;
    pointer-events:all;
    cursor:pointer;
}

y{
    position: relative;
    z-index: 999;
    padding: 0 30px 0 5px;
    background-color: #EEBE3150;
    cursor: pointer;
}
y:after{
    position: absolute;
    top: 50%;
    right: 6px;
    width: 15px;
    height: 15px;
    display: block;
    content: "";
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAADSklEQVRoge2av08aYRjHPxyCXAGxRENC0sRJFhMHXbXyDxDHpi52cjWNu+lujKtTu9h0NPgHUJ11MLro1MSESDRYBHp4BugA7+XuBO8HVo6Gz0K4940+X5/v830v5vU1m00EhfPFVWAdmMXbnAI7iZmjb+KBr9lsUjhfHAf2gff9qswlh8ByYubot9R+MIgioFXzPoDv+mxhFfja13J655NEayYGnXUJ7w+2HWYl6z2DwVCI1xgK8RpDIV5jpN8FdOPt1DbByDwAhfNFy/2uhfiDSSamf2jf7/NbKMWs2x/XM66tFYqlDd+D4bmei+kF10JGx5YAeFQugJYwyR99kaLc4EqIP5gkIKcAUO4OtOejpi69Jq6E6G2lFLPU1TzQX3u5EiJspVaODZ/9tJfj1NLbSq2eAPBYu0Rur4/G0rbSS/JHkeMZguE5gpF5GvUyauUYtXriKv0cC9HbSnTioZSD5AbQspdVIQE5xfjUtqF7kj9KKJYmFEsTCE07Lcu5EGGruprXEkv8NYOReUKxNOX8Fo162VJEo17mz+13lGKWRr1MQE7xZuIjcjzjWIijGdHbqlbKGdaEzeD59Iok1rROlK42qd7saaIflQtKV5uurOVIiN5WD/c/DWt6Yd3SKyCntNcOpZjVrGmmUth1UhbgUIiwVaNe1mwl0FutW3oJEWDsoBlhVSfYFqK31YPJVlpxul/eyV4juiE2W7NXbA+73lZyPGM5kJ3S61+eMbY7Imxll9c+HG11xJxWpavNrnvHkhtat8yHo1o90eYkGJl3PAfPYasjhkPwmSEFqOnSzJxe4p2s05qhKH/UEAx2sCVEb6tugy5QK8dawWZ71Uo5bS08uaJ12UwksWanLAOWQgyv7O0T2Ap9IpnTS39GjE9tI8czmtiAnCL27gtyPPMk3q2wnBEnthIodweEJ1eAp+lVK+Xw+aOMJTeQ2p/iPU1Qvdmj2ah07VgnLDuiPwTtZr/V4agUs9xefkApZrV9dTWPUsxy9+szlcKu4474rs8WmtbbvM9/83+toRCvMRTiNYZCvMZQiNeQaF1QGXROJWCn31W8ADvidtBPBvNSDcBhYuZoSczIMq0rQ4PGIa3aW/e1BIN88ewvNItDZjHoXy4AAAAASUVORK5CYII=);
    background-size: cover;
    transform: translate(0, -50%);
}
`;
const head = document.head || document.getElementsByTagName('head')[0];
const style = document.createElement('style');
head.appendChild(style);
style.type = 'text/css';
style.appendChild(document.createTextNode(css));


[...document.querySelectorAll("y")].forEach(y => {
    insertAdunits(y)
    y.addEventListener("mouseenter", (e) => {
        e.target.nextElementSibling.classList.add("y_visible");
    })
})


let timeoutID;

function outHandler(el) { 
    el.classList.remove("y_hold");
    hideAdunit(el, 3000);
}

function inHandler(el) {
    el.classList.add("y_hold");
    clearTimeout(timeoutID);
}

const hideAdunit = (adunit, delay) => {    
    timeoutID = setTimeout(() => {
        if(adunit.classList.contains("y_hold")) return;
        adunit.classList.remove("y_visible");
    }, delay);
};

function handleFirstInteraction() {
    let delay = 1500
    if(isMobile()) delay = 3000;
    [...document.querySelectorAll(".y_visible")].forEach(adunit => {
        if (isElementVisible50(adunit)) {
            hideAdunit(adunit, delay)
        }
    })
}
window.addEventListener('scroll', handleFirstInteraction);
handleFirstInteraction();


function handleTouchStart(event, tolerance) {
    var touch = event.touches[0];
    var touchY = touch.clientY;

    var yElements = document.querySelectorAll("y");

    yElements.forEach(function(yElement) {
        var yElementRect = yElement.getBoundingClientRect();
        var yElementTop = yElementRect.top;
        var yElementBottom = yElementRect.bottom;

        if (Math.abs(touchY - yElementTop) <= tolerance || Math.abs(touchY - yElementBottom) <= tolerance) {
            var adjacentAdUnitContainer = yElement.nextElementSibling;
            if (adjacentAdUnitContainer && adjacentAdUnitContainer.classList.contains('y_adunit_container')) {
                adjacentAdUnitContainer.classList.add('y_visible');
            }
        }
    });
}


document.addEventListener('touchstart', function(event) {
    handleTouchStart(event, 30);
});
