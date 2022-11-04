import './main-nam.scss';

import classNames from 'classnames/bind';

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
      <>
         <div className='container_mainpage'>
            <div className='main-nav'>
               <div className='main-nav__search-container'>
                  <span>
                     <SearchIcon />
                     {/* <img src={searchicon} alt='search' /> */}
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
                     {/* <img src={add} alt='add' /> */}
                     <AddIcon />
                  </span>
                  <div>
                     <p>New Client</p>
                  </div>
               </div>
            </div>
            <div className='main-nav__total_clients'>
               Total Clients: {clients.length}
            </div>
         </div>
      </>
   );
};
