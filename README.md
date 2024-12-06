# Image Cropper Tool

A simple client-side tool that allows users to upload an image, crop it using a 4:4 crop box, and download the cropped version. The crop box is movable and resizable while ensuring it maintains a fixed 4:4 aspect ratio. High-resolution images are automatically scaled down to fit within a 16:9 panel for better usability.

- USE IT by visiting [resideer](https://khawarahemad.github.io/img-resideer).
---

## Features
- **Upload Any Image**: Handles high-resolution images by scaling them to fit within a 16:9 view.
- **4:4 Aspect Ratio Crop**: A crop box that maintains a 4:4 aspect ratio while allowing users to move and resize it.
- **Drag and Zoom**: Users can drag the crop box and zoom to adjust the image as needed.
- **Download Cropped Image**: Outputs the cropped image directly in the browser for download.
- **Pure Frontend**: No server or API required. Everything works in the browser.

---

## Installation and Usage

1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/khawarahemad/img-resideer.git
   cd img-resideer
   ```

2. **Open in a Browser**:
   - Simply open the `index.html` file in any modern browser (e.g., Chrome, Firefox).

3. **Usage Instructions**:
   - **Upload**: Click on the "Upload Image" button to upload your image.
   - **Adjust Crop**: Move and resize the crop box to select the desired area (fixed 4:4 aspect ratio).
   - **Download**: Click the "Crop and Download" button to download the cropped image.

---

## Folder Structure

```
image-cropper-tool/
├── index.html        # Main HTML file.
├── style.css         # CSS for styling.
├── script.js         # JavaScript for functionality.
└── README.md         # Project documentation.
```

---

## How It Works

1. The user uploads an image via the file input.
2. The image is displayed in a scaled-down canvas within a 16:9 panel.
3. A 4:4 crop box is overlaid, allowing the user to drag and resize it.
4. When the user confirms the crop, the selected portion is cropped from the image and displayed as a downloadable link.

---

## Supported Features

- **Aspect Ratio**: Maintains a fixed 4:4 aspect ratio for the crop box.
- **Responsive**: Works with images of any dimension.
- **File Support**: Handles most common image formats (JPG, PNG, etc.).

---

## License

This project is licensed under the MIT License.

---

## Author

Developed by [khawar](https://github.com/khawarahemad).
