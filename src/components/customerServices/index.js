import React from 'react';
import AppLayout from '../../layout';
import { useRef, useEffect, useState } from "react";
import "./style.css";
import 'antd/dist/antd.css';
import { Card } from 'antd';

export default function CustomerServices(eventId) {

  return (
    <AppLayout
      style={{
        marginTop: '40px',
      }}
    >
      <div className="divClass">
        <Card
          title={
            <span className="cardTitle">
              Contact Canada Training Group
            </span>}
          className="card"
          bordered={false}
        >
          <span className="company">
            Canada Training Group Inc.
          </span>
          <p></p>
          <p className="text">102 First Avenue</p>
          <p className="text">Box 340</p>
          <p className="text">Turtleford, Saskatchewan</p>
          <p className="text">Postal Code: S0M 2Y0</p>
          <p className="text">Ph. 1.306.845.3200</p>
          <a href={"mailto:"} className="link">
            info@canada-training-group.ca
          </a>
        </Card>
      </div>
    </AppLayout>

  )
}
