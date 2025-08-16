'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      style={{ fontSize: '13px', fontFamily: 'Orbitron, sans-serif' }}
      toastClassName="bg-black border border-green-400 shadow-lg shadow-cyan-500/20"
      bodyClassName="text-red-500 font-orbitron text-sm"
      progressStyle={{ background: 'linear-gradient(to right, #00ffdd, #ff0088)' }}
    />
  );
}