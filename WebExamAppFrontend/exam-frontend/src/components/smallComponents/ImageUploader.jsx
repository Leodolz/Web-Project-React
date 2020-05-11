import React, { Component } from 'react';

class ImageUploader extends Component {
    state =
    { 
        file: '',
        imagePreviewUrl: '',
        fetchedImage : null,
    }

    constructor(props)
    {
        super(props);
        this.FetchImage();
    }

    FetchImage = () => 
    {
        fetch('http://localhost:51061/api/Images/'+1)
        .then(result=>result.json())
        .then((data)=>{
            this.setState({fetchedImage: data});
        })
        .catch((e)=>{
            console.log(e)});
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
        let params = new URLSearchParams();
        params.append('contextId',contextId);
        params.append('option',option)
        fetch('http://localhost:51061/api/Images?'+params.toString(),
            {
                method: 'POST',
                body : file,
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


    renderFetchedImage = () =>
    {
        if(this.state.fetchedImage == null)
            return null;
        const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />
        return <Example data= {this.state.fetchedImage.imgData}/>
    }
    render() 
    {
        let fetchedImage = this.renderFetchedImage();
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
            <div>
                {fetchedImage}
            </div>
          </div>
        );
    }
}
 
export default ImageUploader;