'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import UserLogin from 'components/user/user-login';
import LinkActions from 'actions/link-actions';
import TopicActions from 'actions/topic-actions';

import Typeahead from 'components/base/typeahead';

import {create as createForm, formInputsSerialize} from 'react-form-layout';
import FormField from 'components/base/form-field';
import {environment} from 'react-router-component';
import slug from 'slug';
import cx from 'classnames';

export default class Post extends React.Component {
    constructor(props, context){
        super(props, context);
        this._fetchUrlMeta = this._fetchUrlMeta.bind(this);
        this.topicComponent = this.topicComponent.bind(this);
        this._fetchOptions = this._fetchOptions.bind(this);
        this._addArticle = this._addArticle.bind(this);

        this.getFieldProps = this.getFieldProps.bind(this);
        this.getShortLayout = this.getShortLayout.bind(this);
        this.getFullLayout = this.getFullLayout.bind(this);
        this.renderButtons = this.renderButtons.bind(this);

        this._toggleShowAll = this._toggleShowAll.bind(this);

        this.state = {
            meta: {},
            status: null,
            url: null,
            showAll: false,
            defaultValues: {}
        };
    }

    getFullLayout (builder, props) {
        let {layout, section, col, hidden} = builder;

        if(this.state.meta.title) {
            return layout(props,
                section('Add New Article',
                    [col(12, 'url')],
                    [col(12, 'title')],
                    [col(12, 'hashtags')],
                    [col(4, 'author', 'publisher', 'published_date')],
                    [hidden('image_url', this.state.meta.image), hidden('text_summary', this.state.meta.article)]
                ),
                section('Attach to Topic',
                    [col(12, 'topic')]
                )
            );
        }

        return layout(props,
            section('Add New Article',
                [col(12, 'url')]
            )
        );

    }

    getShortLayout (builder, props) {
        let {layout, section, col, hidden} = builder;

        if(this.state.meta.title) {
            return layout(props,
                section('Add New Article',
                    [col(12, 'url')],
                    [col(12, 'title')],
                    [col(12, 'hashtags')],
                    [
                        hidden('author', this.state.defaultValues.author || this.state.meta.author),
                        hidden('publisher'), hidden('published_date')],
                    [hidden('image_url', this.state.meta.image), hidden('text_summary', this.state.meta.article)]
                ),
                section('Attach to Topic',
                    [col(12, 'topic')]
                )
            );
        }

        return this.getFullLayout(builder, props);
    }

    getFieldProps (name) {
        var desc;
        if(this.state.meta.subjectivity)
            desc = ' - subjectivity: '+ this.state.meta.subjectivity+', polarity: '+this.state.meta.polarity;

        return {
            url: {
                type: 'text',
                label: 'Article URL*',
                defaultValue: this.state.defaultValues.url || this.state.url
            },
            title: {
                type: 'text',
                label: 'Article Title*'+desc,
                defaultValue: this.state.defaultValues.title || this.state.meta.title
            },
            author: {
                type: 'text',
                label: 'Article Author',
                defaultValue: this.state.defaultValues.author || this.state.meta.author
            },
            publisher: {
                type: 'text',
                label: 'Article Publisher'
            },
            published_date: {
                type: 'date',
                label: 'Article Published Date'
            },
            image_url: {
                type: 'hidden',
                defaultValue: this.state.meta.image
            },
            text_summary: {
                type: 'hidden',
                defaultValue: this.state.meta.article
            },
            topic: {
                type: 'text',
                input: this.topicComponent()
            },
            hashtags: {
                type: 'text',
                defaultValue: this.state.meta.hashtags
            }

        }[name];
    }

    renderButtons() {
        return (
        <div className="form-group">
            {this.state.meta.title ?
                <div style={{marginBottom: '20px'}}>
                    <a onClick={this._toggleShowAll}>{this.state.showAll ? 'hide details...' : 'more details...'}</a>
                </div> : <div />}

            <div className="pull-right">
                <button className="btn btn-info"
                    onClick={this._fetchUrlMeta}>Retrieve Information from URL</button>&nbsp;
                {this.state.url ? <button className="btn btn-primary"
                    onClick={this._addArticle}>Add Article</button>: <div />}
            </div>
        </div>);
    }

    _addArticle (e){
        if(e) e.preventDefault();
        var values = formInputsSerialize(this.refs.form.refs.form);
        this.setState({defaultValues: values});

        LinkActions.postNewLink(values, (res) => {
            // console.log(res);
            if(res.id){
                environment.defaultEnvironment.navigate('/stories/'+res.id+'/'+slug(values.title));
            }else{
                this.setState({status: res.errors});
            }
        });
    }

    _toggleShowAll(e){
        if(e) e.preventDefault();

        var values = this.state.defaultValues;
        if(this.state.showAll){
            var form = ReactDOM.findDOMNode(this.refs.form.refs.form);
            values = formInputsSerialize(form);
        }

        this.setState({showAll: !this.state.showAll, defaultValues: values});
    }

    render() {
        if(typeof user === 'undefined' && !this.props.user)
            return <UserLogin info="Please sign in to submit a link"/>;

        var status = this.state.status || '';

        var statusClass = cx({
            'alert-danger': status.indexOf('error') > -1,
            'alert-info': status.indexOf('error') == -1,
            alert: this.state.status
        });

        let Form = createForm(FormField, this.getFieldProps, this.getFullLayout, this.getShortLayout, this.renderButtons());
        return (
            <div className="post">

                {this.state.status && this.state.status.length >0 ?
                    <div className={statusClass}>
                        {this.state.status}
                    </div> : <span />}

                <Form ref="form" showAll={this.state.showAll} defaultValues={this.state.defaultValues}/>
            </div>);
    }

    topicComponent () {
        var parent = this;
        return class extends React.Component {
            constructor(props, context){
                super(props, context);
                this._handleChange = this._handleChange.bind(this);
                this._handleEdit = this._handleEdit.bind(this);

                this.state = {
                    topic: parent._topic
                };
            }
            render() {
                if(this.state.topic)
                    return (<div className="form-group">
                        <label>Related Topic* <a onClick={this._handleEdit}>edit</a></label>
                        <input type="hidden" name="topic_id" value={this.state.topic.id} />
                        <input type="text" className="form-control"
                            value={this.state.topic.label} disabled/>
                        </div>);

                return (
                <div className="form-group">
                    <label>Related Topic*</label>
                    <Typeahead ref="topic" name="topic" className="form-control"
                        fetchOptionsAction={parent._fetchOptions} onChange={this._handleChange} />
                </div>);
            }
            _handleEdit (){
                parent._topic = null;
                this.setState({topic: null});
            }
            _handleChange (topic){
                parent._topic = topic;
                this.setState({topic: topic});
            }
        };

    }

    _fetchOptions (url, cb){
        TopicActions.searchTopic(url, (res) => {
            cb(null, res.map(item => ({id: item.id, label: item.title, value: item.id+''})) || []);
        });
    }

    _fetchUrlMeta (e) {
        if(e) e.preventDefault();

        // console.log('_fetchUrlMeta', Object.keys(this.refs.form.refs));
        var form = ReactDOM.findDOMNode(this.refs.form.refs.form);
        var values = formInputsSerialize(form);
        var url = values.url;

        if(url && url.length > 10){
            LinkActions.fetchUrlMeta(url, (meta)=>{
                this.setState({status: '', meta: meta || {title: ''}});
            });
            this.setState({url: url, meta: {}, defaultValues: {url: url}, status: 'Extracting information from article...'});
        }
    }
}
