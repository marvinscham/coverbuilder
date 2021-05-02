const colorThief = new ColorThief();

function renewReflection() {
    setTimeout(function () {
        var ref = document.getElementById("reflection");
        var img = document.getElementById("img");
        var container = document.getElementById("container");

        ref.style.width = img.offsetWidth + "px";
        ref.style.marginLeft = container.offsetWidth / 2 - img.offsetWidth / 2 + "px";
        img.style.marginLeft = container.offsetWidth / 2 - img.offsetWidth / 2 + "px";
        reload_palette();
    }, 100);
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

function reload_palette() {
    const img = document.getElementById("img");
    var dc = [0, 0, 0];
    var palette = [[0, 0, 0]];

    if (img.complete) {
        dc = colorThief.getColor(img);
        palette = colorThief.getPalette(img);
    } else {
        img.addEventListener('load', function () {
            dc = colorThief.getColor(img);
            palette = colorThief.getPalette(img);
        })
    }

    document.getElementById("dc").style.backgroundColor = rgbToHex(dc[0], dc[1], dc[2]);
    document.getElementById("dc").title = rgbToHex(dc[0], dc[1], dc[2]);
    img.style.borderColor = rgbToHex(dc[0], dc[1], dc[2]);

    var tag;
    var el = document.getElementById("palette");
    el.innerHTML = "";

    palette.forEach(function (a) {
        tag = document.createElement("div");
        tag.classList.add("col");
        tag.style.backgroundColor = rgbToHex(a[0], a[1], a[2]);
        tag.title = rgbToHex(a[0], a[1], a[2]);
        el.appendChild(tag);
    });

    var cols = document.getElementsByClassName("col");
    [...cols].forEach(function (c) {
        c.addEventListener('click', function () {
            copyToClipboard(c.title);
            img.style.borderColor = c.title;
        });
    });
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

//##########################################################################################################################

renewReflection();