import React, { Children } from 'react';
import Header from '../../molecules/Header';

const DefaultLayout: React.FC = ({ children }) => (
  <div className="w-full h-full flex justify-center align-middle flex-col">
    <div className="flex-shrink-0">
      <Header />
    </div>
    <div className="flex flex-grow flex-row justify-center align-middle">{children}</div>
  </div>
);

export default DefaultLayout;
