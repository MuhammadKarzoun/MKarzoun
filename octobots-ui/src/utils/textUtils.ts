
const replacePlaceholders = (text: string, dataSource: any): string => {
    if (!text || typeof text !== 'string') return text;

    // Replace dynamic dates like {{ now+3d }} or {{ now }}
    text = text.replace(/{{\s*now\+(\d+)d\s*}}/g, (_, days) => {
        return new Date(Date.now() + parseInt(days, 10) * 86400000).toString();
    });

    text = text.replace(/{{\s*now\s*}}/g, () => new Date().toString());

    // Replace values from the dataSource (relatedItem or target)
    text = text.replace(/{{\s*([\w.]+)\s*}}/g, (_, key) => {
        return key.split('.').reduce((acc, part) => acc?.[part], dataSource) || '';
    });

    // Clean up any [[ ... ]] markers around the final text
    return text.replace(/\[\[\s*(.*?)\s*\]\]/g, '$1');
};

const replacePlaceholders2 = (text: string, dataSource: any): string => {
    if (!text || typeof text !== 'string') return text;

    // Replace values from the dataSource to the text between [[ ... ]]
    text = text.replace(/\[\[\s*([\w.]+)\s*\]\]/g, (_, key) => {
        return key.split('.').reduce((acc, part) => acc?.[part], dataSource) || '';
    })

    // Clean up any [[ ... ]] markers around the final text
    return text.replace(/\[\[\s*(.*?)\s*\]\]/g, '$1');
};

export { replacePlaceholders, replacePlaceholders2 };