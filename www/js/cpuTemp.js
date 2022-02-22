document.addEventListener("DOMContentLoaded", cpuTempCycle);
options = {method: 'GET', mode: 'cors', headers: {'Content-Type': 'application/json',}};

async function cpuTempCycle() {
    fetch("http://linbox.local:801/cpuTemp", options)
        .then(response => response.text())
        .then(result => displayCpuTemp(result))
        .then(setTimeout(cpuTempCycle, 2000));
}

async function displayCpuTemp(temp) {
    const template = document.getElementById("templateCpuTemp");
    const placeholder = document.getElementById("sectionCpuTemp");
    const ranges = await cpuTempRanges();
    while(placeholder.firstChild) placeholder.removeChild(placeholder.firstChild);

    var clone = template.content.cloneNode(true);
    var labelTemp = clone.getElementById("labelCpuTemp");
    labelTemp.appendChild(document.createTextNode(temp));
    
    var range = ranges[ranges.findIndex(r => temp >= r.range[0] && temp <= r.range[1])];
    var icon = clone.getElementById("iconCpuTemp");
    while(icon.classList.length) icon.classList.remove(icon.classList[0]);
    icon.classList.add("icon");
    icon.classList.add(range.name);

    placeholder.appendChild(clone);
}

async function cpuTempRanges() {
    if(cpuTempRanges.prototype) return cpuTempRanges.prototype;
    cpuTempRanges.prototype = fetch("http://linbox.local:801/cpuTempRanges", options)
        .then(response => response.json());
    return cpuTempRanges.prototype;
}
