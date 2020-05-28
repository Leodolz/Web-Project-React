import React, { Component } from 'react';
import Switch from './Switch';
import {API_URL} from '../Globals';

class ImageUploader extends Component {
    state =
    { 
        file: '',
        imagePreviewUrl: '',
        fetchedImage : null,
        option: this.props.option,
        contextId: this.props.contextId,
        selectImage: false,
        changedValues: false,
    }

    constructor(props)
    {
        super(props);
        if(props.viewMode == true)
            this.state.selectImage = true;

        this.FetchImage();
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
    
    
    handleSubmit(event) 
    {
        event.preventDefault();
        let replaced = false;
        const {fetchedImage, imagePreviewUrl} = this.state;
        console.log(this.state.file);
        const {option,contextId} = this.state;
        if(imagePreviewUrl!='')
        {
            if(fetchedImage)
                replaced=true;
        this.sendImageToApi(this.state.file,option,contextId,replaced);
        }
    }
    sendImageToApi(file,option, contextId, edit)
    {
        let params = new URLSearchParams();
        params.append('contextId',contextId);
        params.append('option',option);
        params.append('edit',edit);
        console.log(API_URL+'Images/'+params.toString());
        fetch(API_URL+'Images/'+params.toString(),
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

    handleToggle = (selectImage) =>
    {
        let changedValues = true;
        this.setState({selectImage,changedValues});
    }

    renderFetchedImage = () =>
    {
        if(this.state.fetchedImage == null)
            return null;
        const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />
        return <Example data= {this.state.fetchedImage.imgData}/>
    }
    GetImageBody =()=>
    {
        if(this.state.selectImage==false)
            return null;
        const {imagePreviewUrl,fetchedImage} = this.state;
        let imagePreview = null;
        if (imagePreviewUrl!='') 
        {
            imagePreview = (<img src={imagePreviewUrl} />);
        } 
        else if(fetchedImage && imagePreviewUrl=='')
        {
            imagePreview = this.renderFetchedImage();
        }
        else 
        {
            imagePreview = (<div className="previewText"></div>);
        }
        if(this.props.viewMode == true)
            return (<div className="imgPreview">
                {imagePreview}
            </div>);
        return(
                <>
                    <div className="previewComponent">
                        <form onSubmit={(event) => this.handleSubmit(event)}>
                        <input className="fileInput" 
                            type="file" 
                            onChange={(event)=>this.handleImageChange(event)} />
                        <button 
                            className="submitButton" 
                            type="submit"
                            >Save Image
                            </button>
                        </form>
                        <div className="imgPreview">
                        {imagePreview}
                        </div>
                    </div>
                </>
            );
    }
    componentDidUpdate()
    {
        if(this.state.changedValues)
        {
            this.props.reloadAccordions();
            this.setState({changedValues:false});
        }
    }
    render() 
    {
        const {selectImage} = this.state;
        let switchButton = (
            <Switch 
                    label={"Include image"}
                    isSelected={selectImage}
                    activeColor='#06D6A0'
                    id = {this.props.id}
                    handleToggle={(event)=>this.handleToggle(event)}
                />
        );
        if(this.props.viewMode == true)
            switchButton = null;
        return (
        <>
            {switchButton}
            {this.GetImageBody()}
        </>
        );
    }
}
 
export default ImageUploader;