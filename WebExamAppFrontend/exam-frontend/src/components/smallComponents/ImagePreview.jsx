import React, { Component } from 'react';
import {API_URL} from '../Globals';
class ImagePreview extends Component {
    state = {
        fetchedImage : null,
      }

    constructor(props)
    {
        super(props);
        this.FetchImage();
      }

    renderFetchedImage = () =>
    {
        if(this.state.fetchedImage == null)
            return null;
        const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />
        return <Example data= {this.state.fetchedImage.imgData}/>
    }

    FetchImage = () => 
    {
        fetch(API_URL+'Images/'+this.props.contextId
        +'&context='+this.props.option)
        .then(result=> result.json())
        .then((data)=>{
            this.setState({fetchedImage: data});
        }).catch(()=>{})
    }

    GetImageBody =()=>
    {
        let imagePreview = this.renderFetchedImage();
        if(imagePreview == null)
        {
            return null;
        }
        else
            return (
            <div className="imgPreview">
                {imagePreview}
            </div>);
    }

    render() { 
        return ( 
            this.GetImageBody()
        );
    }
}
 
export default ImagePreview;