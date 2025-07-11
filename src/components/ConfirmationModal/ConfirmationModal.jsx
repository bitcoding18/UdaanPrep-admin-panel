import React from 'react';
import './ConfirmationModal.css';
import deleteIcon from '../../assets/images/delete-confirm.png';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-modal">
        <img src={deleteIcon} alt="Confirm Delete" className="modal-icon" />
        <h2 className="modal-title">{title}</h2>
        <p className="modal-text">{message}</p>
        <div className="modal-buttons">
          <button className="btn btn-no" onClick={onClose}>No</button>
          <button className="btn btn-yes" onClick={onConfirm}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
