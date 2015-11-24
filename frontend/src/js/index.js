'use strict';
import ReactComponentRenderer from 'renderer';

if(typeof window !== 'undefined') {
    new ReactComponentRenderer(document.location.pathname)
    .render(
        document.querySelector('#credibility')
    );
}
