import React, { Component } from 'react';
import '../App.css';
/*import axios from 'axios';
import { saveAs } from 'file-saver';*/
import PersonalDetails from './PersonalDetails';
import Experience from './Experience';
import Project from './Project';
import Education from './Education';
import Success from './Success';
import Extras from './Extras';

class UserForm extends Component {

    // state = {
    //     step: 5,
    //     step1Continue:false,
    //     step2Continue:false,
    //     step3Continue:false,
    //     step4Continue:false,
    //     name: 'Parth Jangid',
    //     email: 'parth@gmail.com',
    //     phone: '918356957376',
    //     linkedin: 'https://www.linkedin.com/in/parth-jangid-0762bb18a/',
    //     github: 'https://github.com/Parth-tech',
    //     skills: 'Web Dev (MERN Stack), Mobile App Dev (Flutter), Figma, Spacy, Java, Python',
    //     exp1_org: 'GlobalShala',
    //     exp1_pos: 'Data Analyst (Project Head)',
    //     exp1_desc: 'Learned about metrics to analyze Facebook Ads. Proposed a campaign to be discontinued as it was underperforming. Ensured timely accomplishment of goals.',
    //     exp1_dur: '1',
    //     exp2_org: 'Levin Switches',
    //     exp2_pos: 'Web Dev Intern',
    //     exp2_desc: 'Built the firm\'s official website. Collaborated with other developers in making the database.',
    //     exp2_dur: '3',
    //     proj1_title: 'Hello World - A Social Media Application with Face Detection Feature',
    //     proj1_link: '(https://github.com/Parth-tech/Social-Media-Web)',
    //     proj1_desc: 'Built a function social media website that has face detection feature which was based upon Multi-task Cascaded Convolutional Networks framework.',
    //     proj2_title: 'Percentage Calculator',
    //     proj2_link: '(https://github.com/Parth-tech/Percentage-Calculator)',
    //     proj2_desc: 'Built an percentage calculator with Apache Cordova',
    //     edu1_school: 'Thadomal Shahani Engineering College',
    //     edu1_year: '2022',
    //     edu1_qualification: 'B.E.',
    //     edu1_desc: 'Completed my undergraduate study with 9.7 CGPA.',
    //     edu2_school: 'Nirmala Memorial Foundation College of Science and Commerce',
    //     edu2_year: '2018',
    //     edu2_qualification: 'H.S.C',
    //     edu2_desc: 'Secured 84% during my higher school study.',
    //     lang: 'Marwadi, Hindi, English, Gujarati',
    //     hobbies: ' Cricket, Snooker, Table Tennis, Badminton, Chess, Book Reading',
    //     achieve_1: 'Secured 2nd Rank in School (I.G.C.S.E)',
    //     achieve_2: 'Secured 1st rank in the First year undergraduate examination.',
    //     achieve_3: 'Passed the Oracle Certified Professional, Java SE 11 Developer.',
    //     status: 0
    // }

