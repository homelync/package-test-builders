export function transform(pattern: string, inputData: string): any {
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

export function buildTransform(transformSpec: string): string {

    if (!transformSpec) {
        return transformSpec;
    }

    if (transformSpec.startsWith('/') && transformSpec.endsWith('/')) {
        return transformSpec.substring(1, transformSpec.length - 1);
    }

    const output: string[] = [];
    const parts = transformSpec.split('&&');
    for (const p of parts) {
        const mapping = p.split('=');
        const source = mapping[0];
        const target = mapping[1];

        output.push(`(${source}=+(?<${target}>((.)[^\|]*)))`);
    }

    return output.join('&&');
}