import React from 'react';
import { useDispatch } from 'react-redux';

import {
   removeClient,
   openRow,
   addToArchive
} from '../../redux/slices/clients';

import { Archive } from '../../images/archive';
import { Delete } from '../../images/delete';
import { Arrow } from '../../images/arrow';

import { ThreeDots } from '../../images/threedots';

import './table-view.scss';

//GENERATE COLUMNS and ROWS
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
                  openDeleteArchive === false ? 'modalmini' : 'modalmini active'
               }
               onClick={() => setOpenDeleteArchive(false)}
            ></div>

            <p
               className={!open ? 'open_row' : 'open_row close_row'}
               onClick={() => {
                  dispatch(openRow({ open: open, id: row }));
                  setOpenDetails(!openDetails);
               }}
            >
               <Arrow />
            </p>

            <div
               className='three_dots'
               onClick={() => setOpenDeleteArchive(!openDeleteArchive)}
            >
               <ThreeDots />

               {openDeleteArchive && (
                  <div
                     onMouseEnter={() => setHoverModal(true)}
                     onMouseLeave={() => setHoverModal(false)}
                     className='delete_archive_container'
                  >
                     <div
                        className='delete-icon'
                        onClick={() => {
                           dispatch(removeClient(row));
                           setOpenDeleteArchive(!openDeleteArchive);
                        }}
                     >
                        <Archive />

                        <p> Delete</p>
                     </div>
                     <div
                        className='archive-icon'
                        onClick={function () {
                           dispatch(addToArchive({ status: status, id: row }));
                           setOpenDeleteArchive(!openDeleteArchive);
                        }}
                     >
                        <Delete />
                        <p>{status ? 'Archive' : 'Active'}</p>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

const generateData = (clients) => {
   let rows = [];

   if (clients.length < 1) {
      return rows.push({
         Id: ``,
         Client: ``,
         Since: ``,
         'Total Earnings': ``,
         'Available Credit': ``,
         Status: ``
      });
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
