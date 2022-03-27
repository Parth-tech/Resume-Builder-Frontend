import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class Experience extends Component {
  state = {
    continueDisabled: true,

    exp1_org: "",
    exp1_org_helperText: "",
    exp1_pos: "",
    exp1_pos_helperText: "",
    exp1_desc: "",
    exp1_desc_helperText: "",
    exp1_dur: "",
    exp1DurHelperText: "",

    exp2_org: "",
    exp2_pos: "",
    exp2_desc: "",
    exp2_dur: "",
    exp2DurHelperText: "",
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
    this.props.handleChange("step2Continue", true);
  };

  validateDuration = (duration) => {
    return /^[0-9]+$/.test(duration);
  };

  componentDidMount = () => {
    const { values } = this.props;
    console.log(values);
    if (values.step3Continue)
      this.setState({
        continueDisabled: false,
        
        exp1_org: values.exp1_org,
        exp1_pos: values.exp1_pos,
        exp1_desc: values.exp1_desc,
        exp1_dur: values.exp1_dur,

        exp2_org: values.exp2_org,
        exp2_pos: values.exp2_pos,
        exp2_desc: values.exp2_desc,
        exp2_dur: values.exp2_dur, 
      });
  };

  toggleContinueButton = () => {
    if (
      this.validateDuration(this.state.exp1_dur) &&
      this.state.exp1_desc.length !== 0 &&
      this.state.exp1_pos.length !== 0 &&
      this.state.exp1_org.length !== 0
    ) {
      if (
        this.state.exp2_dur === "" &&
        this.state.exp2_desc === "" &&
        this.state.exp2_pos === "" &&
        this.state.exp2_org === ""
      ) {
        // console.log("exp1 crrt exp 2 null", this.state);
        this.setState({
          continueDisabled: false,
          exp2DurHelperText:''
        });
      } else if (
        this.validateDuration(this.state.exp2_dur) &&
        this.state.exp2_desc.length !== 0 &&
        this.state.exp2_pos.length !== 0 &&
        this.state.exp2_org.length !== 0
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
      this.state.exp1_dur.length !== 0 ||
      this.state.exp1_desc.length !== 0 ||
      this.state.exp1_pos.length !== 0 ||
      this.state.exp1_org.length !== 0
    ) {
      this.setState({
        continueDisabled: true,
      });
    }
  }

  storeData = (field) => (e) => {
    let value = e.target.value;

    if (field === "exp1_dur") {
      if (this.validateDuration(value)) {
        this.setState({
          exp1_dur: value,
          exp1DurHelperText: "",
        },()=>{this.toggleContinueButton()});
      } else {
        this.setState({
          exp1_dur: value,
          exp1DurHelperText: "Kindly enter whole numbers only.",
        },()=>{this.toggleContinueButton()});
      }
    } 
    else if (field === "exp2_dur") {
      if (this.validateDuration(value)) {
        this.setState({
          exp2_dur: value,
          exp2DurHelperText: "",
        },()=>{this.toggleContinueButton()});
      } else {
        this.setState({
          exp2_dur: value,
          exp2DurHelperText: "Kindly enter whole numbers only.",
        },()=>{this.toggleContinueButton()});
      }
    } 
    else {
      if(field==="exp1_org"){
        if(value===''){
          this.setState({
            exp1_org_helperText:'Please fill this field.'
          })
        }
        else
          this.setState({
            exp1_org_helperText:''
          })
      }
      if(field==="exp1_pos"){
        if(value===''){
          this.setState({
            exp1_pos_helperText:'Please fill this field.'
          })
        }
        else
          this.setState({
            exp1_pos_helperText:''
          })
      }
      if(field==="exp1_desc"){
        if(value===''){
          this.setState({
            exp1_desc_helperText:'Please fill this field.'
          })
        }
        else
          this.setState({
            exp1_desc_helperText:''
          })
      }
      this.setState({
        [field]: value,
      },()=>{this.toggleContinueButton()});
    }    
  };


  render() {
    const { values, handleChange } = this.props;
    return (
      <div className="card animated fadeInLeft">
        <div className="card-body">
          <h3 className="card-title">Experience Info</h3>

          <hr />
          <br />
        </div>
        <form onSubmit={this.continue}>
          <div className="row col-lg-10 mx-auto">
            <div className="col-lg-12 text-left">
              <h3>
                <b>
                  <i className="fas fa-check-circle mr-1"></i>1
                </b>
              </h3>
              <hr />
            </div>
            <div className="col-md-12 text-left">
              {/* <label>Institute/Organisation*</label> */}
              <TextField
                error={this.state.exp1_org_helperText.length!==0?true:false}
                helperText={this.state.exp1_org_helperText}
                placeholder="Institute/Organisation"
                label="Institute/Organisation*"
                variant="outlined"
                className="form-control"
                onChange={this.storeData("exp1_org")}
                onBlur={e => handleChange("exp1_org",e.target.value)} 
                defaultValue={values.status === 1 ? "" : values.exp1_org}
                // onChange={handleChange}
                // required
              />
              <br/>
              <br/>
              <br/>
              {/* {window.screen.width<=991?  <div><br/><br/></div>: ''} */}
            </div>
            
            <div className="col-md-6 text-left">
              {/* <label>Position*</label> */}
              <TextField
                error={this.state.exp1_pos_helperText.length!==0?true:false}
                helperText={this.state.exp1_pos_helperText}
                placeholder="Position"
                label="Position*"
                className="form-control"
                variant="outlined"
                onChange={this.storeData("exp1_pos")}
                onBlur={e => handleChange("exp1_pos",e.target.value)} 
                defaultValue={values.status === 1 ? "" : values.exp1_pos}
                // onChange={handleChange}
                // required
              />
              <br/>
              {window.screen.width<=767?  <div><br/><br/></div>: ''}
            </div>
            
            <div className="col-md-6 text-left">
              {/* <label>Duration*</label> */}
              <TextField
                error={this.state.exp1DurHelperText.length!==0?true:false}
                placeholder="Duration"
                label="Duration* (in months)"
                className="form-control"
                variant="outlined"
                helperText={this.state.exp1DurHelperText}
                onBlur={e => handleChange("exp1_dur",e.target.value)} 
                defaultValue={values.status === 1 ? "" : values.exp1_dur}
                onChange={this.storeData("exp1_dur")}
                // required
              />
              <br/>
            </div>
          </div>

          <br />
          <br />
          <div className="row col-lg-10 mx-auto">
            <div className="col-lg-12 text-left">
              {/* <label>Description*</label> */}
              <TextField
                error={this.state.exp1_desc_helperText.length!==0?true:false}
                helperText={this.state.exp1_desc_helperText}
                placeholder="Description"
                label="Description*"
                variant="outlined"
                className="form-control"
                onBlur={e => handleChange("exp1_desc",e.target.value)} 
                defaultValue={values.status === 1 ? "" : values.exp1_desc}
                onChange={this.storeData("exp1_desc")}
                // required
              />
            </div>
          </div>

          <br />
          <br />
          <br />

          <div className="row col-lg-10 mx-auto">
            <div className="col-lg-12 text-left">
              <h3>
                <b>
                  <i className="fas fa-check-circle mr-1"></i>2
                </b>
              </h3>
              <hr />
            </div>
            <div className="col-md-12 text-left">
              {/* <label>Institute/Organisation*</label> */}
              <TextField
                placeholder="Institute/Organisation"
                label="Institute/Organisation"
                className="form-control"
                variant="outlined"
                onChange={this.storeData("exp2_org")}
                onBlur={e => handleChange("exp2_org",e.target.value)} 
                defaultValue={values.status === 1 ? "" : values.exp2_org}
              />
              <br/>
              <br/>
              <br/>
              {/* {window.screen.width<=991?  <div><br/><br/></div>: ''} */}
            </div>
            
          <br />
            <div className="col-md-6 text-left">
              {/* <label>Position*</label> */}
              <TextField
                placeholder="Position"
                onChange={this.storeData("exp2_pos")}
                label="Position"
                className="form-control"
                variant="outlined"
                onBlur={e => handleChange("exp2_pos",e.target.value)} 
                defaultValue={values.status === 1 ? "" : values.exp2_pos}
              />
              <br/>
              {window.screen.width<=767?  <div><br/><br/></div>: ''}
            </div>
            
          <br />
            <div className="col-md-6 text-left">
              {/* <label>Duration*</label> */}
              <TextField
                placeholder="Duration"
                onChange={this.storeData("exp2_dur")}
                onBlur={e => handleChange("exp2_dur",e.target.value)} 
                label="Duration (in months)"
                error={this.state.exp2DurHelperText.length!==0?true:false}
                helperText={this.state.exp2DurHelperText}
                variant="outlined"
                className="form-control"
                defaultValue={values.status === 1 ? "" : values.exp2_dur}
                // onChange={this.storeData("exp1_desc")}
                // required
              />
              <br/>
            </div>
          </div>
          <br />
          <br />
          <div className="row col-lg-10 mx-auto">
            <div className="col-lg-12 text-left">
              {/* <label>Description*</label> */}
              <TextField
                placeholder="Description"
                onChange={this.storeData("exp2_desc")}
                label="Description"
                variant="outlined"
                className="form-control"
                onBlur={e => handleChange("exp2_desc",e.target.value)} 
                defaultValue={values.status === 1 ? "" : values.exp2_desc}
                // onChange={this.storeData("exp1_desc")}
                // required
              />
            </div>
          </div>
          <br />
          <br />
          <div className="container text-center">
            <Button
              style={{ color: "white" , marginRight:20}}
              className="btn btn-info"
              onClick={this.back}
            >
              <i className="fas fa-angle-left mr-1"></i>Back
            </Button>
            <Button
              onClick={this.continue}
              style={{ color: "white" }}
              disabled={this.state.continueDisabled}
              className="btn btn-info"
            >
              Next
              <i className="fas fa-angle-right ml-1"></i>
            </Button>
          </div>
          <br />
        </form>
      </div>
    );
  }
}

export default Experience;
