"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTransform = exports.transform = void 0;
function transform(pattern, inputData) {
    const inputParts = inputData.split('|');
    const patternParts = pattern.split('&&');
    const output = {};
    for (const pp of patternParts) {
        for (const ip of inputParts) {
            const result = new RegExp(pp, 'gm').exec(ip);
            if (result) {
                Object.assign(output, result.groups);
            }
        }
    }
    return output;
}
exports.transform = transform;
function buildTransform(transformSpec) {
    if (!transformSpec) {
        return transformSpec;
    }
    if (transformSpec.startsWith('/') && transformSpec.endsWith('/')) {
        return transformSpec.substring(1, transformSpec.length - 1);
    }
    const output = [];
    const parts = transformSpec.split('&&');
    for (const p of parts) {
        const mapping = p.split('=');
        const source = mapping[0];
        const target = mapping[1];
        output.push(`(${source}=+(?<${target}>((.)[^\|]*)))`);
    }
    return output.join('&&');
}
exports.buildTransform = buildTransform;
//# sourceMappingURL=transform.js.map