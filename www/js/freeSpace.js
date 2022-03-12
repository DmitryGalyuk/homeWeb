document.addEventListener("DOMContentLoaded", freeSpaceCycle);
options = {method: 'GET', mode: 'cors', headers: {'Content-Type': 'application/json',}};

async function freeSpaceCycle() {
    fetch(API_HOST+"/freeSpace", options)
        .then(response => response.json())
        .then(result => displayFreeSpace(result))
        .then(setTimeout(freeSpaceCycle, 2000));
}

async function displayFreeSpace(drives) {
    const template = document.getElementById("templateFreeSpace");
    const placeholder = document.getElementById("sectionFreeSpace");
    const ranges = await freeSpaceRanges();
    while(placeholder.firstChild) placeholder.removeChild(placeholder.firstChild);

    for(drive of drives){
        var clone = template.content.cloneNode(true);
        clone.title = drive.name;
        var labelFreeSpace = clone.getElementById("labelFreeSpace");
        labelFreeSpace.appendChild(document.createTextNode(byte2Gb(drive.free)));
        var labelTotalSpace = clone.getElementById("labelTotalSpace");
        labelTotalSpace.appendChild(document.createTextNode(byte2Gb(drive.total)));
        
        var progressBar = clone.getElementById("progressBar");
        const progressWidth = parseInt(drive.total / 1_000_000_000 / 10);
        progressBar.style.width = progressWidth+"px"; // 1TB = 100px
        
        var progressValue = clone.getElementById("progressValue");
        progressValue.style.width = parseInt(drive.used / 1_000_000_000 / 10) + "px";
        var gradientString = "linear-gradient(to right";
        ranges.forEach(r => {
            gradientString += ", var(--color-" + r.name + ") " + (progressWidth*r.range[1]/100).toFixed(0) + "px"
        });
        gradientString += ")"
        progressValue.style.background = gradientString;

        placeholder.appendChild(clone);
    }
}

async function freeSpaceRanges() {
    if(freeSpaceRanges.range) return freeSpaceRanges.range;
    freeSpaceRanges.range = fetch(API_HOST+"/freeSpaceRanges", options)
        .then(response => response.json());
    return freeSpaceRanges.range;
}

function byte2Gb(b) {
    return (b/1_000_000_000)
        .toLocaleString(
            undefined, // leave undefined to use the visitor's browser 
                    // locale or a string like 'en-US' to override it.
            {
                maximumFractionDigits: 0,
                minimumFractionDigits: 0, 
            }
        );
}