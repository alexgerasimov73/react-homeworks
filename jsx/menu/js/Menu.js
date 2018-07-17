const Menu = ({items, opened}) => {
  const {title, href} = items;
  if (opened) {
    return (
      <div className="menu menu-open">
        <div className="menu-toggle"><span></span></div>
        <nav>
          <ul>
            {items.map((item, index) => 
              <li key={index}><a href={item.href}>{item.title}</a></li>)}
          </ul>
        </nav>
      </div>
    )
  } else {
    return (
      <div className="menu">
        <div className="menu-toggle"><span></span></div>
      </div>
    )
  }
}