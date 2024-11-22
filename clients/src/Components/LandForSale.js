import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LandForSale.css';

const LandForSale = () => {
    const [landsForSale, setLandsForSale] = useState([]);

    useEffect(() => {
        fetchLandsForSale();
    }, []);

    const fetchLandsForSale = async () => {
        try {
            const response = await axios.get('http://localhost:5000/landforsale');
            setLandsForSale(response.data);
        } catch (error) {
            console.error('Error fetching lands for sale:', error);
        }
    };

    return (
        <div className="land-for-sale">
            <h2>Lands Available for Sale</h2>
            {landsForSale.length > 0 ? (
                <div className="land-for-sale-table-container">
                    <table className="land-for-sale-table">
                        <thead>
                            <tr>
                                <th>Survey No</th>
                                <th>Hiss No</th>
                                <th>Area</th>
                                <th>Conventional</th>
                                <th>Pincode</th>
                                <th>Owner Name</th>
                                <th>Email</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {landsForSale.map((land, index) => (
                                <tr key={index}>
                                    <td>{land.SurveyNo}</td>
                                    <td>{land.HissNo}</td>
                                    <td>{land.area}</td>
                                    <td>{land.conventional ? "Yes" : "No"}</td>
                                    <td>{land.pincode}</td>
                                    <td>{land.name}</td>
                                    <td>
                                        <a href={`mailto:${land.email}`}>{land.email}</a>
                                    </td>
                                    <td>{land.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No lands available for sale currently.</p>
            )}
        </div>
    );
};

export default LandForSale;
