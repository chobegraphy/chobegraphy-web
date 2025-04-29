import Compressor from 'compressorjs';

export async function compressImg({ file, quality }: any) {
    const options = {
        quality: quality,  // Set quality to 90%
        maxWidth: Infinity,  // Maximum width of the image (rescale if larger than 1024px)
        maxHeight: Infinity,  // Maximum height of the image (rescale if larger than 1024px)
        maxSize: 4 * 1024 * 1024,  // Max size in bytes (4MB)
        success(result: Blob) {
            // Return the compressed file (Blob) from the success callback
            return result;
        },
        error(err: Error) {
            console.error('Compression failed:', err);
            return file;  // Return the original file if compression fails
        }
    };

    try {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                ...options,
                success: (compressedFile: Blob) => {
                    resolve(compressedFile);
                },
                error: reject
            });
        });
    } catch (error) {
        console.error('Compression failed:', error);
        return file;
    }
}
