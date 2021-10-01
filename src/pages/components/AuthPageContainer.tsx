import React from 'react';

export default ({ children, title }: {children: React.ReactElement, title: string}) => (
  <div className="auth-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center" style={{ margin: '4rem' }}>{title}</h1>
          {children}
        </div>
      </div>
    </div>
  </div>
);
