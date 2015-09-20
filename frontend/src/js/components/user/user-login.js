var React = require('react'),
	Router = require('react-router-component'),
	Locations = Router.Locations,
	Location = Router.Location,
	NotFound = Router.NotFound,
    UserStore = require('../../stores/user-store'),
	UserActions = require('../../actions/user-actions'),
    AppServerAction = require('../../actions/server-actions');

var LoginForm = React.createClass({
    render: function() {
		
		var validation_message = typeof validation === "undefined" && !this.props.validation ?
			null : (this.props.validation || validation);
		var error_message = typeof error === "undefined" && !this.props.error ?
			null : (this.props.error || error);
		var success_message = typeof success === "undefined" && !this.props.success ?
			null : (this.props.success || success);

        return (
            <div className="panel panel-default">
                <div className="panel-body">
					<form action="/account/sendtoken" method="post">
	                    <h4>Login</h4>
						<div>
							<small>
							We implement <a href="https://passwordless.net/">Passwordless</a>, NO password is needed.
							</small>
						</div>
						{ validation_message ?
							<div className="alert alert-danger">{validation_message['user']['msg']}</div> : ""}
						{ error_message ?
							<div className="alert alert-danger">{error_message}</div> : ""}
						{ success_message ?
							<div className="alert alert-success">{success_message}</div> : ""}
	                    <div className="form-group">
	                        <label>Email </label>
	                        <input ref="user" name="user" type="text" className="form-control"/>
	                    </div>
	                    <div className="form-actions">
	                        <input type="submit" className="btn btn-primary" value="Login" />
	                    </div>
					</form>
                </div>
            </div>)
    }
});

var UserLogin = React.createClass({
    render: function() {
        return (
			<Locations ref="router" contextual>
				<Location path="/user/login"
					handler={LoginForm}
                    onLogin={this._handleLogin}
                    onCancel={this._handleCancel} ref="login" />
				<NotFound handler={<div/>} />
			</Locations>);
    },
    componentWillMount: function() {
        UserStore.addListener(UserStore.events.LOGIN_EVENT_SUCCESS, this._handleLoginSuccess);
        UserStore.addListener(UserStore.events.LOGIN_EVENT_ERROR, this._handleLoginError);
    },
    componentWillUnmount: function() {
        UserStore.removeListener(UserStore.events.LOGIN_EVENT_SUCCESS, this._handleLoginSuccess);
        UserStore.removeListener(UserStore.events.LOGIN_EVENT_ERROR, this._handleLoginError);
    },
    _handleLogin: function(){
        console.log('logging in');
        var username = this.refs.router.refs.login.getUsername();
        var password = this.refs.router.refs.login.getPassword();
        AppServerAction.login(username, password);
    },
    _handleCancel: function(){
        this.refs.router.navigate('/')
    },
    _handleLoginError: function(err){
        alert(err);
    },
    _handleLoginSuccess: function(token){
        alert(token);
    }
});

module.exports = LoginForm;
