// src/components/NextPage.js

import React, { useState } from "react";

function NextPage() {
  const [preview, setPreview] = useState(null);

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleClear = () => setPreview(null);

  const handleUpload = async () => {
    if (!preview) return alert("Please take a photo first!");

    // You can send the file to your backend here if needed
    alert("Photo captured successfully!");
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">Take a Live Photo 📸</h2>

      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <input
          type="file"
          accept="image/*"
          capture="environment"  // ✅ opens camera directly
          className="form-control mb-3"
          onChange={handleCapture}
        />

        {preview && (
          <div className="text-center mb-3">
            <img
              src={preview}
              alt="Captured"
              className="img-fluid rounded"
              style={{ maxHeight: "300px" }}
            />
          </div>
        )}

        <div className="d-flex justify-content-between">
          <button onClick={handleClear} className="btn btn-secondary">
            Retake
          </button>
          <button onClick={handleUpload} className="btn btn-primary">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default NextPage;
