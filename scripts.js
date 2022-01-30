async function main(){
    const resources = await fetch("resources.json");
    const links = await resources.json();

    const template = document.querySelector("#template");
    const container = document.querySelector("#content");

    
    links.forEach(element => {
        container.appendChild(createButton(template, element))
    });

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