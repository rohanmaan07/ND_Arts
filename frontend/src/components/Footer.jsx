import React from 'react';
import { Grid, Typography } from '@mui/material';

const Footer = () => {
  return (
    <div>
      <Grid
        container
        className="bg-black text-white mt-10"
        sx={{ bgcolor: 'black', color: 'white', py: 6 }}
        justifyContent="space-evenly"
      >
        {/* Company */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography className="pb-6 text-center md:text-left" variant="h6">Company</Typography>
          <ul className="space-y-3 text-sm text-gray-300 text-center md:text-left">
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Partners</a></li>
          </ul>
        </Grid>

        {/* Solutions */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography className="pb-6 text-center md:text-left" variant="h6">Solutions</Typography>
          <ul className="space-y-3 text-sm text-gray-300 text-center md:text-left">
            <li><a href="#">Marketing</a></li>
            <li><a href="#">Analytics</a></li>
            <li><a href="#">Commerce</a></li>
            <li><a href="#">Insights</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </Grid>

        {/* Documentation */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography className="pb-6 text-center md:text-left" variant="h6">Documentation</Typography>
          <ul className="space-y-3 text-sm text-gray-300 text-center md:text-left">
            <li><a href="#">Guides</a></li>
            <li><a href="#">API Status</a></li>
          </ul>
        </Grid>

        {/* Legal */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography className="pb-6 text-center md:text-left" variant="h6">Legal</Typography>
          <ul className="space-y-3 text-sm text-gray-300 text-center md:text-left">
            <li><a href="#">Claim</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
          </ul>
        </Grid>
      </Grid>
      <div className="bg-black text-center text-sm text-gray-400 py-6 px-3">
        © 2025 My Company. All rights reserved. <br />
        Made with love by Rohan. <br />
      </div>
    </div>
  );
};

export default Footer;
