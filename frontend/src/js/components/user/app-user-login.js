/** @jsx React.DOM */
var React = require('react'),
	Router = require('react-router-component'),
	Locations = Router.Locations;
	Location = Router.Location,
	NotFound = Router.NotFound,
    UserStore = require('../../stores/app-user-store'),
    AppServerAction = require('../../actions/app-server-actions');

var LoginForm = React.createClass({
    propTypes: {
        onLogin: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired
    },
    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <h4>Login to Credibility.io</h4>
                    <div className="form-group">
                        <label for="username">Username</label>
                        <input ref="username" name="username" type="text" className="form-control"/>

                        <label for="password">Password</label>
                        <input ref="password" name="password" type="password" className="form-control"/>
                    </div>
                    <div className="form-actions">
                        <button onClick={this.props.onLogin} className="btn btn-primary">Login</button>
                        <button onClick={this.props.onCancel} className="btn btn-default">Cancel</button>
                    </div>
                </div>
            </div>)
    },
    getUsername: function(){
        return this.refs.username.getDOMNode().value;
    },
    getPassword: function(){
        return this.refs.password.getDOMNode().value;
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

module.exports = UserLogin;
