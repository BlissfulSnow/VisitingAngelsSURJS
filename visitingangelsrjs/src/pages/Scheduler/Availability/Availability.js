// src/pages/Scheduler/Availability/Availability.js

/**
     * Availability Component
     * 
     * This component renders a form to update a caregiver's availability.
     * Users can add or remove availability for a caregiver by specifying the name, date, and time.
     * The form supports dynamic state updates and handles form submission.
*/

import React, { useState } from 'react';
import './Availability.css';

function Availability() {
  // State to store form data
  const [formData, setFormData] = useState({
	user_id: '',
	date: '',
	start_time: '',
	end_time: ''
  });
  const [action, setAction] = useState('Add');
  
  /**
       * Handle input changes in the form fields.
       * Updates the corresponding field in the formData state.
       * 
       * @param {Object} e - The input change event.
  */
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleActionChange = (e) => {
	  setAction(e.target);
  }


  /**
       * Handle form submission.
       * Logs the current form data to the console.
       * 
       * @param {Object} e - The form submit event.
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
	console.log(formData);
	  const response = await fetch('http://localhost:5000/api/db/new-availability', {
		  method: 'POST',
		  headers: {'Content-Type': 'application/json'},
		  body: JSON.stringify(formData),
	  })
	  if (!response.ok) {
		  throw new Error('Failed to input availability');
	  }
	  else {
		  alert("Submission successful!")
		  setFormData({
			  user_id: '',
			  date: '',
			  start_time: '',
			  end_time: ''
		  })
	  }
  };

  return (
    <div className="availability-container">
      <div className="availability-header">
        <h2>Update Caregiver's Availability</h2>
      </div>
      
      {/* Form Section */}
		<form className="availability-form" onSubmit={handleSubmit}>

			<label>
				Caregiver Name:
				<input
					type="text"
					name="user_id"
					value={formData.user_id}
					onChange={handleFormChange}
					placeholder="Enter caregiver's username"
				/>
			</label>

			<label>
				Date:
				<input
					type="date"
					name="date"
					value={formData.date}
					onChange={handleFormChange}
				/>
			</label>

			<label>
				From:
				<input
					type="time"
					name="start_time"
					value={formData.start_time}
					onChange={handleFormChange}
				/>
			</label>

			<label>
				To:
				<input
					type="time"
					name="end_time"
					value={formData.end_time}
					onChange={handleFormChange}
				/>
			</label>


			{/* Add/Remove Dropdown */}
			<label>
				Action:
				<select name="action" value={action} onChange={handleActionChange}>
					<option value="Add">Add</option>
					<option value="Remove">Remove</option>
				</select>
			</label>

			<button type="submit">Submit</button>
		</form>
	</div>
  );
}

export default Availability;
