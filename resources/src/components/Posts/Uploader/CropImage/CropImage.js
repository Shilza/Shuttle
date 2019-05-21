import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

class CropImage extends PureComponent {
    state = {
        crop: {
            aspect: 1,
            width: 200,
            minWidth: 50,
            x: 0,
            y: 0
        }
    };

    onImageLoaded = (image, crop) => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = crop => {
        this.setState({crop});
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                "newFile.jpeg"
            );
            this.props.setCroppedMedia(croppedImageUrl);
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error("Image crop error. Canvas is empty");
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, "image/jpeg");
        });
    }

    render() {
        const {crop} = this.state;

        return (
            <ReactCrop
                src={this.props.src}
                crop={crop}
                style={{width: 500}}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
            />
        );
    }
}


export default CropImage;

CropImage.propTypes = {
    src: PropTypes.string.isRequired,
    setCroppedMedia: PropTypes.func.isRequired
};
