// mod.ts

interface AddressData {
    [key: string]: AddressData | string;
}

let storedData: AddressData = {};

export function findOrCreateNode(currentNode: AddressData, key: string): AddressData {
    const lowerCaseKey = key.toLowerCase();
    if (!currentNode[lowerCaseKey]) {
        currentNode[lowerCaseKey] = {};
    }
    return currentNode[lowerCaseKey] as AddressData;
}

export function createTree(data: string[], currentNode: AddressData): void {
    data.reverse().forEach((value, index) => {
        currentNode = findOrCreateNode(currentNode, value);

        if (index === data.length - 1) {
            currentNode.data = value;
        }
    });
}

export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function submitForm(inputText: string, outputText: string): void {
    const comma = outputText ? "," : "";
    const inputData = inputText.trim() + comma + outputText;

    const data = inputData.split(',').map((item) => capitalizeFirstLetter(item.trim()));
    createTree(data, storedData);
}

export function clearStorage(): void {
    storedData = {};
}

export function getStoredData(): AddressData {
    return storedData;
}
