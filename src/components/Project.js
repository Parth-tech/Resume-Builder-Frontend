import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class Project extends Component {

    state={
        continueDisabled: true,

        proj1_title: '',
        proj1_title_helperText: '',
        proj1_link: '',
        proj1_link_helperText: '',
        proj1_desc: '',
        proj1_desc_helperText: '',

        proj2_title: '',
        proj2_link: '',
        proj2_desc: '',
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    toggleContinueButton = () => {
        if (
          this.state.proj1_title.length !== 0 &&
          this.state.proj1_link.length !== 0 &&
          this.state.proj1_desc.length !== 0
        ) {
          if (
            this.state.proj2_title === "" &&
            this.state.proj2_link === "" &&
            this.state.proj2_desc === "" 
          ) {
            // console.log("exp1 crrt exp 2 null", this.state);
            this.setState({
              continueDisabled: false,
            });
          } else if (
            this.state.proj2_title.length !== 0 &&
            this.state.proj2_link.length !== 0 &&
            this.state.proj2_desc.length !== 0
          ) {
            this.setState({
              continueDisabled: false,
            });
          } else {
            this.setState({
              continueDisabled: true,
            });
          }
        } else if (
          this.state.proj1_title.length !== 0 ||
          this.state.proj1_link.length !== 0 ||
          this.state.proj1_desc.length !== 0
        ) {
          this.setState({
            continueDisabled: true,
          });
        }
    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();        
        this.props.handleChange("step3Continue", true);
    }

    storeData = (field) => (e) => {
        let value = e.target.value;
        if(field==="proj1_title"){
          if(value===''){
            this.setState({
              proj1_title_helperText:'Please fill this field.'
            })
          }
          else
            this.setState({
              proj1_title_helperText:''
            })
        }
        if(field==="proj1_link"){
          if(value===''){
            this.setState({
              proj1_link_helperText:'Please fill this field.'
            })
          }
          else
            this.setState({
              proj1_link_helperText:''
            })
        }
        if(field==="proj1_desc"){
          if(value===''){
            this.setState({
              proj1_desc_helperText:'Please fill this field.'
            })
          }
          else
            this.setState({
              proj1_desc_helperText:''
            })
        }
        this.setState({
            [field]: value,
          },()=>{this.toggleContinueButton()});
    }

    componentDidMount = () => {
        const { values } = this.props;
        console.log(values);
        if (values.step3Continue)
          this.setState({
            continueDisabled: false,
            proj1_title: values.proj1_title,
            proj1_link: values.proj1_link,
            proj1_desc: values.proj1_desc,

            proj2_title: values.proj2_title,
            proj2_link: values.proj2_link,
            proj2_desc: values.proj2_desc, 
          });
      };

    render() {
        const { values, handleChange } = this.props;
        return (
            <div className="card animated fadeInLeft">
                <div className="card-body">

                    <h3 className="card-title">Projects' Info</h3>
                    <hr />
                </div>
                <form onSubmit={this.continue}>  
                    <div className="row col-lg-10 mx-auto">
                        <div className="col-lg-12 text-left">
                            <h3><b><i className="fas fa-check-circle mr-1"></i>1</b></h3>
                        </div>
                        <div className="col-lg-6 text-left">
                            {/* <label>Title*</label> */}
                            <TextField 
                            error={this.state.proj1_title_helperText.length!==0?true:false}
                            helperText={this.state.proj1_title_helperText}
                            label="Title*" 
                            placeholder="Title*" 
                            className="form-control" 
                            variant="outlined"
                            defaultValue={values.status === 1 ? '' : values.proj1_title} 
                            onChange={this.storeData("proj1_title")} 
                            onBlur={e => handleChange("proj1_title",e.target.value)} 
                            // required 
                            />                            
                            {window.screen.width<=991?  <div><br/><br/></div>: ''}
                        </div>
                            
                        <div className="col-lg-6 text-left">
                            {/* <label>Link</label> */}
                            <TextField 
                            error={this.state.proj1_link_helperText.length!==0?true:false}
                            helperText={this.state.proj1_link_helperText} 
                            label="Link*" 
                            placeholder="Link*" 
                            className="form-control" 
                            variant="outlined"
                            defaultValue={values.status === 1 ? '' : values.proj1_link} 
                            onChange={this.storeData("proj1_link")} 
                            onBlur={e => handleChange("proj1_link",e.target.value)} 
                            />
                        </div>
                        
                    </div>
                    <br/>
                    <br />
                    <div className="row col-lg-10 mx-auto">
                        <div className="col-lg-12 text-left">
                            {/* <label>Description*</label> */}
                            <TextField 
                            error={this.state.proj1_desc_helperText.length!==0?true:false}
                            helperText={this.state.proj1_desc_helperText}  
                            label="Description*" 
                            placeholder="Description*" 
                            className="form-control" 
                            variant="outlined"
                            defaultValue={values.status === 1 ? '' : values.proj1_desc} 
                            onChange={this.storeData("proj1_desc")} 
                            onBlur={e => handleChange("proj1_desc",e.target.value)} 
                            // required 
                            />
                        </div>
                    </div>

                    <br />                    
                    <br />                    
                    <br />                    

                    <div className="row col-lg-10 mx-auto">
                        <div className="col-lg-12 text-left">
                            <h3><b><i className="fas fa-check-circle mr-1"></i>2</b></h3>
                            <hr/>
                        </div>
                        <div className="col-lg-6 text-left">
                            {/* <label>Title*</label> */}
                            <TextField 
                            placeholder="Title" 
                            label="Title" 
                            variant="outlined"
                            className="form-control"
                            defaultValue={values.status === 1 ? '' : values.proj2_title} 
                            onChange={this.storeData("proj2_title")} 
                            onBlur={e => handleChange("proj2_title",e.target.value)} 
                            // required 
                            />                            
                            {window.screen.width<=991?  <div><br/><br/></div>: ''}
                        </div>
                        <div className="col-lg-6 text-left">
                            {/* <label>Link</label> */}
                            <TextField 
                            placeholder="Link" 
                            label="Link" 
                            variant="outlined"
                            className="form-control" 
                            defaultValue={values.status === 1 ? '' : values.proj2_link} 
                            onChange={this.storeData("proj2_link")} 
                            onBlur={e => handleChange("proj2_link",e.target.value)} 
                            />
                        </div>
                        
                    </div>
                    <br/>
                    <br />
                    <div className="row col-lg-10 mx-auto">
                        <div className="col-lg-12 text-left">
                            {/* <label>Description*</label> */}
                            <TextField 
                            placeholder="Description" 
                            label="Description" 
                            variant="outlined"
                            className="form-control" 
                            defaultValue={values.status === 1 ? '' : values.proj2_desc} 
                            onChange={this.storeData("proj2_desc")} 
                            onBlur={e => handleChange("proj2_desc",e.target.value)} 
                            required 
                            />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="container text-center">
                        <Button 
                        style={{ color: "white" , marginRight:20}}
                        className="btn btn-info" 
                        onClick={this.back}><i className="fas fa-angle-left mr-1"></i>Back</Button>
                        <Button 
                        onClick={this.continue}
                        style={{ color: "white" }}
                        disabled={this.state.continueDisabled}
                        className="btn btn-info">Next<i className="fas fa-angle-right ml-1"></i></Button>
                    </div>
                    <br />
                </form>
            </div>
        )
    }
}

export default Project;
