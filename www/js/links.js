document.addEventListener("DOMContentLoaded", buildLinks);


function buildLinks() {
    const template = document.getElementById("templateLink");
    const container = document.getElementById("contentLink");
    fetch("resources.json")
        .then(response => response.json())
        .then(links => links.forEach(element => {
            container.appendChild(createButton(template, element));
        }));
}

function createButton(template, link) {
    var clone = template.content.cloneNode(true);
    clone.id = "";
    clone.querySelector(".imgA").href = processMacros(link.href);
    clone.querySelector(".img").src = link.image;
    const title = clone.querySelector(".title");
    title.href = processMacros(link.href);
    title.appendChild(document.createTextNode(link.title));

    return clone;
}

function processMacros(input) {
    localHost = document.location.hostname;
    return input.replaceAll("{local}", localHost);
}

