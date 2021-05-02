const colorThief = new ColorThief();

function renew() {
    setTimeout(function () {
        adjustReflection();
        getAndSetColors();
    }, 100);
}

function adjustReflection() {
    var ref = document.getElementById("reflection");
    var img = document.getElementById("img");
    var container = document.getElementById("container");

    ref.style.width = img.offsetWidth + "px";
    ref.style.marginLeft = container.offsetWidth / 2 - img.offsetWidth / 2 + "px";
    img.style.marginLeft = container.offsetWidth / 2 - img.offsetWidth / 2 + "px";
}

function copyToClipboard(string) {
    var el = document.createElement('textarea');
    el.value = string;
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(el);
}

function getAndSetDominantColor() {
    const img = document.getElementById("img");
    var rgbCol;

    if (img.complete) {
        rgbCol = colorThief.getColor(img);
    } else {
        img.addEventListener('load', function () {
            rgbCol = colorThief.getColor(img);
        });
    }

    var hexCol = rgbToHex(rgbCol[0], rgbCol[1], rgbCol[2]);
    var dc = document.getElementById("dc");

    dc.style.backgroundColor = hexCol;
    dc.title = hexCol;
    img.style.borderColor = hexCol;
}

function getAndSetPalette() {
    const img = document.getElementById("img");
    var tag, rgbCols, hexCol;
    var palette = document.getElementById("palette");

    palette.innerHTML = "" // Remove old palette

    if (img.complete) {
        rgbCols = colorThief.getPalette(img);
    } else {
        img.addEventListener('load', function () {
            rgbCols = colorThief.getPalette(img);
        });
    }

    rgbCols.forEach(function (c) {
        hexCol = rgbToHex(c[0], c[1], c[2]);

        tag = document.createElement("div");
        tag.classList.add("col");
        tag.style.backgroundColor = hexCol;
        tag.title = hexCol;
        palette.appendChild(tag);
    });

    var cols = document.getElementsByClassName("col");
    [...cols].forEach(function (co) {
        co.addEventListener('click', function () {
            copyToClipboard(co.title);
            img.style.borderColor = co.title;
        });
    });
}

function getAndSetColors() {
    getAndSetDominantColor();
    getAndSetPalette();
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

//##########################################################################################################################

renew();