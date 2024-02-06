// script.js

function findOrCreateNode(currentNode, key) {
    const lowerCaseKey = key.toLowerCase();
    if (!currentNode[lowerCaseKey]) {
        currentNode[lowerCaseKey] = {};
    }
    return currentNode[lowerCaseKey];
}

function createTree(data, currentNode) {
    data.reverse().forEach((value, index) => {
        currentNode = findOrCreateNode(currentNode, value);

        if (index === data.length - 1) {
            currentNode.data = value;
        }
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function submitForm() {
    const inputText = document.getElementById("inputText").value;
    const outputText = document.getElementById("outputTextbox").value;

    // Add a comma at the end of inputText only if outputTextbox is not empty
    const comma = outputText ? "," : "";
    const inputData = inputText.trim() + comma + outputText;

    const data = inputData.split(',').map((item) => capitalizeFirstLetter(item.trim()));
    const storedData = JSON.parse(localStorage.getItem("addressData")) || {};
    createTree(data, storedData);

    localStorage.setItem("addressData", JSON.stringify(storedData));

    document.getElementById("addressForm").reset();

    const displayContainer = document.getElementById("objectDisplay");
    displayContainer.innerHTML = "";
    displayNestedObject(displayContainer, storedData);
}

function clearStorage() {
    localStorage.removeItem("addressData");
    const displayContainer = document.getElementById("objectDisplay");
    displayContainer.innerHTML = "Local storage cleared.";
    document.getElementById("outputTextbox").value = "";
}

function displayNestedObject(container, data, depth = 0, path = []) {
    for (const key in data) {
        if (key !== 'data') { // Skip displaying properties named "data"
            const value = data[key];
            const currentPath = [...path, capitalizeFirstLetter(key)];

            const details = document.createElement("details");
            const summary = document.createElement("summary");
            summary.innerText = capitalizeFirstLetter(key);
            details.appendChild(summary);

            details.addEventListener('click', function (event) {
                event.stopPropagation();
                updateOutputTextbox(currentPath.reverse());
            });

            const nestedContainer = document.createElement("div");
            nestedContainer.classList.add("nested");
            displayNestedObject(nestedContainer, value, depth + 1, currentPath);
            details.appendChild(nestedContainer);

            container.appendChild(details);
        }
    }
}

function updateOutputTextbox(path) {
    const outputTextbox = document.getElementById("outputTextbox");
    outputTextbox.value = path.join(', ');
}

function resetTextboxes() {
    document.getElementById("inputText").value = "";
    document.getElementById("outputTextbox").value = "";
}

const storedData = JSON.parse(localStorage.getItem("addressData")) || {};
const displayContainer = document.getElementById("objectDisplay");
displayNestedObject(displayContainer, storedData);
