!function(){var t,e=document.querySelector("[data-start]"),a=document.querySelector("[data-stop]"),d=document.body;e.addEventListener("click",(function(){e.disabled=!0,a.disabled=!1,t=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,"0"));d.style.backgroundColor=t}),1e3)})),a.addEventListener("click",(function(){e.disabled=!1,a.disabled=!0,clearInterval(t)}))}();
//# sourceMappingURL=01-color-switcher.e965c5f4.js.map