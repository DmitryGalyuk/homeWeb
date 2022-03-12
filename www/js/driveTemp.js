document.addEventListener("DOMContentLoaded", driveTempCycle);
options = {method: 'GET', mode: 'cors', headers: {'Content-Type': 'application/json',}};

async function driveTempCycle() {
    fetch(API_HOST+"/driveTemp", options)
        .then(response => response.json())
        .then(result => displayDriveTemp(result))
        .then(setTimeout(driveTempCycle, 2000));
}

async function displayDriveTemp(temps) {
    const template = document.getElementById("templateDriveTemp");
    const placeholder = document.getElementById("sectionDriveTemp");
    const ranges = await driveTempRanges();

    for(temp of temps){
        var clone = template.content.cloneNode(true);
        var labelTemp = clone.getElementById("labelDriveTemp");
        labelTemp.appendChild(document.createTextNode(temp));
        while(placeholder.firstChild) placeholder.removeChild(placeholder.firstChild);
        
        var range = ranges[ranges.findIndex(r => temp >= r.range[0] && temp <= r.range[1])];
        var icon = clone.getElementById("iconDriveTemp");
        while(icon.classList.length) icon.classList.remove(icon.classList[0]);
        icon.classList.add("icon");
        icon.classList.add(range.name);

        placeholder.appendChild(clone);
    }
}

async function driveTempRanges() {
    if(driveTempRanges.prototype) return driveTempRanges.prototype;
    driveTempRanges.prototype = fetch(API_HOST+"/driveTempRanges", options)
        .then(response => response.json());
    return driveTempRanges.prototype;
}
