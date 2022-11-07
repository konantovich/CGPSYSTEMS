import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { TableView } from '../../components/table-view/table-view';
import { FormModal } from '../../components/form-modal/form-modal';
import { MainNav } from '../../components/main-nav/main-nav';

import './main-page.scss';

export const Home = () => {
   const clients = useSelector((state) => state.clients.clients.items);

   const [searchValue, setSearchValue] = React.useState('');

   const [modal, setModal] = useState(false);

   const handleOpenModal = () => {
      setModal(true);
   };

   return (
      <>
         <FormModal modal={modal} setModal={setModal}></FormModal>
         <MainNav
            setSearchValue={setSearchValue}
            clients={clients}
            handleOpenModal={handleOpenModal}
         />
         <TableView searchValue={searchValue} />
      </>
   );
};
