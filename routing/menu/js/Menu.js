"use strict";

class Menu extends React.Component {
    render() {
        const items = [{path: '/', descr: 'Главная'}, {path: '/drift', descr: 'Дрифт-такси'}, 
                       {path: '/timeattack', descr: 'Time Attack'}, {path: '/forza', descr: 'Forza Karting'}];
        const itemsToRender = items.map(item => {
            let exact;
            if (item.path === '/') exact = true;
            return <NavLink exact={exact} className='menu__item' to={item.path} activeClassName='menu__item-active'>{item.descr}</NavLink>
        });
        return (
            <nav className="menu">
                {itemsToRender}
            </nav>
        );
    }
}