import React from 'react';
import {Tracker} from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import {Links} from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links:[]
    }
  }

  // runs immediately following render
  componentDidMount() {
    // console.log('componentDidMount LinksList');
    // trackers run once when initiated, then
    // each time the data being tracked changes
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('linksPub');
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({ links });
    })
    // console.log('this.linksTracker: ', this.linksTracker);
  }
  
  // runs just before a component goes away
  componentWillUnmount() {
    // console.log('componentWillUnmount LinksList');
    this.linksTracker.stop();
  }

  renderLinksListItems() {
    if (this.state.links.length === 0) {
      return (<div className="item"><p className="item__status-message">No links found.</p></div>)
    } else {
      return this.state.links.map((link) => {
        const shortUrl = Meteor.absoluteUrl(link._id);
        return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
        })
    }
    }
  
  render() {
    return (
      <div>
        <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
          </FlipMove>
        </div>
      </div>
      );
  }
}