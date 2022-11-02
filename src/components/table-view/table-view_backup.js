import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import generateData from './generate-data';
import { fetchClients, removeClient } from '../../redux/slices/clients';

import './table-view.scss';

import { OpenTableViewCell } from '../open-table-view/open-table-view';

import sixdots from './6dots.png';

export const TableView = ({ searchValue }) => {
   const [openText, setOpenText] = React.useState(false);

   const dispatch = useDispatch();

   const clients = useSelector((state) => state.clients.clients.items);

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
         return el.client.toLowerCase().includes(searchValue);
      }
   });
   const columnNames = [
      'Client',
      'Since',
      'total Earnings',
      'Available Credit',
      'Status',
      ''
   ];
   

   //DRAG COLUMN
   const [cols, setCols] = useState(columnNames);
   const [rows, setRows] = useState(filteredData);
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
   };

   return (
      <div id='main_table' className='table_view_container'>
         <table>
            <thead>
               <tr>
               {columnNames.map(col => (
              <th
                id={col}
                key={col}
                draggable
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleOnDrop}
                onDragEnter={handleDragEnter}
                dragOver={col === dragOver}
              >
                {col}
              </th>
            ))}
                  {/* <th id="clienthover"><span><img src={sixdots} alt=''/></span>Client</th>
               <th>Since</th>
               <th>total Earnings</th>
               <th>Available Credit</th>
               <th>Status</th>
               <th></th> */}
               </tr>
            </thead>
            <tbody>
               {filteredData &&
                  filteredData.map((item, index) => {
                     return (
                        <>
                           <tr key={item.id}>
                              {Object.entries(item).map(([k, v], index) => (
                                 <td
                                    key={v}
                                    dragOver={cols[index] === dragOver}
                                 >
                                    {item[cols[index]]}
                                 </td>
                              ))}
                              {/* <td key={v} dragOver={cols[index] === dragOver}>{item.client}</td>
                        <td key={v} dragOver={cols[index] === dragOver}>{item.since}</td>
                        <td key={v} dragOver={cols[index] === dragOver}>${item.totalEarnings}</td>
                        <td key={v} dragOver={cols[index] === dragOver}>${item.availableCredit}</td>
                        <td key={v} dragOver={cols[index] === dragOver}>
                           {item.status ? (
                              <div>active</div>
                           ) : (
                              <div>archived</div>
                           )}
                        </td>
                        <td key={v} dragOver={cols[index] === dragOver}>
                           <div className='open_3dots'>
                              <p
                                 onClick={() => setOpenText(!openText)
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
                              <p
                                 onClick={() => dispatch(removeClient(item.id))}
                              >
                                 3 dots
                              </p>
                           </div>
                        </td> */}
                           </tr>
                           {/* <div><OpenTableViewCell/></div> */}
                        </>
                     );
                  })}
            </tbody>
         </table>
      </div>
   );
};
