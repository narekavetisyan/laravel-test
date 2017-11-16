import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import PropTypes from 'prop-types';

class Register extends Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			error: '',
			name: '',
			password_confirmation: '',
			id: null
		}
		this.changeEmail = this.changeEmail.bind(this);
		this.doRegister = this.doRegister.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.changeName = this.changeName.bind(this);
		this.confirmPass = this.confirmPass.bind(this);
	}
	doRegister(event){
		event.preventDefault(); 
		axios.post('/api/register', {email: this.state.email, password: this.state.password, name: this.state.name, password_confirmation:this.state.password_confirmation})
		.then((response) => {
			this.setState({ id:response.data.user.id, name:sessionStorage.getItem('name'), error: ''});
				sessionStorage.setItem('user_id', this.state.id);
				sessionStorage.setItem('name', response.data.user.name);
				this.props.userRegister(this.state.name);
		}).catch((err) => {
			this.setState({error: Object.values(err.response.data.errors)[0]});
		})
		return false;
	}
	changeEmail(e){
		this.setState({email: e.target.value});
	}

	changePassword(e){
		this.setState({password: e.target.value});
	}
	changeName(e){
		this.setState({name:e.target.value});
	}
	confirmPass(e){
		this.setState({password_confirmation: e.target.value});
	}
	render() {
		let main;
		if(this.state.id){
			main = <Redirect to='/' />;
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-8 col-md-offset-2">
						<div className="panel panel-default">
							<div className="panel-heading">Register</div>

							<div className="panel-body">
								<form className="form-horizontal" role='form'>
									<div id='error'>{this.state.error}</div>
									<div className="form-group">
										<label htmlFor="name" className="col-md-4 control-label">Name</label>

										<div className="col-md-6">
											<input id="name" type="text" className="form-control" name="name" value={this.state.value} onChange={this.changeName} required autoFocus />
										</div>
									</div>

									<div className="form-group">
										<label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>

										<div className="col-md-6">
											<input id="email" type="email" className="form-control" name="email" value={this.state.email} onChange={this.changeEmail}  required />
										</div>
									</div>

									<div className="form-group">
										<label htmlFor="password" className="col-md-4 control-label">Password</label>

										<div className="col-md-6">
											<input id="password" type="password" className="form-control" name="password" value={this.state.password} onChange={this.changePassword} required />
										</div>
									</div>

									<div className="form-group">
										<label htmlFor="password-confirm" className="col-md-4 control-label">Confirm Password</label>

										<div className="col-md-6">
											<input id="password-confirm" type="password" className="form-control" name="password_confirmation" value={this.state.password_confirmation} onChange={this.confirmPass} required />
										</div>
									</div>

									<div className="form-group">
										<div className="col-md-6 col-md-offset-4">
											<button type="submit" onClick={this.doRegister} className="btn btn-primary">
												Register
												<div>
													{main}
												</div>   
											</button>
										</div>
									</div>   
								</form> 
							</div>
						</div>
					</div>
				</div>
			</div>
	);
	}
}

Register.propTypes = {
	userRegister: PropTypes.func,
};

export default Register;
