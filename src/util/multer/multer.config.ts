interface MulterConfigI {
    destination: string,
    sizeLimit: number,
    fileNameId: string
}

export const MulterConfig: MulterConfigI = {
    destination: './src/public/uploads/',
    sizeLimit: 6 * 1024 * 1024,
    fileNameId: 'upload_file'
}