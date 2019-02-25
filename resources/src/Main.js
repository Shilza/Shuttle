import React from "react";
import CommentsModal from "./components/Comments/Modal/CommentsModal";

const mainStyle = {minHeight: '100%', height: 'auto'};
const childStyle = {paddingBottom: '40px'};

const Main = ({children}) => (
    <main style={mainStyle}>
        <div style={childStyle}>
            {children}
        </div>
        <CommentsModal/>
    </main>
);

export default Main;