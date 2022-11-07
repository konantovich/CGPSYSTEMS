import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import generateData from './generate-data';

import { fetchClients, closeAllRow } from '../../redux/slices/clients';

import './table-view.scss';

import { ArrowCol } from '../../images/arrow-col';

export const TableView = ({ searchValue }) => {
   const dispatch = useDispatch();

   const clients = useSelector((state) => state.clients.clients.items);
   const [clientsLoaded, setClientsLoaded] = useState(false);

   //First load fetch data
   React.useEffect(() => {
      dispatch(fetchClients());
      setCols(generateData(filteredData).columns);
      setRows(generateData(filteredData).data);
   }, []);

   //Search Filter
   const filteredData = clients.filter((el) => {
      if (searchValue === '') {
         return el;
      } else {
         return el.client.toLowerCase().includes(searchValue.toLowerCase());
      }
   });

   //Find Client By Id
   const findClient = (id) => {
      return clients.find((o) => o.id === id);
   };

   React.useEffect(() => {
      if (clients) {
         if (!cols) setCols(generateData(filteredData).columns);

         setRows(generateData(filteredData).data);
      }
   }, [clients, clientsLoaded, searchValue]);

   
   //DRAG COLS
   const [cols, setCols] = useState(generateData(filteredData).columns);
   const [rows, setRows] = useState(generateData(filteredData).data);
   const handleDragStart = (e) => {
      const { id } = e.target;
      const idx = cols.indexOf(id);
      e.dataTransfer.setData('colIdx', idx);
   };
   const handledragover = (e) => e.preventDefault();
   const handleOnDrop = (e) => {
      const { id } = e.target;

      const droppedColIdx = cols.indexOf(id);
      const draggedColIdx = e.dataTransfer.getData('colIdx');
      const tempCols = [...cols];

      if (+draggedColIdx === 6 || id === '') {
         return;
      }
      tempCols[draggedColIdx] = cols[droppedColIdx];
      tempCols[droppedColIdx] = cols[draggedColIdx];
      setCols(tempCols);
   };

   return (
      <div className='container'>
         <table>
            <thead>
               <tr>
                  {cols &&
                     cols.map((col, index) => (
                        <th
                           id={col}
                           key={col}
                           draggable
                           onDragStart={handleDragStart}
                           onDragOver={handledragover}
                           onDrop={handleOnDrop}
                           className='clienthover'
                        >
                           {col}
                           <ArrowCol />
                        </th>
                     ))}
               </tr>
            </thead>
            <tbody>
               {rows &&
                  rows.map((row, index) => (
                     <React.Fragment key={index}>
                        <tr className='rows'>
                           {Object.entries(row).map(([k, v], idx) => (
                              <td key={idx}>{row[cols[idx]]}</td>
                           ))}
                        </tr>

                        <tr className='bottom_open'>
                           {findClient(row.Id) &&
                              findClient(row.Id).open === true && (
                                 <>
                                    <td>
                                       <div className='dop_cell'></div>
                                    </td>
                                    <td className='dop-window'>
                                       <div className='dop_client'>
                                          <p>Client</p>
                                          <h2>{row.Client}</h2>
                                       </div>

                                       <div className='dop_contact'>
                                          <p>Main Contact</p>
                                          <h2>
                                             {' '}
                                             {findClient(row.Id).mainContact}
                                          </h2>
                                       </div>

                                       <div className='dop_notes'>
                                          <p>Notes</p>
                                          <h5>
                                             {' '}
                                             {findClient(row.Id).notes || ''}
                                          </h5>
                                       </div>

                                       <div className='dop_total'>
                                          <h4>Total Earnings</h4>
                                          <div className='cost_number'>
                                             <h1>
                                                $
                                                {
                                                   findClient(row.Id)
                                                      .totalEarnings
                                                }
                                             </h1>
                                             <h5>.00</h5>
                                          </div>

                                          <div className='dop_status'>
                                             {findClient(row.Id).status ? (
                                                <div className='status_active'>
                                                   <p>Active</p>
                                                </div>
                                             ) : (
                                                <div className='status_archived'>
                                                   <p>Archived</p>
                                                </div>
                                             )}
                                          </div>
                                       </div>
                                    </td>
                                 </>
                              )}
                        </tr>
                     </React.Fragment>
                  ))}
            </tbody>
         </table>
      </div>
   );
};
