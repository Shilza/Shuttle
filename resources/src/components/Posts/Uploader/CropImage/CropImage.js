import React from "react";

class CropImage extends React.Component {
    render() {
        return (
            <div className={'crop-cont'}>
                <img src={this.props.src}
                    className="crop-image" alt=""/>
            </div>
        );
    }
}

export default CropImage;