import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
   removeClient,
   changeStatus,
   openRow,
   addToArchive,
   openMiniModal
} from '../../redux/slices/clients';
// import { name, internet, date } from "faker";
// const columns = [
//   'Client',
//   'Since',
//   'total Earnings',
//   'Available Credit',
//   'Status',
//   ''
// ];

import arrow from './arrow.png';
import threedots from './3dots.png';
import deleteIcon from './delete.png';
import archive from './archive.png';

import './table-view.scss';

const ModalButtons = ({ children, row, open, status }) => {
   const dispatch = useDispatch();

   const [openDeleteArchive, setOpenDeleteArchive] = React.useState(false);
   const [hoverModal, setHoverModal] = React.useState(false)

   const clients = useSelector((state) => state.clients.clients.items);



   const ref = React.useRef(null);


   const el = document.getElementById("container");

   function handleClickOne() {
      return setOpenDeleteArchive(false)
   }
   const handleClick = event => {
      
    console.log('Button clicked');
  };

   React.useEffect(() => {

    const element = ref.current;
    

    if (!hoverModal) {
      // el.addEventListener("click", () => handleClickOne() , false);
     console.log(hoverModal)
    } else {
      console.log(hoverModal)
      element.addEventListener("click", handleClick )

    }

    // const element = ref.current;


    // 👇️ remove the event listener when component unmounts
    return () => {
      el.removeEventListener('click', handleClick);
    };
  }, [hoverModal]);

    
  
   //  const el2 = document.getElementById("modalwindow");
   //  if(el2) {
   //   el2.addEventListener("click", () => console.log(), false);
   //  }

  //  document.addEventListener(
  //   "click",
  //   function(event) {
  //     // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
  //     if (
  //       event.target.matches(".container") ||
  //       !event.target.closest(".container")
  //     ) {
  //       closeModal()
  //     }
  //   },
  //   false
  // )
  
  // function closeModal() {
  //   document.querySelector(".mini_modalimage_container").style.display = "none"
  // }



  const findedClient  = () => {
    console.log('clients.filter(o => o.id === row).open',clients.filter(o => o.id === row))
    return clients.filter(o => o.id === row)
  }



   return (
    <> 
      <div className='open_3dots' id='modalwindow'>
      <div className={hoverModal || !openDeleteArchive ? 'modalmini' : 'modalmini active'} onClick={() => setOpenDeleteArchive(false)} ></div>
         <p

            className={!findedClient().open  ? 'open_row' : 'open_row close_row'}
            onClick={() => dispatch(openRow({ open: open, id: row }))}
         >  
            <img src={arrow} alt='' />
         </p>

         <p className='three_dots'>
            {/* <div
               className='mini_modalimage_container'
               onClick={() => dispatch(openMiniModal(row))}
                //setOpenDeleteArchive(false)}
            >  </div> */}
               <img
                  src={threedots}
                  alt=''
                  onClick={() => setOpenDeleteArchive(!openDeleteArchive)}
               />
          
            {openDeleteArchive  && (
               <div onMouseEnter={() => setHoverModal(true)} onMouseLeave={() => setHoverModal(false)}  className='delete_archive_container'>
                
                  <p onClick={() => dispatch(removeClient(row))} ref={ref}>
                     <img src={deleteIcon} alt='' /> <p>Delete</p>
                  </p>
                  <p
                     onClick={function(){

                      dispatch(addToArchive({ status: status, id: row }))
                      setOpenDeleteArchive(false)
                     }
                     }
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
        //  Id: clientsInfo.id,
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
            ></ModalButtons>
         )
      });
   }

   return {
      data: rows,
      columns: Object.keys(rows[0])
   };
};

export default generateData;
