"use client"
import React from 'react';
import { ToastContainer, toast } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css'; // import css file from root.

 const Alert = () => {
  // toast methods : info | success | warning | error
  const alertInfo = () => toast.info('info');
  const alertSuccess = () => toast.success('success');
  const alertWarning = () => toast.warning('warning');
  const alertError = () => toast.error('error');

  return (
    <div>
      <button onClick={alertInfo}>Info</button>
      <button onClick={alertSuccess}>Success</button>
      <button onClick={alertWarning}>Warning</button>
      <button onClick={alertError}>Error</button>

      <ToastContainer floatingTime={5000} />
    </div>
  );
}

// const admin = () => {
//   return (
//     <>
//       <Alert />
//       {/* Add ToastContainer from your root component. */}
//       {/* If you use next.js, add it to app.js */}
//       {/* If no floatingTime, the default is 3000ms. */}
      
//     </>
//   );
// }




export default Alert