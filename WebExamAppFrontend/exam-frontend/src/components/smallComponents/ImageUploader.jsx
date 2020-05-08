import React, { Component } from 'react';

class ImageUploader extends Component {
    state =
    { 
        file: '',
        imagePreviewUrl: '',
    }
    
    
    handleSubmit(event) 
    {
        event.preventDefault();
        console.log(this.state.file);
        this.sendImageToApi(this.state.file,"any",1);
        //this.props.GetImage(this.state.file);
    }
    sendImageToApi(file,option, contextId)
    {
        //context sera o la pregunta o la op
        const formData = new FormData();
        formData.append('user','abc123');
        formData.append('img1',file);
        let context= this;
        fetch('http://localhost:51061/api/Images',
            {
                method: 'POST',
                headers:{
                    'Accept':'multipart/form-data',
                    'content-Type': 'multipart/form-data',
                },
                body : file
            });
    }

    handleImageChange(event) 
    {
        event.preventDefault();
    
        let reader = new FileReader();
        let file = event.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file,
            imagePreviewUrl: reader.result
          });
        };
    
        reader.readAsDataURL(file);
    }
    
    render() 
    {
        let {imagePreviewUrl} = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) 
        {
            imagePreview = (<img src={imagePreviewUrl} />);
        } 
        else 
        {
            imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return (
          <div className="previewComponent">
            <form onSubmit={(event) => this.handleSubmit(event)}>
              <input className="fileInput" 
                type="file" 
                onChange={(event)=>this.handleImageChange(event)} />
              <button 
                className="submitButton" 
                type="submit"
                >Upload Image
                </button>
            </form>
            <div className="imgPreview">
              {imagePreview}
            </div>
          </div>
        );
    }
}
 
export default ImageUploader;