import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { priceCount, filterClients } from '../../redux/slices/clients';
import { TableView } from '../../components/table-view/table-view';
import { FormModal } from '../../components/form-modal/form-modal';

import search from './search.png';
import add from './add.png';

import './mainpage.scss';

export const Home = () => {
   const clients = useSelector((state) => state.clients.clients.items);

    const [searchValue, setSearchValue] = React.useState('');

       const [modal, setModal] = React.useState(false);

   const dispatch = useDispatch();

   React.useEffect(() => {
      dispatch(priceCount());
   }, [clients]);

   const handleOpenModal = () => {

    setModal(true)

   }

   

   return (
      <div className='container' id='container'>
          {modal && <FormModal modal={modal} setModal={setModal}></FormModal>}
         <div className='container_mainpage'>
       
            <div className='top_part'>
               <div className='search_input_container'>
                  <span>
                     <img src={search} alt='search' />
                  </span>
                  <input placeholder='Search' type='text' onChange={(e) => setSearchValue(e.target.value)} />
               </div>
               <div className='add_new_client_button' onClick={handleOpenModal}>
                  <span>
                     <img src={add} alt='add' />
                  </span>
                  <div>
                     <p>New Client</p>
                  </div>
               </div>
            </div>
            <div className='total_clients'>Total Clients: {clients.length}</div>
            <TableView searchValue={searchValue} />
          
         </div>
      </div>
   );
};
