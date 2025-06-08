import React, { useState } from 'react';
import skipImg from './assets/skip.jpg';
import './SkipPage.css';

const skipsData = [
  {"id":17933,"size":4,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":278,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:52.813","allowed_on_road":true,"allows_heavy_waste":true},{"id":17934,"size":6,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":305,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:52.992","allowed_on_road":true,"allows_heavy_waste":true},{"id":17935,"size":8,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":375,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.171","allowed_on_road":true,"allows_heavy_waste":true},{"id":17936,"size":10,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":400,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.339","allowed_on_road":false,"allows_heavy_waste":false},{"id":17937,"size":12,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":439,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.516","allowed_on_road":false,"allows_heavy_waste":false},{"id":17938,"size":14,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":470,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.69","allowed_on_road":false,"allows_heavy_waste":false},{"id":17939,"size":16,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":496,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.876","allowed_on_road":false,"allows_heavy_waste":false},{"id":15124,"size":20,"hire_period_days":14,"transport_cost":248,"per_tonne_cost":248,"price_before_vat":992,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:40.344435","updated_at":"2025-04-07T13:16:52.434","allowed_on_road":false,"allows_heavy_waste":true},{"id":15125,"size":40,"hire_period_days":14,"transport_cost":248,"per_tonne_cost":248,"price_before_vat":992,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:40.344435","updated_at":"2025-04-07T13:16:52.603","allowed_on_road":false,"allows_heavy_waste":false}
];
const steps = [
  'Postcode',
  'Waste Type',
  'Select Skip',
  'Permit Check',
  'Choose Date',
  'Payment'
];


const SkipSelectionPage = () => {
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [page, setPage] = useState(0);

  const handleSelect = (skip) => {
    setSelectedSkip(skip);
  };
  const handleClose = () => setSelectedSkip(null);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(skipsData.length / itemsPerPage);
  const visibleSkips = skipsData.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <div className="skip-container-modern">
      <aside className="stepper">
        {steps.map((step, index) => {
          const isChecked = index < 2; // Postcode & Waste Type
          const isActive = index === 2; // Select Skip

          return (
            <div
              key={index}
              className={`step ${isActive ? 'active-step' : isChecked ? 'checked-step' : ''}`}
            >
              <div className="circle">
                {isChecked ? '✔' : index + 1}
              </div>
              <div className="label">{step}</div>
            </div>
          );
        })}

      </aside>

      <main className="content">
        <div className="title-row">
          <h1 className="main-title">Choose a Skip Size</h1>
          <p className="subtitle">Select the skip size that best suits your needs</p>
        </div>
        <div className="skip-list-modern">
          {visibleSkips.map((skip) => {
            const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);
            return (
              <div
                key={skip.id}
                className={`skip-card ${selectedSkip?.id === skip.id ? 'active' : ''}`}
                onClick={() => handleSelect(skip)}
              >
                <div>
                  <h2>{skip.size} Yard Skip</h2>
                  <p>{skip.hire_period_days} day hire</p>
                  <span>
                    {skip.allowed_on_road ? '🛣️ Road use' : '🚫 No road use'} |{' '}
                    {skip.allows_heavy_waste ? '🏋️‍♂️ Heavy waste' : '🧴 Light waste only'}

                  </span>
                </div>
                <div>
                  <img src={skipImg} alt="skip" />
                  <p className="price">£{totalPrice.toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pagination">
          <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>Previous</button>
          <button disabled={page === totalPages - 1} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      </main>

      {selectedSkip && (
        <div className="drawer-right">
          <div className="drawer-content-modern">
            <p className="disclaimer">
              Image and details are indicative only. Options may vary.
            </p>
            <h2>{selectedSkip.size} Yard Skip</h2>
            <p className="drawer-price">£{(selectedSkip.price_before_vat * 1.2).toFixed(2)}</p>
            <p>{selectedSkip.hire_period_days} day hire</p>
            <div className="drawer-actions">
              <button className="back-btn" onClick={handleClose}>Back</button>
              <button className="continue-btn" onClick={() => setCurrentStep((s) => s + 1)}>Continue</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SkipSelectionPage;