import React from "react";

const Main = ({children, location}) => (
    <main style={{minHeight: '100%', height: 'auto'}}>
        <div style={{paddingBottom: '40px'}}>
            {children}
        </div>
    </main>
);

export default Main;