import React, { useEffect, useState } from 'react';

const PrescriptionCard = () => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setFormattedDate(new Date().toLocaleDateString('en-IN', options));
  }, []);

  return (
    <div className="rx-card">
      <div className="rx-header">
        <div className="rx-logo">🩺 Dr. Prescribes</div>
        <div className="rx-seal">Approved ✔</div>
      </div>
      
      <div className="rx-title">Official Cute Prescription</div>
      
      <div className="rx-details">
        <div>
          <span>Patient Name:</span> 
          <span className="value">The Stubborn Future Doctor 🩺</span>
        </div>
        <div>
          <span>Diagnosis:</span> 
          <span className="value">Too Much Anger (100% Adorable) 😤</span>
        </div>
        <div>
          <span>Treatment Date:</span> 
          <span className="value">{formattedDate || 'Today'}</span>
        </div>
      </div>

      <div className="rx-body">
        <span className="rx-symbol">℞</span>
        <ul className="rx-prescription-list">
          <li className="smile">
            <strong>Genuine Smiles:</strong> Minimum twice a day, especially when reading annoying messages.
          </li>
          <li className="smile">
            <strong>Anger Management:</strong> Reduce default angry reaction time by 1% daily.
          </li>
          <li className="tea">
            <strong>Cutting Chai Breaks:</strong> 1 warm cup with ginger whenever high stubbornness is detected. ☕
          </li>
          <li>
            <strong>Tough Outer Shield:</strong> Allowed to keep it on in front of the world, but must open up the soft heart at least sometimes.
          </li>
        </ul>
      </div>

      <div className="rx-footer">
        "Rx cannot be substituted. Keep smiling, you look the prettiest that way."
      </div>
    </div>
  );
};

export default PrescriptionCard;
