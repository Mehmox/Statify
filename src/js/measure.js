export default function measure(data) {
    const jsonString = JSON.stringify(data);

    // Boyutunu hesapla (UTF-8 byte cinsinden)
    const jsonSizeInBytes = new TextEncoder().encode(jsonString).length;
    const jsonSizeInKB = (jsonSizeInBytes / 1024).toFixed(2); // KB cinsinden boyut

    console.log(`JSON data size: ${jsonSizeInKB} KB`);
}