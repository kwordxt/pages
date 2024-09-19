function checkURL() {
    const url = window.location.href;
    const containsSurge = url.includes("surge");
    const containsLocalhost = url.includes("5500");

    if (containsSurge || containsLocalhost) {
        return true;
    } else {
        return false;
    }
}

if (checkURL()) {
    let isHovered = false;
    let hoveredIteration = 0;
    const yDelay = 3000;

    document.addEventListener("DOMContentLoaded", (event) => {


        const outHandler = (el) => {
            isHovered = false;
            hoveredIteration++;
            hideAdunit(el, 1000, hoveredIteration);
        }

        const inHandler = () => {
            isHovered = true;
        }

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
            return (topAd50 < scrollBottom) && (topAd50 > scrollTop)
        }

        function getBottom(element) {
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const bottomPosition = rect.bottom + scrollTop;
            return bottomPosition;
        }

        function insertAdunits(y, i) {
            const y_ad = document.createElement("div");
            y_ad.setAttribute("data-yeindex", i);
            y_ad.style.width = "300px";
            y_ad.classList.add("y_adunit_container");
            y_ad.addEventListener("mouseleave", function () {
                outHandler(this);
            });
            y_ad.addEventListener("mouseenter", function () {
                inHandler(this);
            });

            const img = document.createElement("img");
            img.setAttribute("class", "ye_image")
            img.src = y.getAttribute('data-img');
            y_ad.appendChild(img);
            document.body.appendChild(y_ad)
            y_ad.style.top = getBottom(y) + "px";
            if (isMobileDevice()) {
                y_ad.style.left = "50%"
            }
            else {
                y_ad.style.left = getCenterPosition(y) + "px"
            }
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
    border:1px solid #EEBE31;
}
.y_adunit_container, y_adunit_container *{
    pointer-events:none;
}
.y_adunit_container.y_visible, y_adunit_container.y_visible *{
    pointer-events:all;
}
.ye_image{
    display:block;
    width:100%;
}
.y_visible{
    opacity:1;
    cursor:pointer;
}
y{
    position: relative;
    z-index: 999;
    padding: 0 30px 0 5px;
    background-color: #EEBE3150;
    cursor: pointer;
}
.y_adunit_container:before{
    content:"";
    display:block;
    position:absolute;
    top:4px;
    right:4px;
    width:15px;
    height:15px;
    background-image: url('adchoice.png');
    background-position:center;
    background-size:cover;
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


        [...document.querySelectorAll("y")].forEach((y, i) => {
            insertAdunits(y, i)
            y.addEventListener("mouseenter", (e) => {

                document.querySelectorAll(".y_adunit_container")[i].classList.add("y_visible");
                hideAdunit(document.querySelectorAll(".y_adunit_container")[i], 1000, hoveredIteration)
            })
        })

        const hide = (adunit, iteration, isFirstInteraction) => {
            if ((!isHovered && iteration == hoveredIteration) || isFirstInteraction) {
                adunit.classList.remove("y_visible");
            }
        }

        const hideAdunit = (adunit, delay, iteration, isFirstInteraction) => {
            setTimeout(() => {
                hide(adunit, iteration, isFirstInteraction)
            }, delay);
        };
        function handleFirstInteraction() {
            let delay = 1500;
            [...document.querySelectorAll(".y_visible")].forEach(adunit => {
                if (isElementVisible50(adunit)) {
                    hideAdunit(adunit, delay, 0, true)
                }
            })
        }
        window.addEventListener('scroll', handleFirstInteraction);
        function handleTouchStart(event, tolerance) {
            var touch = event.touches[0];
            var touchY = touch.clientY;

            var yElements = document.querySelectorAll("y");

            yElements.forEach(function (yElement, i) {
                var yElementRect = yElement.getBoundingClientRect();
                var yElementTop = yElementRect.top;
                var yElementBottom = yElementRect.bottom;

                if (Math.abs(touchY - yElementTop) <= tolerance || Math.abs(touchY - yElementBottom) <= tolerance) {
                    var correspondingAdunit = document.querySelector(".y_adunit_container[data-yeindex='" + i + "']");
                    correspondingAdunit.classList.add('y_visible');
                    hideAdunit(correspondingAdunit, 1000, 0, true)
                    
                }
            });
        }


        document.addEventListener('touchstart', function (event) {
            handleTouchStart(event, 30);
        });


        [...document.querySelectorAll("y")].forEach((y, i) => {
            document.querySelectorAll(".y_adunit_container")[i].addEventListener("click", () => {
                const redirect = y.getAttribute("data-redirect")
                window.open(redirect)
            })
        })
    })

}