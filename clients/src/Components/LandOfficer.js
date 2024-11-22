import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import contractabi from './utils/Land.json';
import './LandOfficer.css'; // Import the updated CSS file

const contractABI = contractabi.abi; 
const contractAddress = "0x81176a09B1fA497Eea08D295DA56139B17Df9a5F";

const LandOfficer = () => {
  const [formData, setFormData] = useState({
    owner_adhar: '',
    SurveyNo: '',
    HissNo: '',
    area: '',
    conventional: false,
    pincode: ''
  });

  useEffect(() => {
    requestAccount();
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const requestAccount = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error("User denied MetaMask access");
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  const addLand = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }
    const { ethereum } = window;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const { owner_adhar, SurveyNo, HissNo, area, conventional, pincode } = formData;

    try {
      await contractInstance.add_land(
        SurveyNo,
        HissNo,
        area,
        conventional,
        pincode,
        owner_adhar
      );
      alert("Land added successfully to the blockchain!");
    } catch (error) {
      console.error("Error adding land to the blockchain:", error);
      alert("Failed to add land to the blockchain.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addLand();
  };

  return (
    <div className="land-officer">
      <div className="land-officer-container">
        <h2>Add New Land</h2>
        <form onSubmit={handleSubmit}>
          <label>Owner Aadhaar:</label>
          <input
            type="number"
            name="owner_adhar"
            value={formData.owner_adhar}
            onChange={handleChange}
            required
          />

          <label>Survey Number:</label>
          <input
            type="number"
            name="SurveyNo"
            value={formData.SurveyNo}
            onChange={handleChange}
            required
          />

          <label>Hiss Number:</label>
          <input
            type="text"
            name="HissNo"
            value={formData.HissNo}
            onChange={handleChange}
            required
          />

          <label>Area:</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          />

          <label>Conventional:</label>
          <input
            type="checkbox"
            name="conventional"
            checked={formData.conventional}
            onChange={handleChange}
          />

          <label>Pincode:</label>
          <input
            type="number"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>

        <div>
          <button onClick={() => navigate('/make_convention')}>Go to Make Convention</button>
          <button onClick={() => navigate('/make_transfer')}>Go to Make Transfer</button>
        </div>
      </div>
    </div>
  );
};

export default LandOfficer;
