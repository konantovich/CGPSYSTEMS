import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import generateData from './generate-data';
import { fetchClients, removeClient, closeAllRow } from '../../redux/slices/clients';

import './table-view.scss';

import { OpenTableViewCell } from '../open-table-view/open-table-view';

import sixdots from './6dots.png';


// const columns = [
//    'Client',
//    'Since',
//    'total Earnings',
//    'Available Credit',
//    'Status',
//    ''
// ];



export const TableView = ({ searchValue }) => {
   const dispatch = useDispatch();

   const clients = useSelector((state) => state.clients.clients.items);
   const [clientsLoaded, setClientsLoaded] = useState(false);

   React.useEffect(() => {
      dispatch(fetchClients());
   }, []);

   const filteredData = clients.filter((el) => {
      //if no input the return the original
      if (searchValue === '') {
         return el;
      }
      //return the item which contains the user input
      else {
         return el.client.toLowerCase().includes(searchValue.toLowerCase());
      }
   });

   const findClient = (id) => {
    return clients.find(o => o.id === id)
  }

   // const [columns, setColumns] = React.useState()
   // const [rows, setRows] = React.useState()
   React.useEffect(() => {
      if (clients) {
         setClientsLoaded(true);
      }
      if (clientsLoaded) {
         setCols(generateData(filteredData).columns);
         setRows(generateData(filteredData).data);
      }
   }, [clients, clientsLoaded, searchValue]);

   //DRAG
   const [cols, setCols] = useState();
   const [rows, setRows] = useState();
   const [dragOver, setDragOver] = useState('');

   const handleDragStart = (e) => {
      const { id } = e.target;
      const idx = cols.indexOf(id);
      e.dataTransfer.setData('colIdx', idx);
   };

   const handleDragOver = (e) => e.preventDefault();
   const handleDragEnter = (e) => {
      const { id } = e.target;
      setDragOver(id);
   };

   const handleOnDrop = (e) => {
      const { id } = e.target;
      const droppedColIdx = cols.indexOf(id);
      const draggedColIdx = e.dataTransfer.getData('colIdx');
      const tempCols = [...cols];

      tempCols[draggedColIdx] = cols[droppedColIdx];
      tempCols[droppedColIdx] = cols[draggedColIdx];
      setCols(tempCols);
      setDragOver('');

      dispatch(closeAllRow())
      // if(draggedColIdx <= cols.length) {
      //   console.log('dragOver',draggedColIdx)
      // }
    
   };

   return (
      <div className='App'>
         <table>
            {console.log('clients', clients)}
            <thead>
               <tr>
                  {cols &&
                     cols.map((col, index) => (
                        <th
                           id={col}
                           key={col}
                           draggable
                           onDragStart={handleDragStart}
                           onDragOver={handleDragOver}
                           onDrop={handleOnDrop}
                           onDragEnter={handleDragEnter}
                           dragOver={col === dragOver}
                           className='clienthover'
                        >
                           <span
                           >  
                              <img src={sixdots} alt=''  />
                           </span>
                           {col}
                        </th>
                     ))}
               </tr>
            </thead>
            <tbody>
               {rows &&
                  rows.map((row, index) => (
                     <>
                        <tr key={row.Id} className='rows'>
                           {Object.entries(row).map(([k, v], idx) => (
                              <>
                                 <td key={v} dragOver={cols[idx] === dragOver}>
                                    {row[cols[idx]]}
                             
                                 </td>
                              </>
                           ))}
                        </tr>

                        <div >
                           {findClient(row.Id) &&
                              findClient(row.Id).open === true && (
                                <><div className='dop_cell'></div>
                                 <div className='dop-window'>
                                    <div className='dop_client'>
                                       <p>Client</p>
                                       <h2>{row.Client}</h2>
                                    </div>

                                    <div className='dop_contact'>
                                       <p>Main Contact</p>
                                       <h2> {findClient(row.Id).mainContact}</h2>
                                    </div>

                                    <div className='dop_notes'>
                                       <p>Notes</p>
                                       <h5> {findClient(row.Id).notes || ''}</h5>
                                    </div>

                                    <div className='dop_total'>
                                       <p>Total Earnings</p>
                                   <div className='cost_number'>
                                    <h1>${findClient(row.Id).totalEarnings}</h1>
                                    <h5>.00</h5>
                                    </div>

                                    <div className='dop_status'>{findClient(row.Id).status ? <div className='status_active'><p>Active</p></div> : <div className='status_archived'><p>Archived</p></div>}</div>
                                    </div>
                                 </div>
                                 </>
                              )}
                        </div>
                     </>
                  ))}

               {/* <td>{item.client}</td>
                     <td>{item.since}</td>
                     <td>${item.totalEarnings}</td>
                     <td>${item.availableCredit}</td>
                     <td>
                        {item.status ? <div>active</div> : <div>archived</div>}
                     </td>
                     <td>
                        <div className='open_3dots'>
                           <p
                              onClick={
                                 () => setOpenText(!openText)
                                 // setOpenText([
                                 //    ...openText.slice(0, index),
                                 //    {
                                 //       title: item.title,
                                 //       text: item.text,
                                 //       open: !item.open
                                 //    },
                                 //    ...openText.slice(index + 1)
                                 // ])
                              }
                           >
                              Open
                           </p>{' '}
                           <p onClick={() => dispatch(removeClient(item.id))}>
                              3 dots
                           </p>
                        </div>
                     </td> */}
            </tbody>
         </table>
      </div>
   );
};
