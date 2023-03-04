const fileUploadElement = document.getElementById('image');
const previewElement = document.getElementById('preview-pic')

function showPreview(){
    let file = fileUploadElement.files[0];
    console.log(file);
    if (!file){
        previewElement.style.display='none';
        return;
    }else {
        previewElement.src = URL.createObjectURL(file);
        previewElement.alt = file.name;
        previewElement.style.display='block';
    }
}

fileUploadElement.addEventListener('change',showPreview)