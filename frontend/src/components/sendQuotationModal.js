import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../views/modal.css'
import axios from 'axios';

function SendQuotationModal(props) {
  const [show, setShow] = useState(false);
  const [quotation, setQuotation] = useState(0)
  const [message, setMessage] = useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async e => {
    e.preventDefault();
    
    if(message === "" && quotation === 0){
      alert("invalid quotation or message")
      return
    }

    let formField = new FormData()

    formField.append('uid', props.uid)
    formField.append('message', message)
    formField.append('quotation', quotation)

    await axios({
      method: 'post',
      url: 'http://127.0.0.1:3333/send_job_quotation',
      data: formField
    })
  };

  return (
    <>
      <button className='view-btn' onClick={handleShow}>
        Send Quotation
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <section className="auth">
            <div className="Auth-form-container">
              <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="quotation">Quotation</label>
                <input type="number" id="quotation" placeholder="Enter your bid" onChange={e => setQuotation(e.target.value)}/>
                <label htmlFor="password">Message</label>
                <textarea className="message-box" id="message" placeholder="Your message to the customer" maxLength={150} onChange={e => setMessage(e.target.value)}/>
                <br></br>
                <button className="auth-btn" type="submit">Submit</button>
              </form>
            </div>
          </section>
        </Modal.Body>
        <Modal.Footer>
          <button className='modal-btn' onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SendQuotationModal;