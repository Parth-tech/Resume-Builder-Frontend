import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import axios from 'axios';
import { saveAs } from 'file-saver';

class Extras extends Component {

    state={
        downloadDisabled:false,
        hobbies:'',
        hobbies_helperText:'',
        lang:'',
        lang_helperText:'',
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    formSubmit = (e) => {
        e.preventDefault();
        this.props.submitted();
        this.props.nextStep();
        const data = this.props.values;

        axios.post('http://resume-builder-nodebackend.herokuapp.com/create-pdf', data)
            .then(() => axios.get('http://resume-builder-nodebackend.herokuapp.com/fetch-pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                saveAs(pdfBlob, 'Resume.pdf');
            });
        // e.target.reset();
    }

    toggleDownloadBtn = () => {
        if(this.state.hobbies.length!==0 && this.state.lang.length!==0){
            this.setState({
                downloadDisabled:false
            })
        }
    }

    storeData = field => e => {
        let value = e.target.value
        if(field==='lang'){
            if(value===''){
                this.setState({lang_helperText:'Please fill this field.'})
            }
            else{
                this.setState({lang_helperText:''})
            }
            this.setState({
                lang:value
            },()=>this.toggleDownloadBtn())
        }
        if(field==='hobbies'){
            if(value===''){
                this.setState({hobbies_helperText:'Please fill this field.'})
            }
            else{
                this.setState({hobbies_helperText:''})
            }
            this.setState({
                hobbies:value
            },()=>this.toggleDownloadBtn())
        }
    }

    render() {
        const { values, handleChange } = this.props;
        return (
            <div className="card animated fadeInLeft">
                <div className="card-body">
                    <h3 className="card-title">Miscellaneous</h3>
                    <hr />
                </div>
                <form >
                    <div className="row col-lg-10 mx-auto">

                        <div className="col-lg-6 text-left">
                            <TextField   
                            onChange={this.storeData("lang")}  
                            error={this.state.lang_helperText.length!==0?true:false}
                            helperText={this.state.lang_helperText}
                            label="Languages*" 
                            placeholder="Languages* (comma seperated)" 
                            variant="outlined"
                            className="form-control" 
                            defaultValue={values.status === 1 ? '' : values.lang}
                            onBlur={e => handleChange("lang",e.target.value)} 
                            />
                            {window.screen.width<=991?  <div><br/><br/></div>: ''}
                        </div>
                        <div className="col-lg-6 text-left">
                            <TextField     
                            error={this.state.hobbies_helperText.length!==0?true:false}
                            helperText={this.state.hobbies_helperText}
                            onChange={this.storeData("hobbies")}   
                            label="Hobbies*" 
                            placeholder="Hobbies* (comma seperated)" 
                            variant="outlined"
                            className="form-control" 
                            defaultValue={values.status === 1 ? '' : values.hobbies} 
                            onBlur={e => handleChange("hobbies",e.target.value)} 
                            />
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="row col-lg-10 mx-auto">

                        <div className="col-lg-6 text-left">
                            <TextField 
                            label="Activity/Achievement" 
                            placeholder="Activity/Achievement" 
                            variant="outlined"
                            className="form-control" 
                            defaultValue={values.status === 1 ? '' : values.achieve_1} 
                            onBlur={e => handleChange("achieve_1",e.target.value)} 
                            />
                            {window.screen.width<=991?  <div><br/><br/></div>: ''}
                        </div>
                        <div className="col-lg-6 text-left">
                            <TextField 
                            label="Activity/Achievement" 
                            placeholder="Activity/Achievement" 
                            variant="outlined"
                            className="form-control" 
                            defaultValue={values.status === 1 ? '' : values.achieve_2} 
                            onBlur={e => handleChange("achieve_2",e.target.value)} 
                            />
                            {/* <label htmlFor="extra_4">Activity/Achievement</label> */}
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="row col-lg-10 mx-auto">
                        <div className="col-lg-12 text-left">
                            <TextField 
                            label="Activity/Achievement" 
                            placeholder="Activity/Achievement" 
                            variant="outlined"
                            className="form-control" 
                            defaultValue={values.status === 1 ? '' : values.achieve_3} 
                            onBlur={e => handleChange("achieve_3",e.target.value)} 
                            // onChange={handleChange} 
                            // required
                            />
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div className="container text-center">
                        <Button 
                            style={{ color: "white" , marginRight:20}}
                            className="btn btn-info" 
                            onClick={this.back}
                        >
                            <i className="fas fa-angle-left mr-1"></i>
                            Back
                        </Button>

                        <Button 
                            disabled={this.state.downloadDisabled}
                            onClick={this.formSubmit}
                            style={{ color: "white" }}
                            className="btn btn-info"
                        >
                            Download PDF<i className="fas fa-download ml-1"></i>
                        </Button>

                    </div>
                    <br />
                </form>
            </div>

        )
    }
}

export default Extras;
