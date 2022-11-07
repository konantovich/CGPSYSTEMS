import React from 'react';
import './main-nav.scss';



import { SearchIcon } from '../../images/searchicon';
import { AddIcon } from '../../images/add';



export const MainNav = ({
   search,
   setSearchValue,
   add,
   handleOpenModal,
   clients
}) => {

  
   return (
      <div className='container'>
         <div className='main-nav'>
            <div className='main-nav__search'>
               <span>
                  <SearchIcon />
               </span>
               <input
                  placeholder='Search'
                  type='text'
                  onChange={(e) => setSearchValue(e.target.value)}
               />
            </div>
            <div
               className='main-nav__add-client-button'
               onClick={handleOpenModal}
            >
               <span>
                  <AddIcon />
               </span>
               <p>New Client</p>
            </div>
         </div>
         <div className='main-nav__total-clients'>
            <p>Total Clients: {clients.length} </p>
         </div>
      </div>
   );
};
