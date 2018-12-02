import React from 'react';

class Loader extends React.Component {
    render() {
        return <img src="/ajax-loader.gif" alt="loader"
            className={this.props.className}
            style={{"display": (this.props.visible ? 'inline-block' : 'none')}} />;
    }
}

export default Loader;
