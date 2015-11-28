'use strict';
import React from 'react';

export default class UserLogin extends React.Component {
    render() {

        var validation_message = typeof validation === 'undefined' && !this.props.validation ?
            null : (this.props.validation || validation);
        var error_message = typeof error === 'undefined' && !this.props.error ?
            null : (this.props.error || error);
        var success_message = typeof success === 'undefined' && !this.props.success ?
            null : (this.props.success || success);
        var info_message = typeof info === 'undefined' && !this.props.info ?
            null : (this.props.info || success);

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <form action="/account/sendtoken" method="post">
                        { info_message ?
                            <div className="alert alert-info">{info_message}</div> : ''}
                        { validation_message ?
                            <div className="alert alert-danger">{validation_message.user.msg}</div> : ''}
                        { error_message ?
                            <div className="alert alert-danger">{error_message}</div> : ''}
                        { success_message ?
                            <div className="alert alert-success">{success_message}</div> : ''}
                        <div className="form-group">
                            <label>Email </label>
                            <input ref="user" name="user" type="text" className="form-control"/>
                            <small>
                            Login is <a href="https://passwordless.net/">passwordless</a>, you will receive a login link sent to your email.
                            </small>
                        </div>

                        <div className="form-actions">
                            <input type="submit" className="btn btn-primary" value="Login" />
                        </div>
                    </form>
                </div>
            </div>);
    }
}
