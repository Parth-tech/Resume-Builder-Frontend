import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class Education extends Component {

    state = {
        continueDisabled: true,

        edu1_school: '',
        edu1_school_helperText: '',
        edu1_year: '',
        edu1_year_helperText:'',
        edu1_qualification: '',
        edu1_qualification_helperText: '',
        edu1_desc: '',
        edu1_desc_helperText: '',

        edu2_school: '',
        edu2_year: '',
        edu2_year_helperText:'',
        edu2_qualification: '',
        edu2_desc: '',
    }

    validateGradYear = (duration) => {
        return parseInt(duration)>=1950 && parseInt(duration)<=(new Date().getFullYear()+4)
        ? true 
        : false
    };

    toggleContinueButton = () => {
        if (
          this.state.edu1_school.length !== 0 &&
          this.validateGradYear(this.state.edu1_year) &&
          this.state.edu1_qualification.length !== 0 &&
          this.state.edu1_desc.length !== 0
        ) {
          if (
            this.state.edu2_school === "" &&
            this.state.edu2_year === "" &&
            this.state.edu2_desc === "" &&
            this.state.edu2_qualification === "" 
          ) {
            // console.log("exp1 crrt exp 2 null", this.state);
            this.setState({
              continueDisabled: false,
              edu2_year_helperText:''
            });
          } else if (
            this.state.edu2_school.length !== 0 &&
            this.validateGradYear(this.state.edu2_year) &&
            this.state.edu2_qualification.length !== 0 &&
            this.state.edu2_desc.length !== 0
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
          this.state.edu1_school.length !== 0 ||
          this.state.edu1_year.length !== 0 ||
          this.state.edu1_qualification.length !== 0 ||
          this.state.edu1_desc.length !== 0
        ) {
          this.setState({
            continueDisabled: true,
          });
        }
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    storeData = (field) => (e) => {
        
        let value = e.target.value;
        if (field === "edu1_year") 
        {
            if (
              this.validateGradYear(value)
              // ||
              // (this.state.edu1_desc===''&&
              // this.state.edu1_school===''&&
              // this.state.edu1_qualification===''&&
              // this.state.edu1_year==='')
            ) 
            {
              this.setState({
                edu1_year: value,
                edu1_year_helperText: "",
              },()=>{this.toggleContinueButton()});
            } 
            else 
            {
              this.setState({
                edu1_year: value,
                edu1_year_helperText: "Enter a valid year.",
              },()=>{this.toggleContinueButton()});
            }
          } 
        else if (field === "edu2_year") {
            if (this.validateGradYear(value)) {
              this.setState({
                edu2_year: value,
                edu2_year_helperText: "",
              },()=>{this.toggleContinueButton()});
            } else {
              this.setState({
                edu2_year: value,
                edu2_year_helperText: "Enter a valid year.",
              },()=>{this.toggleContinueButton()});
            }
          } 
        else{
            if(field==="edu1_school"){
              if(value===''){
                this.setState({
                  edu1_school_helperText:'Please fill this field.'
                })
              }
              else
                this.setState({
                  edu1_school_helperText:''
                })
            }
            if(field==="edu1_qualification"){
              if(value===''){
                this.setState({
                  edu1_qualification_helperText:'Please fill this field.'
                })
              }
              else
                this.setState({
                  edu1_qualification_helperText:''
                })
            }
            if(field==="edu1_desc"){
              if(value===''){
                this.setState({
                  edu1_desc_helperText:'Please fill this field.'
                })
              }
              else
                this.setState({
                  edu1_desc_helperText:''
                })
            }
            this.setState({
                [field]: value,
            },()=>{this.toggleContinueButton()});
        }

    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();        
        this.props.handleChange("step4Continue", true);
    }

    componentDidMount = () => {
        const { values } = this.props;
        console.log(values);
        if (values.step4Continue)
          this.setState({
            continueDisabled: false,
            edu1_school: values.edu1_school,
            edu1_year: values.edu1_year,
            edu1_qualification: values.edu1_qualification,
            edu1_desc: values.edu1_desc,

            edu2_school: values.edu2_school,
            edu2_year: values.edu2_year,
            edu2_qualification: values.edu2_qualification,
            edu2_desc: values.edu2_desc,
          });
      };

    render() {
        const { values, handleChange } = this.props;
        return (

            <div className="card animated fadeInLeft">
                <div className="card-body">

                    <h3 className="card-title">Education Info</h3>
                    <hr />
                </div>
                <form >
                    <div className="row col-lg-10 mx-auto">
                        <div className="col-lg-12 text-left">
                            <h3><b><i className="fas fa-check-circle mr-1"></i>1</b></h3>
                        </div>
                        <div className="col-lg-4 text-left">
                            {/* <label>College/University*</label> */}
                            <TextField  
                            error={this.state.edu1_school_helperText.length!==0?true:false}
                            helperText={this.state.edu1_school_helperText}
                            onChange={this.storeData("edu1_school")} 
                            placeholder="College*" 
                            variant="outlined"
                            label="College*" 
                            onBlur={e => handleChange("edu1_school",e.target.value)} 
                            className="form-control" 
                            defaultValue={values.status === 1 ? '' : values.edu1_school} 
                            // required 
                            />
                            {window.screen.width<=991?  <div><br/><br/></div>: ''}
                        </div>
                        <div className="col-lg-4 text-left">
                            {/* <label>Year*</label> */}
                            <TextField  
                            onChange={this.storeData("edu1_year")} 
                            error={this.state.edu1_year_helperText.length!==0?true:false}
                            placeholder="Graduation Year*" 
                            label="Graduation Year*" 
                            variant="outlined"
                            helperText={this.state.edu1_year_helperText}
                            onBlur={e => handleChange("edu1_year",e.target.value)} 
                            className="form-control" 
                            defaultValue={values.status === 1 ? '' : values.edu1_year} 
                            />
                            {window.screen.width<=991?  <div><br/><br/></div>: ''}
                        </div>
                        <div className="col-lg-4 text-left">
                            <TextField 
                            error={this.state.edu1_qualification_helperText.length!==0?true:false}   
                            helperText={this.state.edu1_qualification_helperText}
                            onChange={this.storeData("edu1_qualification")} 
                            placeholder="Qualification*" 
                            variant="outlined"
                            label="Qualification*" 
                            onBlur={e => handleChange("edu1_qualification",e.target.value)} 
                            className="form-control" 
                            defaultValue={values.status === 1 ? '' : values.edu1_qualification} 
                            />
                            {window.screen.width<=991?  <div><br/></div>: ''}
                        </div>

                    </div>
                    <br/>
                    <br/>
                    <div className="row col-lg-10 mx-auto">
                        <div className="col-lg-12 text-left">
                            {/* <label>Description*</label> */}
                            <TextField 
                            error={this.state.edu1_desc_helperText.length!==0?true:false}     
                            helperText={this.state.edu1_desc_helperText}
                            onChange={this.storeData("edu1_desc")} 
                            placeholder="Description*" 
                            variant="outlined"
                            label="Description*" 
                            onBlur={e => handleChange("edu1_desc",e.target.value)} 
                            className="form-control" 
                            defaultValue={values.status === 1 ? '' : values.edu1_desc}
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
                        <div className="col-lg-4 text-left">
                            {/* <label>School</label> */}
                            <TextField    
                            onChange={this.storeData("edu2_school")} 
                            placeholder="School" 
                            label="School" 
                            variant="outlined"
                            onBlur={e => handleChange("edu2_school",e.target.value)} 
                            className="form-control" 
                            defaultValue={values.status === 1 ? '' : values.edu2_school} 
                            />
                            {window.screen.width<=991?  <div><br/><br/></div>: ''}
                        </div>
                        <div className="col-lg-4 text-left">
                            {/* <label>Year</label> */}
                            <TextField     
                            onChange={this.storeData("edu2_year")} 
                            placeholder="Graduation Year" 
                            label="Graduation Year" 
                            variant="outlined"
                            onBlur={e => handleChange("edu2_year",e.target.value)} 
                            className="form-control" 
                            helperText={this.state.edu2_year_helperText}
                            defaultValue={values.status === 1 ? '' : values.edu2_year} 
                            />
                            {window.screen.width<=991?  <div><br/><br/></div>: ''}
                        </div>
                        <div className="col-lg-4 text-left">
                            {/* <label>Qualification</label> */}
                            <TextField      
                            onChange={this.storeData("edu2_qualification")} 
                            placeholder="Qualification" 
                            label="Qualification" 
                            variant="outlined"
                            onBlur={e => handleChange("edu2_qualification",e.target.value)} 
                            className="form-control" 
                            defaultValue={values.status === 1 ? '' : values.edu2_qualification} 
                            />
                            {window.screen.width<=991?  <div><br/><br/></div>: ''}
                        </div>

                    </div>
                    <br/>
                    <br/>
                    <div className="row col-lg-10 mx-auto">
                        <div className="col-lg-12 text-left">
                            {/* <label>Description*</label> */}
                            <TextField   
                            onChange={this.storeData("edu2_desc")} 
                            placeholder="Description*" 
                            label="Description*" 
                            variant="outlined"
                            onBlur={e => handleChange("edu2_desc",e.target.value)} 
                            className="form-control" 
                            defaultValue={values.status === 1 ? '' : values.edu2_desc}
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