    state = {
        step: 5,
        step1Continue:false,
        step2Continue:false,
        step3Continue:false,
        step4Continue:false,
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        skills: '',
        exp1_org: '',
        exp1_pos: '',
        exp1_desc: '',
        exp1_dur: '',
        exp2_org: '',
        exp2_pos: '',
        exp2_desc: '',
        exp2_dur: '',
        proj1_title: '',
        proj1_link: '',
        proj1_desc: '',
        proj2_title: '',
        proj2_link: '',
        proj2_desc: '',
        edu1_school: '',
        edu1_year: '',
        edu1_qualification: '',
        edu1_desc: '',
        edu2_school: '',
        edu2_year: '',
        edu2_qualification: '',
        edu2_desc: '',
        lang: '',
        hobbies: '',
        achieve_1: '',
        achieve_2: '',
        achieve_3: '',
        status: 0
    }

    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    };

    // Go back to prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };

    submitted = () => {
        const { status } = this.state;
        this.setState({
            status: status + 1
        });
    }

    // handleChange = ({ target: { value, name } }) => 
    // {
    //     this.setState({ [name]: value });  
    //     console.log([name])
    // }
    handleChange = ( name, value) => 
    {
        this.setState({[name]: value },()=>console.log(this.state));  
    }

    /*formSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            linkedin: this.state.linkedin,
            github: this.state.github,
            skills: this.state.skills
        }


        axios.post('/create-pdf', data)
            .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                saveAs(pdfBlob, 'Resume.pdf');
            });

        e.target.reset();

    } */

    /*createAndDownloadPdf = () => {
      axios.post('/create-pdf', this.state)
           .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
           .then((res) => {
              const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
  
              saveAs(pdfBlob, 'Resume.pdf');
           })
    } */
    render() {
        const { step } = this.state;
        // const { name, email, phone, linkedin, github, skills, exp1_org, exp1_pos, exp1_desc, exp1_dur,
        //     exp2_org, exp2_pos, exp2_desc, exp2_dur, status, proj1_title, proj1_link, proj1_desc,
        //     proj2_title, proj2_link, proj2_desc, edu1_school, edu1_year, edu1_qualification,
        //     edu1_desc, edu2_school, edu2_year, edu2_qualification, edu2_desc, extra_1, extra_2,
        //     extra_3, extra_4, extra_5 } = this.state;
        // const values = {
        //     name, email, phone, linkedin, github, skills, exp1_org, exp1_pos, exp1_desc, exp1_dur,
        //     exp2_org, exp2_pos, exp2_desc, exp2_dur, edu1_school, edu1_year, edu1_qualification,
        //     edu1_desc, edu2_school, edu2_year, edu2_qualification, edu2_desc, status, proj1_title,
        //     proj1_link, proj1_desc,
        //     proj2_title, proj2_link, proj2_desc,
        //     extra_1, extra_2,
        //     extra_3, extra_4, extra_5
        // };

        switch (step) {
            case 1:
                return (
                    <div className="App pt-5 mt-5">
                        <div className="container col-lg-8 mx-auto text-center">

                            <PersonalDetails
                                values={this.state}
                                nextStep={this.nextStep}
                                handleChange={this.handleChange}
                            />
                        </div>
                        <br />
                    </div>
                );

            case 2:

                return (
                    <div className="App pt-5 mt-5">
                        <div className="container col-lg-8 mx-auto text-center">

                            <Experience
                                values={this.state}
                                prevStep={this.prevStep}
                                /*submitted={this.submitted}*/
                                nextStep={this.nextStep}
                                handleChange={this.handleChange}
                            />
                        </div>
                        <br />
                    </div>
                );

            case 3:

                return (
                    <div className="App pt-5 mt-5">
                        <div className="container col-lg-8 mx-auto text-center">

                            <Project
                                values={this.state}
                                prevStep={this.prevStep}
                                /*submitted={this.submitted}*/
                                nextStep={this.nextStep}
                                handleChange={this.handleChange}
                            />
                        </div>
                        <br />
                    </div>
                );

            case 4:

                return (
                    <div className="App pt-5 mt-5">
                        <div className="container col-lg-8 mx-auto text-center">

                            <Education
                                values={this.state}
                                prevStep={this.prevStep}
                                /*submitted={this.submitted}*/
                                nextStep={this.nextStep}
                                handleChange={this.handleChange}
                            />
                        </div>
                        <br />
                    </div>
                );


            case 5:

                return (
                    <div className="App pt-5 mt-5">
                        <div className="container col-lg-8 mx-auto text-center">

                            <Extras
                                values={this.state}
                                prevStep={this.prevStep}
                                nextStep={this.nextStep}
                                submitted={this.submitted}
                                handleChange={this.handleChange}
                            />
                        </div>
                        <br />
                    </div>
                );

            case 6:

                return (
                    <div className="App pt-5 mt-5">
                        <div className="container col-lg-8 mx-auto text-center">

                            <Success />
                        </div>
                        <br />
                    </div>
                );

        }
    }
}

export default UserForm;
