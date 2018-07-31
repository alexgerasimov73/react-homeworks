'use strict';

const profileStyle = {
  border: '1px solid #cccccc',
  borderRadius: '5px',
  width: '100%',
  height: '100%',
  margin: '5px'
};

const imageStyle = {
  width: '200px',
  height: '200px'
};

const Profile = props => {
  return (
    <div className="col-md-4 text-center" style={{marginBottom: '10px'}}>
      <div style={profileStyle}>
        <h2>{props.first_name} {props.last_name}</h2>
        <div>
          <img src={props.img} className="img-thumbnail" style={imageStyle}/>
        </div>
        <p>vk: <a href={props.url}>{props.url}</a></p>
        <p>birthday: <a href={props.birthday}>{props.birthday}</a></p>
      </div>
    </div>
  );
};

const urlTypeCheck = (props, propName, componentName) => {
  const regExp = new RegExp('^(https)://((id[0-9][0-9]+)|([A-Za-z0-9_-]+))', 'g');
  const url = props[propName];
  const isValid = typeof url === 'string' && regExp.test(url);
  if (!isValid) {
    return new Error('Неверный формат');
  }
  return null;
}
 Profile.defaultProps = {
  img: './images/profile.jpg'
}
 Profile.propTypes = {
  url: urlTypeCheck,
  birthday: (props, propName, componentName) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(props[propName])) {
      const {year, month, day} = currentDate();
      const propYear = props[propName].slice(0,4);
      const propMonth = props[propName].slice(5,7);
      const propDay = props[propName].slice(8);
      if (year > propYear) return null;
      if (year == propYear) {
        if (month > propMonth) return null;
        else if (month == propMonth) {
          if (day >= propDay) return null;
        }
      }
    }
    return new Error('Неверный формат');
  }
}
 function currentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const day = date.getDate();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  return {year, month, day};
}