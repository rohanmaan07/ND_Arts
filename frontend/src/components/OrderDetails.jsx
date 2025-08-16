import React from 'react';
import { Grid } from '@mui/material';
import AddressCard from './AddressCard';
import OrderTracker from './OrderTracker';

function OrderDetails() {
  return (
    <>
      <div className='px-5 lg:px-15 text-[#DCE3E9]'>
        <h1 className='font-bold text-xl py-7'>Delivery Address</h1>
        <AddressCard />
      </div>

      <div className="py-20 text-[#DCE3E9]">
        <OrderTracker  activeStep={2} />
      </div>

      <Grid container className="px-5 lg:px-15 text-[#DCE3E9]">
        <Grid
          item
          xs={12}
          className="shadow-xl rounded-md p-5"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            display: 'flex',
          }}
        >
          {/* Image + Info Side by Side */}
          <div className="flex items-center text-[#DCE3E9] w-[90rem] ml-23 ">
            <img
              src="https://rukminim1.flixcart.com/image/612/612/xif0q/shirt/f/z/l/m-white-formal-youthfirst-original-imagqjdfgwjfwgsb.jpeg?q=70"
              alt="Men slim mid rise"
              className="w-[20rem] h-[20rem] object-cover object-top"
            />

            <div className="space-y-2 ml-10">
              <p className="font-bold">Men Slim Mid Rise Black Jeans</p>
              <p className="text-sm text-gray-400">
                Size: <span className="text-[#DCE3E9]">M</span>
              </p>
              <p className="text-sm text-gray-400">
                Seller: <span className="text-[#DCE3E9]">Linaria</span>
              </p>
              <p className="font-semibold">₹1099</p>
            </div>
          </div>

          
        </Grid>
      </Grid>
    </>
  );
}

export default OrderDetails;
