import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import DeliveryAddress from './DeliveryAddress';
import OrderSummary from './OrderSummary';
import { Loader } from '../Pages/Loader';  // assume Loader is a spinner component

const steps = ['Login', 'Delivery Address', 'Order Summary', 'Payment'];

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);
  const [orderId, setOrderId] = useState(null);

  // Example loading state (replace with your redux or actual loading logic)
  const [loading, setLoading] = useState(false);

  const step = querySearch.get("step");

  useEffect(() => {
    if (step !== null && !isNaN(step) && step >= 0 && step < steps.length) {
      setActiveStep(Number(step));
    }
  }, [step]);

  const handleNext = () => {
    setLoading(true); // show loader when moving to next step
    setTimeout(() => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setLoading(false);
    }, 500); // simulate async delay
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return <DeliveryAddress setActiveStep={setActiveStep} setOrderId={setOrderId} />;
      case 2:
        return <OrderSummary orderId={orderId} />;
      // case 0:
      //   return <Login />;
      // case 3:
      //   return <Payment />;
      default:
        return <Typography className="text-red-500">Step not implemented</Typography>;
    }
  };

  return (
    <div className="text-[#DCE3E9]">
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <span className="text-[#DCE3E9]">{label}</span>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 2 }}>
          {loading ? (
            <Loader />   // Show loader while loading true
          ) : activeStep === steps.length ? (
            <Typography>All steps completed - you&apos;re finished</Typography>
          ) : (
            <>
              <Typography sx={{ mb: 2 }}>
                Step {activeStep + 1}: {steps[activeStep]}
              </Typography>

              <Box className="my-4">{renderStepContent(activeStep)}</Box>

              <Box>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
}
