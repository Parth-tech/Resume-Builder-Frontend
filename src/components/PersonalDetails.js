import React, { Component } from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class PersonalDetails extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
        this.props.handleChange("step1Continue", true);
    };

    state = {
        continueDisabled: true,
        isNameCrt: false,
        nameErr:false,
        isEmailCrt: false,
        emailErr:false,
        isPhoneCrt: false,
        phoneErr:false,
        isSkillsCrt:false,
        skillErr:false,
        isLinkedinCrt:false,
        linkedinErr:false,
        isGithubCrt:false,
        githubErr:false,
        nameHelperText: "",
        emailHelperText: "",
        phoneHelperText: "",
        skillsHelperText: "",
        linkedinHelperText: "",
        githubHelperText: "",
    };

    validateLinkedIn = (linkedin) =>{
      return /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/.test(linkedin)
    }

    validateGithub = (github) =>{
      return /^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9\-]{1,})+\/?$/.test(github)
    }

     validatePhone = (phone) => {
        return /^[0-9]+$/.test(phone);
      }

    validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    validate = (field) => (e) =>{
        let value = e.target.value;
        console.log(this.state)
        if (field === "name") {
            const hasNumber = /\d/;
            const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            if (hasNumber.test(value)) {
              this.setState({
                nameHelperText: "There must be no Numbers!",
                isNameCrt: false,
              });
            } else if (specialChars.test(value)) {
              this.setState({
                nameHelperText: "There must be no Special Characters!",
                isNameCrt: false,
              });
            } else {
              this.setState({
                nameHelperText: "",
                isNameCrt: true,
              });
            }
        }
        if (field === "email") {
            if (this.validateEmail(value)) {
              this.setState({
                isEmailCrt: true,
                emailHelperText: "",
              });
            } else {
              this.setState({
                isEmailCrt: false,
                emailHelperText: "Enter valid email!",
              });
            }
        }
        if (field === "phone") {
            if (this.validatePhone(value)) {
              this.setState({
                isPhoneCrt: true,
                phoneHelperText: "",
              });
            } else {
              this.setState({
                isPhoneCrt: false,
                phoneHelperText: "Kindly enter numbers only.",
              });
            }
        }
        if(field === "skills"){
            if(value.length>2){
                this.setState({
                    isSkillsCrt:true,
                    skillsHelperText:''
                })
            }
            else{
                this.setState({
                    isSkillsCrt:false,
                    skillsHelperText:'Please enter your skills '
                })
            }
        }
        if(field === 'linkedin'){
          if(value===''){
            this.setState({
              isLinkedinCrt: false,
              linkedinHelperText: "",
            });
          }
          else if (this.validateLinkedIn(value)) {
            this.setState({
              isLinkedinCrt: true,
              linkedinHelperText: "",
            });
          } else {
            this.setState({
              isLinkedinCrt: false,
              linkedinHelperText: "Kindly enter a valid url.",
            });
          }
        }
        if(field === 'github'){
          if(value===''){
            this.setState({
              isGithubCrt: false,
              githubHelperText: "",
            });
          }
          else if (this.validateGithub(value)) {
            this.setState({
              isGithubCrt: true,
              githubHelperText: "",
            });
          } else {
            this.setState({
              isGithubCrt: false,
              githubHelperText: "Kindly enter a valid url.",
            });
          }

        }
        this.setState((state) => ({
            continueDisabled: !(
              state.isEmailCrt &&
              state.isNameCrt &&
              state.isSkillsCrt && 
              state.isPhoneCrt && 
              (state.linkedinHelperText.length===0) && (state.githubHelperText.length===0)
            ),
          }));
    }

    componentDidMount=()=>{
    const { values } = this.props;
    console.log(values);
    if(values.step1Continue)
    this.setState({
        continueDisabled:false,
        isSkillsCrt:true,
        isEmailCrt:true,
        isNameCrt:true,
        isPhoneCrt:true
    },()=>{console.log(this.state)})
    
    }
      
    render() {
        const { values, handleChange } = this.props;
        
        return (
            <div className="card animated fadeInLeft">
                <div className="card-body">

                    <h3 className="card-title">Personal Info</h3>
                    <hr />
                </div>
                <form >
                    <div className="row col-lg-10 mx-auto">
                        <div className="col-lg-4 text-left">
                            <TextField  
                            error={this.state.nameHelperText.length!==0?true:false}
                            placeholder="John Doe" 
                            label="Name*"
                            className="form-control" 
                            onChange={this.validate('name')} 
                            helperText={this.state.nameHelperText}
                            onBlur={e => handleChange("name",e.target.value)} 
                            defaultValue={values.status === 1 ? '' : values.name} 
                            variant="outlined"
                            />   
                            {window.screen.width<=991?  <div><br/><br/></div>: ''}
                        </div>         
                        <div className="col-lg-4 text-left">
                            {/* <label>Email*</label> */}
                            <TextField  
                            error={this.state.emailHelperText.length!==0?true:false} 
                            label="Email*"
                            placeholder="john@xyz.com" 
                            className="form-control" 
                            onChange={this.validate('email')} 
                            helperText={this.state.emailHelperText}
                            onBlur={e => handleChange("email",e.target.value)}  
                            defaultValue={values.status === 1 ? '' : values.email} 
                            variant="outlined"
                            // required 
                            />   
                            {window.screen.width<=991?  <div><br/><br/></div>: ''}
                        </div>   
                        <div className="col-lg-4 text-left">
                            {/* <label>Mobile*</label> */}
                            <TextField  
                            error={this.state.phoneHelperText.length!==0?true:false} 
                            helperText={this.state.phoneHelperText}
                            label="Phone*" 
                            placeholder="91 83569 57376" 
                            className="form-control" 
                            onChange={this.validate('phone')} 
                            onBlur={e => handleChange("phone",e.target.value)} 
                            defaultValue={values.status === 1 ? '' : values.phone} 
                            variant="outlined"
                            // required 
                            />                            
                            <br />
                        </div>     
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="row col-lg-10 mx-auto">
                        <div className="col-lg-6 text-left">
                            {/* <label>Linkedin</label> */}
                            <TextField   
                            error={this.state.linkedinHelperText.length!==0?true:false} 
                            helperText={this.state.linkedinHelperText}
                            label="LinkedIn" 
                            placeholder="LinkedIn URL" 
                            variant="outlined"
                            className="form-control" 
                            onChange={this.validate('linkedin')} 
                            defaultValue={values.status === 1 ? '' : values.linkedin} 
                            onBlur={e => handleChange("linkedin",e.target.value)} 
                            />   
                            {window.screen.width<=991?  <div><br/><br/></div>: ''}
                        </div>   
                        <div className="col-lg-6 text-left">
                            {/* <label>Github</label> */}
                            <TextField   
                            error={this.state.githubHelperText.length!==0?true:false} 
                            helperText={this.state.githubHelperText}
                            label="GitHub" 
                            placeholder="GitHub URL" 
                            className="form-control" 
                            variant="outlined"
                            onChange={this.validate('github')} 
                            defaultValue={values.status === 1 ? '' : values.github} 
                            onBlur={e => handleChange("github",e.target.value)} 
                        />
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="row col-lg-10 mx-auto">
                        <div className="col-lg-12 text-left">
                            {/* <label>Skills* (Separate each skill with a space and a comma)</label> */}
                            <TextField  
                            error={this.state.skillsHelperText.length!==0?true:false} 
                            label="Skills*" 
                            placeholder="Enter skills Separated by a space and comma." 
                            className="form-control" 
                            variant="outlined"
                            onChange={this.validate('skills')} 
                            defaultValue={values.status === 1 ? '' : values.skills} 
                            onBlur={e => handleChange("skills",e.target.value)} />
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="container text-center">
                        <Button 
                        onClick={this.continue}
                        style={{color:"white"}}
                        disabled={this.state.continueDisabled}
                        className="btn btn-info">
                            Next
                            <i className="fas fa-angle-right ml-1"></i>
                        </Button>
                        
                        
                    </div>
                    <br/>
                </form>
            
            </div>
        )
    }
}


export default PersonalDetails;
