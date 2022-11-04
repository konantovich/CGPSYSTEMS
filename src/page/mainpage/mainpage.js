import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { priceCount } from '../../redux/slices/clients';
import { TableView } from '../../components/table-view/table-view';
import { FormModal } from '../../components/form-modal/form-modal';
import { MainNav } from '../../components/main-nav/main-nav';

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
      setModal(true);
   };

   return (
      <div className='container' id='container'>
         {modal && <FormModal modal={modal} setModal={setModal}></FormModal>}
         <MainNav setSearchValue={setSearchValue} clients={clients} />
       
         
         
            <TableView searchValue={searchValue} />
         
      </div>
   );
};
