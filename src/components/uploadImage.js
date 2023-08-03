import React, { useState } from "react";

const UploadImage = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);
  const [selectedGridItem, setSelectedGridItem] = useState(null);
  const [viewingDistance, setViewingDistance] = useState("3ft");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagePreview(e.target.result);

        // Extract image info
        const img = new Image();
        img.onload = () => {
          const resolution = img.width + " x " + img.height + " pixels";
          const megapixels = (img.width * img.height) / 1000000;
          const ppi = calculatePPI(img.width, img.height);
          const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);

          const imageDetails = {
            resolution,
            megapixels,
            ppi,
            fileSizeMB,
          };

          setImageInfo(imageDetails);
        };

        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  };

  // Function to calculate PPI
  const calculatePPI = (imageWidth, imageHeight) => {
    const physicalWidthInches = 8; // Replace with the actual physical width of the image in inches
    const physicalHeightInches = 12.3; // Replace with the actual physical height of the image in inches

    if (!physicalWidthInches || !physicalHeightInches) {
      return "Unknown";
    }

    const ppiX = Math.round(imageWidth / physicalWidthInches);
    const ppiY = Math.round(imageHeight / physicalHeightInches);

    return Math.round((ppiX + ppiY) / 2);
  };
  // const handleGridItemClick = (size, ppi) => {
  //   if (imagePreview && imageInfo) {
  //     // Calculate new image dimensions in inches based on the selected grid item
  //     const [newWidthInches, newHeightInches] = size.split("x").map(parseFloat);

  //     // Calculate new width and height in pixels based on the new PPI
  //     const newWidthPixels = Math.round(newWidthInches * ppi);
  //     const newHeightPixels = Math.round(newHeightInches * ppi);

  //     // Set the selected grid item to apply the corresponding CSS class
  //     setSelectedGridItem(size);

  //     // Create a new image element to load the original image
  //     const img = new Image();
  //     img.onload = () => {
  //       // Create a new canvas with the desired dimensions
  //       const canvas = document.createElement("canvas");
  //       const ctx = canvas.getContext("2d");
  //       canvas.width = newWidthPixels;
  //       canvas.height = newHeightPixels;

  //       // Disable image smoothing to potentially improve image quality
  //       ctx.imageSmoothingEnabled = true;
  //       // Draw the loaded image onto the canvas with the new dimensions
  //       ctx.drawImage(img, 0, 0, newWidthPixels, newHeightPixels);

  //       // Get the data URL of the resized image from the canvas
  //       const resizedImageDataURL = canvas.toDataURL("image/jpeg", 0.9); // Use quality 1 (highest) to avoid additional compression

  //       // Update the image preview with the resized image's data URL
  //       setImagePreview(resizedImageDataURL);

  //       // Update the image info with the new PPI and dimensions
  //       const newImageDetails = {
  //         ...imageInfo,
  //         ppi: ppi,
  //       };
  //       setImageInfo(newImageDetails);
  //     };

  //     // Load the original image into the new image element
  //     img.src = imagePreview;
  //   }
  // };
  const handleGridItemClick = (size, ppi) => {
    if (imagePreview && imageInfo) {
      // Set the selected grid item to apply the corresponding CSS class
      setSelectedGridItem(size);
  
      // Create a new image element to load the original image
      const img = new Image();
      img.onload = () => {
        // Calculate new image dimensions in inches based on the selected grid item
        const [newWidthInches, newHeightInches] = size.split("x").map(parseFloat);
  
        // Calculate new width and height in pixels based on the new PPI
        const newWidthPixels = Math.round(newWidthInches * ppi);
        const newHeightPixels = Math.round(newHeightInches * ppi);
  
        // Create a new canvas with the desired dimensions
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = newWidthPixels;
        canvas.height = newHeightPixels;
  
        // Disable image smoothing to potentially improve image quality
        ctx.imageSmoothingEnabled = true;
        // Draw the loaded image onto the canvas with the new dimensions
        ctx.drawImage(img, 0, 0, newWidthPixels, newHeightPixels);
  
        // Get the data URL of the resized image from the canvas
        const resizedImageDataURL = canvas.toDataURL("image/jpeg", 0.9); // Use quality 0.9 for better quality
  
        // Create a new image element for the resized image
        const newImg = new Image();
        newImg.src = resizedImageDataURL;
  
        // Update the image preview by replacing the original image element with the resized one
        const imageContainer = document.getElementById("image-container");
        imageContainer.innerHTML = "";
        imageContainer.appendChild(newImg);
  
        // Update the image info with the new PPI and dimensions
        const newImageDetails = {
          ...imageInfo,
          ppi: ppi,
        };
        setImageInfo(newImageDetails);
      };
  
      // Load the original image into the new image element
      img.src = imagePreview;
    }
  };
  
  const handleDistanceChange = (e) => {
    setViewingDistance(e.target.value);
  };

  const printSizes = [
    {
      size: "12x12",
      cmSize: "30 x 30 cm",
      ppi: 64,
      quality: "Canvas print",
      description: "Amazing",
    },
    {
      size: "16x16",
      cmSize: "40 x 40 cm",
      ppi: 72,
      quality: "Canvas print",
      description: "Excellent",
    },
    {
      size: "20x20",
      cmSize: "50 x 50 cm",
      ppi: 24,
      quality: "Canvas print",
      description: "Great",
    },
    {
      size: "24x24",
      cmSize: "60 x 60 cm",
      ppi: 30,
      quality: "Canvas print",
      description: "Superb",
    },
    {
      size: "28x28",
      cmSize: "70 x 70 cm",
      ppi: 46,
      quality: "Canvas print",
      description: "Fantastic",
    },
    {
      size: "32x32",
      cmSize: "80 x 80 cm",
      ppi: 28,
      quality: "Canvas print",
      description: "Awesome",
    },
    {
      size: "48x48",
      cmSize: "122 x 122 cm",
      ppi: 21,
      quality: "Canvas print",
      description: "Impressive",
    },
  ];
  return (
    <>
      <div className="Heading">Upload Your Image</div>
      <div className="main_form_div">
        <form encType="multipart/form-data" method="post" id="uploadForm">
          <div className="text-center">
            <input type="hidden" id="prod" value="" />
            <input type="hidden" id="producttype" value="" />
            <input type="hidden" id="productwidth" value="" />
            <input type="hidden" id="productheight" value="" />
            <input type="hidden" id="asalt" value="O4YBvWHZ" />
            <input
              type="hidden"
              id="ahash"
              value="da263a28b2ec135918680da84df9718d"
            />
            <div id="queue"></div>
            <div className="text-center" align="center" id="select_file">
              <div id="uploadifive-my_file" className="uploadifive-button">
                SELECT FILE
                <input
                  type="FILE"
                  size="40"
                  name="my_file"
                  id="my_file"
                  multiple=""
                />
                <input
                  type="file"
                  className="uploadifive-button-file"
                  onChange={handleFileChange}
                />
              </div>
              <div
                id="uploadifive-my_file-queue"
                className="uploadifive-queue"></div>
            </div>
            <div id="descUploadStatus"></div>
            <div id="logUploadResult">&nbsp;</div>
            We accept JPEG, JPG, PNG, TIF, PDF or PSD (1GB max)
            <a
              target="fileprocess"
              href="https://www.pictorem.com/fileprocess.html">
              <font color="#de256f">
                <b>[tips]</b>
              </font>
            </a>
            <br />
          </div>
        </form>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <select value={viewingDistance} onChange={handleDistanceChange}>
              <option value="1ft">1ft</option>
              <option value="2ft">2ft</option>
              <option value="3ft">3ft</option>
              <option value="4ft">4ft</option>
              <option value="5ft">5ft</option>
              <option value="6ft">6ft</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid-container">
        <h1>Image Print Sizes and Qualities</h1>
        <div className="grid">
          {printSizes.map(({ size, ppi, quality, cmSize }, index) => (
            <div
              className={`grid-item ${
                selectedGridItem === index ? "selected" : ""
              }`}
              key={index}
              onClick={() => handleGridItemClick(size, ppi)}>
              <h2>{size}</h2>
              <h4>{cmSize}</h4>
              <p>
                <strong>PPI:</strong> {ppi}
              </p>
              <p>
                <strong>Quality:</strong> {quality}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="container-fluid">
        {imagePreview && (
          <div className="row">
            <div className="col-12">
              <div style={{ width: "100%", margin: "0 auto" }}>
                <div id="image-container">
                  <img
                    src={imagePreview}
                    alt="Uploaded Preview"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </div>

            <div className="col-6">
              {imageInfo && (
                <div className="text-left">
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <h5 className="skill-title">
                        <b> Resolution:</b>( {imageInfo.resolution}){" "}
                      </h5>
                    </div>
                    <div className="col-md-6">
                      <h5 className="skill-title">
                        <b> Megapixels: </b>({imageInfo.megapixels.toFixed(2)})
                        sRGB{" "}
                      </h5>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <h5 className="skill-title">
                        <b> PPI:</b> ({imageInfo.ppi}) ppi
                      </h5>
                    </div>

                    <div className="col-md-6">
                      <h5 className="skill-title">
                        <b>File Size:</b> ({imageInfo.fileSizeMB}) MB
                      </h5>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-6 mt-5">
                      <a
                        className="btn-element btn btn-default btn-sm"
                        id="infofilebutton">
                        <span>MORE DETAILS</span>
                      </a>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <a
                        className="btn-element btn btn-primary btn-sm fancybox fancybox.iframe"
                        id="iframe"
                        href="">
                        <span>SHARE THIS QUOTE</span>
                      </a>
                    </div>
                  </div> */}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadImage;
