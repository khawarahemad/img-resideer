const fileInput = document.getElementById("fileInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cropArea = document.getElementById("cropArea");
const resizeHandle = document.getElementById("resizeHandle");
const modal = document.getElementById("modal");
const cropButton = document.getElementById("cropButton");
const cancelButton = document.getElementById("cancelButton");

let img = null;
let scale = 1;
let cropSize = 200; // Initial size of the crop area (Square)
let cropWidth = cropSize; // Width of the crop area (square)
let cropHeight = cropSize; // Height of the crop area (square)
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let isResizing = false;
let startX, startY, startWidth, startHeight, startOffsetX, startOffsetY;

// File input handling to load the image
fileInput.addEventListener("change", handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            img = new Image();
            img.onload = function () {
                // Show the modal and set canvas size
                modal.style.display = "flex";
                scaleImageToFit();

                // Set the crop area to square and position it
                cropArea.style.width = `${cropWidth}px`;
                cropArea.style.height = `${cropHeight}px`;
                cropArea.style.left = "0px";
                cropArea.style.top = "0px";
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Function to scale the image to fit the canvas while maintaining its aspect ratio
function scaleImageToFit() {
    const canvasAspect = 16 / 9;
    const imgAspect = img.width / img.height;

    if (imgAspect > canvasAspect) {
        // Image is wider than the 16:9 aspect ratio (scale by height)
        scale = canvas.height / img.height;
    } else {
        // Image is taller than 16:9 aspect ratio (scale by width)
        scale = canvas.width / img.width;
    }

    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;

    // Set the canvas size based on the scaled image
    canvas.width = scaledWidth;
    canvas.height = scaledHeight;

    // Clear the canvas and redraw the image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
}

// Handle dragging of the crop area (for square)
cropArea.addEventListener("mousedown", (e) => {
    if (e.target !== resizeHandle) {
        isDragging = true;
        startX = e.clientX - offsetX;
        startY = e.clientY - offsetY;
    }
});

// Handle resizing the crop area (for square)
resizeHandle.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = cropWidth;
    startHeight = cropHeight;
    startOffsetX = parseInt(cropArea.style.left);
    startOffsetY = parseInt(cropArea.style.top);
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        offsetX = e.clientX - startX;
        offsetY = e.clientY - startY;

        // Update crop area position
        cropArea.style.left = `${Math.min(Math.max(offsetX, 0), canvas.width - cropWidth)}px`;
        cropArea.style.top = `${Math.min(Math.max(offsetY, 0), canvas.height - cropHeight)}px`;
    }

    if (isResizing) {
        const newWidth = startWidth + (e.clientX - startX);
        cropWidth = Math.max(newWidth, newWidth); // Maintain square ratio
        cropHeight = cropWidth; // Keep square shape

        // Update crop area size
        cropArea.style.width = `${cropWidth}px`;
        cropArea.style.height = `${cropHeight}px`;
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    isResizing = false;
});

// Crop and upload image
cropButton.addEventListener("click", () => {
    const cropX = parseInt(cropArea.style.left);
    const cropY = parseInt(cropArea.style.top);

    // Get the cropped image data
    const croppedImage = ctx.getImageData(cropX, cropY, cropWidth, cropHeight);

    const croppedCanvas = document.createElement("canvas");
    const croppedCtx = croppedCanvas.getContext("2d");

    croppedCanvas.width = cropWidth;
    croppedCanvas.height = cropHeight;
    croppedCtx.putImageData(croppedImage, 0, 0);

    // Create a link to download the cropped image
    const dataUrl = croppedCanvas.toDataURL();
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "profile-picture.png";
    link.click();

    // Close modal after crop
    modal.style.display = "none";
});

// Cancel crop and close modal
cancelButton.addEventListener("click", () => {
    modal.style.display = "none";
});
