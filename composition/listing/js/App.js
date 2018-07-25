'use strict';

const App = ({items}) => (
  <Items items={items} />
);

const Items = ({items}) => {
    const showItems = items.map(item => {
        switch(item.type) {
          case 'unisex':
            return <Item color="black" item={item} />;
          case 'male':
            return <Item color="blue" item={item} />;
          case 'female':
            return <Item color="orange" item={item} />;
        }
    });
    return (
        <main>
            {showItems}
        </main>
    )
}
