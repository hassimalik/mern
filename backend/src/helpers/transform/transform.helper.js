const transform = (data, transformer) => {
    if (!data) return null;

    return transformer(data);
};


const transformMany = (data, transformer) => {
    if (!Array.isArray(data)) return [];

    return data.map(transformer);
};


module.exports = {
    transform,
    transformMany,
};