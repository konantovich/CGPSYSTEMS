import React from 'react';

import './open-table-view.scss';

export const OpenTableViewCell = (props) => {
   return (
      <div className='bottom_part'>
         <div className='bottom_part__left_part'></div>
         <div className='bottom_part__right_part'>
            <p>Total Earnings</p>
            <h1>${}</h1>
         </div>
      </div>
   );
};
