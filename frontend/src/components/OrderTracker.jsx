import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const OrderTracker = ({ activeStep }) => {
  const steps = ['Placed', 'Shipped', 'Out for Delivery', 'Delivered'];

  return (
    <div className="w-full">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                '& .MuiStepLabel-label': {
                  color: '#DCE3E9', // default color
                  fontSize: '14px',
                  fontWeight: 'bold',
                },
                '& .MuiStepLabel-label.Mui-completed': {
                  color: '#DCE3E9', // completed step
                },
                '& .MuiStepLabel-label.Mui-active': {
                  color: '#DCE3E9', // active step
                },
                '& .MuiStepLabel-label.Mui-disabled': {
                  color: '#DCE3E9', // future/inactive steps
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTracker;
