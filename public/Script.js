// public/script.js

document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.getElementById('uploadForm');
  const imageInput = document.getElementById('imageInput');
  const imageContainer = document.getElementById('imageContainer');

  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('image', imageInput.files[0]);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      const imgElement = document.createElement('img');
      imgElement.src = data.imagePath;
      imgElement.alt = 'Uploaded Image';
      imageContainer.innerHTML = '';
      imageContainer.appendChild(imgElement);
    } catch (error) {
      console.error('Error:', error);
    }
  });
});
