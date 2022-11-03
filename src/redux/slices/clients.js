//reducer === slice in reduxjs/toolkit
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import clientsApi from '../../clientsApi';

//ASYNC FROM FAKE API
export const fetchClients = createAsyncThunk(
   'clients/fetchClients',
   async () => {
      const data = await clientsApi;
      return data;
   }
);

//REDUCER
const initialState = {
   clients: {
      items: [],
      status: 'loading'
   },
   totalEarningsCount: 0
};

const clientsSlice = createSlice({
   name: 'clients',
   initialState,
   reducers: {
      addClient: (state, action) => {
         state.clients.items.push(action.payload);
      },
      removeClient: (state, action) => {
         state.clients.items = state.clients.items.filter(
            (item) => item.id !== action.payload
         );
      },
      openRow: (state, action) => {
         state.clients.items.map((element, index) => {
            return (element.open = false);
         });
         state.clients.items.find((o) => o.id === action.payload.id).open =
            !action.payload.open;
      },

      closeAllRow: (state, action) => {
         state.clients.items.map((element, index) => {
            return (element.open = false);
         });
      },

      addToArchive: (state, action) => {
         state.clients.items.find((o) => o.id === action.payload.id).status =
            !action.payload.status;
      },

      priceCount: (state) => {
         state.totalEarningsCount = state.clients.items.reduce(
            (price, item) => price + item.totalEarnings,
            0
         );
      },
      openMiniModal: (state, action) => {
         state.clients.items.map((element, index) => {
            return (element.openMiniModal = false);
         });

         state.clients.items.find(
            (o) => o.id === action.payload.id
         ).openMiniModal = !action.payload.openMiniModal;
      }
   },
   //FOR ASYNC
   extraReducers: {
      [fetchClients.pending]: (state) => {
         state.clients.items = [];
         state.clients.status = 'loading';
      },
      [fetchClients.fulfilled]: (state, action) => {
         state.clients.items = action.payload;

         state.clients.status = 'loaded';
      },
      [fetchClients.rejected]: (state) => {
         state.clients.items = [];
         state.clients.status = 'error';
      }
   }
});

export const clientsReducer = clientsSlice.reducer;

export const {
   addClient,
   removeClient,
   priceCount,
   changeStatus,
   addToArchive,
   openRow,
   closeAllRow,
   openMiniModal
} = clientsSlice.actions;
