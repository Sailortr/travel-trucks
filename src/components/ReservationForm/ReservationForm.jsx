import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ReservationForm.css";

const ReservationForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    dateRange: [null, null],
    comment: "",
  });

  const [success, setSuccess] = useState(false);
  const [startDate, endDate] = form.dateRange;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (update) => {
    setForm({ ...form, dateRange: update });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reservation:", form);
    setSuccess(true);
    setForm({
      name: "",
      email: "",
      dateRange: [null, null],
      comment: "",
    });
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <section className="reservation-wrapper">
      <div className="reservation-card">
        <h3>Book your campervan now</h3>
        <p className="reservation-subtitle">
          Stay connected! We are always ready to help you.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Name*"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email*"
          />

          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
            placeholderText="Select reservation range"
            className="datepicker-input"
            dateFormat="dd MMM yyyy"
            withPortal
            required
          />

          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
            placeholder="Comment"
          />
          <button className="submit" type="submit">
            Send
          </button>
        </form>
      </div>
      {success && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Reservation sent successfully!</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReservationForm;
