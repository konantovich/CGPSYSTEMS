import React from 'react';
import { useDispatch } from 'react-redux';

import {
   removeClient,
   openRow,
   addToArchive
} from '../../redux/slices/clients';

import arrow from './arrow.png';
import threedots from './3dots.png';
import deleteIcon from './delete.png';
import archive from './archive.png';

import './table-view.scss';

const ModalButtons = ({ children, row, open, status }) => {
   const dispatch = useDispatch();

   const [openDeleteArchive, setOpenDeleteArchive] = React.useState(false);
   const [hoverModal, setHoverModal] = React.useState(false);

   const [openDetails, setOpenDetails] = React.useState(false);

   return (
      <>
         <div className='open_3dots' id='modalwindow'>
            <div
               className={
                  hoverModal || !openDeleteArchive
                     ? 'modalmini'
                     : 'modalmini active'
               }
               onClick={() => setOpenDeleteArchive(false)}
            ></div>
            <p
               className={!openDetails ? 'open_row' : 'open_row close_row'}
               onClick={() => {
                  dispatch(openRow({ open: open, id: row }));
                  setOpenDetails(!openDetails);
               }}
            >
               <img src={arrow} alt='' />
            </p>

            <p className='three_dots'>
               <img
                  src={threedots}
                  alt=''
                  onClick={() => setOpenDeleteArchive(!openDeleteArchive)}
               />

               {openDeleteArchive && (
                  <div
                     onMouseEnter={() => setHoverModal(true)}
                     onMouseLeave={() => setHoverModal(false)}
                     className='delete_archive_container'
                  >
                     <p onClick={() => dispatch(removeClient(row))}>
                        <img src={deleteIcon} alt='' /> <p>Delete</p>
                     </p>
                     <p
                        onClick={function () {
                           dispatch(addToArchive({ status: status, id: row }));
                           setOpenDeleteArchive(false);
                        }}
                     >
                        <img src={archive} alt='' /> <p>Archive</p>
                     </p>
                  </div>
               )}
            </p>
         </div>
      </>
   );
};

const generateData = (clients) => {
   let rows = [];

   if (clients.length < 1) {
      return rows.push({ '': '' });
   }

   for (let i = 0; i < clients.length; i++) {
      const clientsInfo = { ...clients[i] };

      rows.push({
         Id: clientsInfo.id,
         Client: `${clientsInfo.client}`,
         Since: `${clientsInfo.since}`,
         'Total Earnings': `$${clientsInfo.totalEarnings}.00`,
         'Available Credit': `$${clientsInfo.availableCredit}.00`,
         Status: clientsInfo.status ? (
            <div className='status_active'>
               <p>Active</p>
            </div>
         ) : (
            <div className='status_archived'>
               <p>Archived</p>
            </div>
         ),
         '': (
            <ModalButtons
               row={clientsInfo.id}
               open={clientsInfo.open}
               status={clientsInfo.status}
            >
               {' '}
            </ModalButtons>
         )
      });
   }

   return {
      data: rows,
      columns: Object.keys(rows[0])
   };
};

export default generateData;
