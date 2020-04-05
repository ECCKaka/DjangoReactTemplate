import React from 'react';
import './style.css'
import AppLayout from '../../layout'

// this page shows up when app not found
export default function AppNotFound() {
  return (
    <AppLayout
      style={{
        backgroundColor: 'white',
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <img
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
          alt="404"
          src={'/images/404.png'}
        />
      </div>
    </AppLayout>

  )
}
