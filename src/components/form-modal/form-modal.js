import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import './form-modal.scss';

import { addClient } from '../../redux/slices/clients';

import { Calendar } from '../../images/calendar';
import { Escape } from '../../images/escape';

export const FormModal = ({ modal, setModal }) => {
   const dispatch = useDispatch();

   const formRef = React.useRef();

   const clients = useSelector((state) => state.clients.clients.items);

   const handleFormSubmit = async (e) => {
      e.preventDefault();

      //inputs value
      const data = {
         id: clients.length + 1,
         client: e.target[0].value,
         since: e.target[4].value,
         totalEarnings: e.target[1].value,
         availableCredit: e.target[2].value,
         status: true,
         open: false,
         openMiniModal: false,
         notes: e.target[3].value,
         mainContact: e.target[5].value + ' ' + e.target[6].value
      };

      dispatch(addClient(data));

      setModal(!modal);
   };

   return (
      <>
         {modal && (
            <div className='form-modal__container'>
               <div className='form-modal__wrapper'>
                  <form onSubmit={(e) => handleFormSubmit(e)} ref={formRef}>
                     <div className='form-modal__top-label'>
                        <h2>New Client</h2>
                        <div onClick={() => setModal(!modal)}>
                           <Escape />
                        </div>
                     </div>

                     <div className='form-modal__first-input'>
                        <div className='form-modal__input_label'>
                           <p>Client</p>
                        </div>
                        <input className='input' placeholder='Client name' />
                     </div>

                     <div className='form-modal__second_inputs'>
                        <div className='form-modal__input_label second_input'>
                           <p>Total Earnings</p>
                           <input
                              className='input second_input'
                              type='number'
                           />
                        </div>

                        <div className='form-modal__input_label second_input'>
                           <p>Available Credit</p>
                           <input
                              className='input second_input'
                              type='number'
                           />
                        </div>
                     </div>

                     <div className='form-modal__first-input'>
                        <div className='form-modal__input_label'>
                           <p>Notes</p>
                        </div>
                        <input className='input' />
                     </div>

                     <div className='form-modal__date_input'>
                        <div className='form-modal__input_label'>
                           <p>Client Since</p>
                        </div>
                        <div className='form-modal__date_icon'>
                           <Calendar />

                           {/* <img
                                 className=''
                                 src={calendar}
                                 alt='date-logo'
                              /> */}
                        </div>

                        <input
                           placeholder=' '
                           id='input-date'
                           className='input'
                           type='text'
                           required
                        ></input>
                     </div>

                     <div className='main_contact__container'>
                        <div className='main_contact_label'><p>Main Contact</p></div>
                        <div className='second_inputs main_contact_inputs'>
                           <div className='form-modal__input_label second_input'>
                              <p>First Name</p>
                              <input className='input second_input' />
                           </div>

                           <div className='form-modal__input_label second_input'>
                              <p>Last Name</p>
                              <input className='input second_input' />
                           </div>
                        </div>
                     </div>

                     <div className='bottom_label_container'>
                        <div className='cancel_button'>
                           <p onClick={() => setModal(!modal)}>Cancel</p>
                        </div>
                        <button type='submit'>
                           <p>Save</p>
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </>
   );
};
