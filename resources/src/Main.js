import React from "react";
import Header from "./components/Header/Header";

const Main = ({children}) => (
    <main style={{minHeight: '100%', height: 'auto'}}>
        <Header/>
        {children}
    </main>
);

export default Main;