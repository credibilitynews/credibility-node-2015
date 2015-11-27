import React from 'react';
import {Link} from 'react-router-component';
import slug from 'slug';

export class TagLink extends React.Component{
    render (){
        var title = this.props.link ? this.props.link.code : this.props.code;
        var id = this.props.link ? this.props.link.id : this.props.id;

        return (
            <Link className={this.props.className} href={'/tags/'+id+'/'+slug(title)}>
                {this.props.children}
            </Link>);
    }
}

export class TopicLink extends React.Component{
    render (){
        var title = this.props.link ? this.props.link.title : this.props.title;
        var id = this.props.link ? this.props.link.id : this.props.id;

        return (
            <Link className={this.props.className} href={'/topics/'+id+'/'+slug(title)}>
                {this.props.children}
            </Link>);
    }
}

export class StoryLink extends React.Component{
    render (){
        var title = this.props.link ? this.props.link.title : this.props.title;
        var id = this.props.link ? this.props.link.id : this.props.id;

        return (
            <Link className={this.props.className} href={'/stories/'+id+'/'+slug(title)}>
                {this.props.children}
            </Link>);
    }
}
