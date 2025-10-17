import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function NextPage() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [weekInvoices, setWeekInvoices] = useState([]); // renamed
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/invoice/vendors`);
      setVendors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInvoices = async (vendor) => {
    try {
      const res = await axios.get(`${API_URL}/api/invoice/${vendor}`);
      setWeekInvoices(res.data); // now it's week-wise array
    } catch (err) {
      console.error(err);
    }
  };

  const handleVendorChange = (e) => {
    const vendor = e.target.value;
    setSelectedVendor(vendor);
    fetchInvoices(vendor);
  };

  const handleCapture = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file first!");

    const formData = new FormData();
    formData.append("invoice", file);
    formData.append("vendor", selectedVendor); // optional vendor

    try {
      await axios.post(`${API_URL}/api/invoice/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Invoice uploaded!");
      setFile(null);
      setPreview(null);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Invoice Upload & Viewer</h2>

      {/* Upload Section */}
      <div className="card shadow-sm p-4 mb-4" style={{ maxWidth: "500px", margin: "auto" }}>
        <label className="form-label fw-bold mb-2">Capture / Upload Invoice:</label>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCapture}
          className="form-control mb-3"
        />

        {preview && (
          <img src={preview} alt="Preview" className="img-fluid mb-3" style={{ maxHeight: "300px", borderRadius: "10px" }} />
        )}

        <div className="d-flex justify-content-between">
          <button onClick={handleUpload} className="btn btn-primary">Upload</button>
          <button onClick={() => { setFile(null); setPreview(null); }} className="btn btn-secondary">Clear</button>
        </div>
      </div>

      {/* Vendor Dropdown */}
      <div className="mb-3">
        <label className="fw-bold">Select Vendor:</label>
        <select className="form-select" value={selectedVendor} onChange={handleVendorChange}>
          <option value="">-- Select Vendor --</option>
          {vendors.map((v, i) => (
            <option key={i} value={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* Display Invoices Week-wise */}
      {weekInvoices.map((weekObj, i) => (
        <div key={i} className="mb-4">
          <h5 className="mb-2">{weekObj.week}</h5>
          <div className="row">
            {weekObj.invoices.map((inv, j) => (
              <div key={j} className="col-md-4 mb-3">
                <div className="card shadow-sm h-100">
                  <img src={`data:image/jpeg;base64,${inv.imageData}`} alt={inv.fileName} className="card-img-top" />
                  <div className="card-body">
                    <h6 className="card-title">{inv.fileName}</h6>
                    <p className="card-text text-muted">
                      {new Date(inv.uploadedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NextPage;
