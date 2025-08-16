import React from 'react';
import { Loader } from '../Pages/Loader';

const AddressCard = ({ address, loading }) => {
  if (loading) {
    return <Loader />;  // Loader dikhao jab loading true ho
  }

  if (!address) {
    // Agar address undefined/null ho toh fallback UI
    return <p className="text-[#DCE3E9]">No address available</p>;
  }

  return (
    <div>
      <div className="space-y-3 text-[#DCE3E9]">
        <p className="font-bold">{`${address.firstname || ''} ${address.lastname || ''}`.trim()}</p>
        <p className="opacity-70">
          {[address.state, address.streetAddress, address.zipcode]
            .filter(Boolean)
            .join(', ')}
        </p>

        <div className="space-y-1 opacity-70">
          <p className="font-semibold">Phone Number</p>
          <p>{address.mobile || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
