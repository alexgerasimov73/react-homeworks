"use strict";

class App extends React.Component {
    render() {
        const items = [ {path: '/', descr: 'Рефераты'}, {path:'/creator', descr: 'Криэйтор'}, {path:'/fortune', descr: 'Гадалка'}];
        const itemsToRender = items.map(item => {
            let exact;
            if (item.path === '/') exact = true;
            return <NavLink exact ={exact} className="tabs__item" to={item.path} activeClassName='tabs__item-active'>{item.descr}</NavLink>
        });
        return (
            <Router>
                <div className="tabs">
                    <nav className="tabs__items">
                        { itemsToRender }
                    </nav>
                    <div className="tabs__content">
                        <Switch>
                            <Route path='/creator' component={ Creator } />
                            <Route path='/fortune' component={ Fortune } />
                            <Route path='/' component={ Essay } />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}