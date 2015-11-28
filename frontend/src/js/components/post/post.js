'use strict';
import React from 'react';
import UserLogin from 'components/user/user-login';

export default class Post extends React.Component {
    render() {

        if(typeof user === 'undefined' && !this.props.user)
            return <UserLogin info="Please sign in to submit a link"/>;

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <h2>Post an Article</h2>
                    <form>
                        <div className="form-group">
                            <label>Article URL</label>
                            <input ref="url" name="url" type="text" className="form-control"/>
                        </div>

                        <div className="form-group">
                            <label>Topic </label>
                            <input ref="topic" name="topic" type="text" className="form-control"/>
                        </div>

                        <div className="form-group">
                            <label>Highlight/quote from Article</label>
                            <textarea ref="quote" name="quote" type="text" className="form-control" />
                        </div>

                        <div className="form-actions form-group">
                            <input type="submit" className="btn btn-primary" value="Add to Credibility" />
                        </div>
                    </form>
                </div>
            </div>);
    }
}
