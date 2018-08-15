'use strict';

const List = props => {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                return (
                    <WrappedVideo {...item} />
                );

            case 'article':
                return (
                    <WrappedArticle {...item} />
                );
        }
    });
};

const WrappedVideo = wrap(Video);
const WrappedArticle = wrap(Article);

function wrap (Component) {
    return class extends React.Component {
        render() {
            if (this.props.views < 100) {
                return <New><Component {...this.props} /></New>
            }
            else if (this.props.views > 1000) {
                return <Popular><Component {...this.props} /></Popular>
            }
            return <Component {...this.props} />
        }
    }
}