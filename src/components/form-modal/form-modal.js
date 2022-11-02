import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import './form.modal.scss';

import { addClient } from '../../redux/slices/clients';

import escape from './escape.png';
import calendar from './calendar.png';

export const FormModal = ({ modal, setModal }) => {

    const [formValue, setFormValue] = React.useState({});

    const dispatch = useDispatch();

     const formRef = React.useRef();

     const clients = useSelector((state) => state.clients.clients.items);

     const handleFormSubmit = async (e) => {
        e.preventDefault();
  
        console.log(e.target[1]);
        //console.log(e.nativeEvent.path)
  
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
            mainContact: e.target[5].value + ' ' + e.target[6].value,

        };

        dispatch(addClient(data))
  
        setFormValue({
           ...data
        });
        setModal(!modal)

    }


   return (
      <div>
        {console.log(formValue)}
         {modal && (
            <div className='modal-container'>
               <div className='form-container'>
                  <form onSubmit={(e) => handleFormSubmit(e)} ref={formRef}>
                     <div className='top_label_container'>
                        <h2>New Client</h2>
                        <div>
                           <img
                              src={escape}
                              alt='escape'
                              onClick={() => setModal(!modal)}
                           />
                        </div>
                     </div>

                     <div className='first_input'>
                        <div className='input_label'>
                           <p>Client</p>
                        </div>
                        <input className='input' placeholder='Client name' />
                     </div>

                     <div className='second_inputs'>
                        <div className='input_label second_input'>
                           <p>Total Earnings</p>
                           <input className='input second_input' type='number'/>
                        </div>

                        <div className='input_label second_input'>
                           <p>Available Credit</p>
                           <input className='input second_input'  type='number'/>
                        </div>
                     </div>

                     <div className='first_input'>
                        <div className='input_label'>
                           <p>Notes</p>
                        </div>
                        <input className='input' />
                     </div>

                     <div className='date_input '>
                        <div className='input_label'>
                           <p>Client Since</p>
                        </div>
                        <div className='date_icon'>
                          <span> <img className='' src={calendar} alt='date-logo' /></span>
                        </div>
                     
                        <input
                           placeholder=' '
                           id='input-date'
                           className='input'
                           type='text'
                           required
                        ></input>
                       
                     </div>
                     {/* <div className='second_inputs'>
                        <div className='input_label second_input date_input'>
                           <div>
                              <div className='input_label'>
                                 <p>Client Since</p>
                              </div>
                              <div className='date_icon_input'>
                                 <div className='date_icon'>
                                    <span>
                                       <img src={calendar} alt='' />
                                    </span>
                                 </div>
                                 <input className='input second_input' />
                              </div>
                           </div>
                        </div>
                     </div> */}

                     <div className='main_contact_container'>
                        <div className='main_contact_label'>Main Contact</div>
                        <div className='second_inputs main_contact_inputs'>
                           <div className='input_label second_input'>
                              <p>First Name</p>
                              <input className='input second_input' />
                           </div>

                           <div className='input_label second_input'>
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
      </div>
   );
};
