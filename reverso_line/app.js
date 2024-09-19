const redirect = "https://www.ikea.com/fr/fr/p/skogsta-ingolf-table-et-6-chaises-acacia-noir-s09482693/";
const logo = "logo_ikea.png"

const ad = `
<div style="width:300px;height:250px;cursor:pointer;position:relative;" onclick="window.open('${redirect}')">
<img class="y_logo" src="${logo}">
<img class="y_adchoice" src="adchoice.png">
<img src="ikea.jpg">
</div>
`

document.addEventListener("DOMContentLoaded", function() {
    tippy('y', {
        content: ad,
        placement: "bottom",
        arrow: false,
        interactive: true,
        allowHTML: true,
        delay: [0, 3000],
        theme: 'translucent',
      });

      Array.from(document.querySelectorAll("y")).forEach(y => {
        y.addEventListener("click", () => {
            window.open(redirect)
          })
      })
});

