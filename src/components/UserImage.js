export const convertBase64 = (file) => new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
        resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
        reject(error);
    };
});

export const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    return base64;
};
