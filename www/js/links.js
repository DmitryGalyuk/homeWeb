document.addEventListener("DOMContentLoaded", buildLinks);


function buildLinks() {
    const template = document.getElementById("templateLink");
    const container = document.getElementById("contentLink");
    fetch("resources.json")
        .then(response => response.json())
        .then(links => links.forEach(async element => {
            container.appendChild(await createButton(template, element));
        }));
}

async function createButton(template, link) {
    var clone = template.content.cloneNode(true);
    clone.id = "";
    clone.querySelector(".imgA").href = await processMacros(link.href);
    clone.querySelector(".img").src = link.image;
    const title = clone.querySelector(".title");
    title.href = await processMacros(link.href);
    title.appendChild(document.createTextNode(link.title));

    return clone;
}

async function processMacros(input) {
    localHost = document.location.hostname;
    routerIp = await (await fetch(API_HOST + "/router-ip")).text();
    return input
        .replaceAll("{local}", localHost)
        .replaceAll("{router}", routerIp)
}

