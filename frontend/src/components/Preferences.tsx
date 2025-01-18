import React, { useState } from 'react'
import { FaRegClock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Preferences = () => {
  const navigate = useNavigate()
  
  return (
    <div className="container p-4">
      <p
        className="h5 pb-3 d-flex bg-secondary-subtle"
        onClick={() => navigate('/app/dashboard')}
      >
        <svg
          width="24"
          height="25"
          viewBox="0 0 26 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="me-4 pt-1"
        >
          <path
            d="M25.3467 10.4067C25.3467 10.9899 24.9133 11.472 24.3509 11.5483L24.1946 11.5588L1.15258 11.5588C0.516294 11.5588 0.000482559 11.043 0.000482559 10.4067C0.000482559 9.82341 0.433908 9.34138 0.99625 9.26509L1.15258 9.25458L24.1946 9.25458C24.8309 9.25458 25.3467 9.77039 25.3467 10.4067Z"
            fill="#292929"
            fillOpacity="0.8"
          />
          <path
            d="M11.2588 18.8446C11.7097 19.2935 11.7112 20.023 11.2623 20.4739C10.8541 20.8838 10.2142 20.9223 9.76242 20.5886L9.63296 20.4774L0.339355 11.2237C-0.0717716 10.8144 -0.109172 10.1721 0.227171 9.72034L0.339287 9.59096L9.63289 0.335757C10.0837 -0.113233 10.8132 -0.111723 11.2622 0.339131C11.6704 0.748998 11.7062 1.38912 11.3706 1.83946L11.2588 1.96844L2.78547 10.4078L11.2588 18.8446Z"
            fill="#292929"
            fillOpacity="0.8"
          />
        </svg>
        Preferences
      </p>

      <div className="bg-white p-4 rounded-lg">
  <form>
    <div className="row mb-3">
      <div className="col-md-6">
        <label className="form-label">Language</label>
        <select className="form-select">
          <option>English</option>
        </select>
      </div>
      <div className="col-md-6">
      <label className="form-label">Breakfast</label>
      <div style={{ position: 'relative' }}>
        <input
          type="time"
          className="form-control"
          defaultValue="08:52"
          style={{ paddingRight: '30px' }} // Space for the icon
        />
        <FaRegClock
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#aaa',
            pointerEvents: 'none', // Ensures the icon doesn't interfere with input
          }}
        />
      </div>
    </div>
    </div>

    <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Lunch</label>
          <div style={{ position: 'relative' }}>
            <input
              type="time"
              className="form-control"
              defaultValue="08:52"
              style={{ paddingRight: '30px' }} // Space for the icon
            />
            <FaRegClock
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#aaa',
                pointerEvents: 'none', // Ensures the icon doesn't interfere with input
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Dinner</label>
          <div style={{ position: 'relative' }}>
            <input
              type="time"
              className="form-control"
              defaultValue="08:52"
              style={{ paddingRight: '30px' }} // Space for the icon
            />
            <FaRegClock
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#aaa',
                pointerEvents: 'none', // Ensures the icon doesn't interfere with input
              }}
            />
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Wake Time</label>
          <div style={{ position: 'relative' }}>
            <input
              type="time"
              className="form-control"
              defaultValue="08:52"
              style={{ paddingRight: '30px' }} // Space for the icon
            />
            <FaRegClock
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#aaa',
                pointerEvents: 'none', // Ensures the icon doesn't interfere with input
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Bed Time</label>
          <div style={{ position: 'relative' }}>
            <input
              type="time"
              className="form-control"
              defaultValue="08:52"
              style={{ paddingRight: '30px' }} // Space for the icon
            />
            <FaRegClock
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#aaa',
                pointerEvents: 'none', // Ensures the icon doesn't interfere with input
              }}
            />
          </div>
        </div>
      </div>

    <div className="row mb-3">
      <div className="col-md-6">
        <label className="form-label">Weight</label>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input type="radio" className="form-check-input" name="weight" defaultChecked />
            <label className="form-check-label">Kg</label>
          </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="weight" />
            <label className="form-check-label">lbs</label>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <label className="form-label">Height</label>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input type="radio" className="form-check-input" name="height" defaultChecked />
            <label className="form-check-label">cm</label>
          </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="height" />
            <label className="form-check-label">ft/inches</label>
          </div>
        </div>
      </div>
    </div>

    <div className="row mb-3">
      <div className="col-md-6">
        <label className="form-label">Blood Glucose</label>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input type="radio" className="form-check-input" name="glucose" />
            <label className="form-check-label">mmol/l</label>
          </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="glucose" defaultChecked />
            <label className="form-check-label">mg/dL</label>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <label className="form-label">Cholesterol</label>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input type="radio" className="form-check-input" name="cholesterol" />
            <label className="form-check-label">mmol/l</label>
          </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="cholesterol" defaultChecked />
            <label className="form-check-label">mg/dL</label>
          </div>
        </div>
      </div>
    </div>

    <div className="row mb-3">
      <div className="col-md-6">
        <label className="form-label">Blood Pressure</label>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input type="radio" className="form-check-input" name="pressure" />
            <label className="form-check-label">kPa</label>
          </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="pressure" defaultChecked />
            <label className="form-check-label">mmHg</label>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <label className="form-label">Distance</label>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input type="radio" className="form-check-input" name="distance" defaultChecked />
            <label className="form-check-label">km</label>
          </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="distance" />
            <label className="form-check-label">miles</label>
          </div>
        </div>
      </div>
    </div>

    <div className="mb-3">
  <label className="form-label">Communication Type</label>
  <div className="row">
    <div className="col-6">
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" />
        <label className="form-check-label">System Emails</label>
      </div>
    </div>
    <div className="col-6">
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" defaultChecked />
        <label className="form-check-label">SMS</label>
      </div>
    </div>
    <div className="col-6">
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" defaultChecked />
        <label className="form-check-label">Post</label>
      </div>
    </div>
    <div className="col-6">
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" defaultChecked />
        <label className="form-check-label">Member Services Emails</label>
      </div>
    </div>
    <div className="col-6">
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" />
        <label className="form-check-label">Phone Call</label>
      </div>
    </div>
  </div>
</div>



    <div className="text-end">
      <button type="submit"   style={{
              backgroundColor: "#3E5677",
              width: "200px", // Increased width
              height: "50px",
              gap: "0px",
              borderRadius: "10px",
              opacity: "0.9",
              color: "#fff",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}>Update</button>
    </div>
  </form>
</div>

    </div>
  )
}

export default Preferences
