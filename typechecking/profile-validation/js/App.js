'use strict';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [
        {
          first_name: 'Alexey',
          last_name: 'Korzhov',
          img: 'https://pp.userapi.com/c841136/v841136008/2afff/fJaGW9kelok.jpg',
          url: 'https://vk.com/anonimizer_me',
          birthday: '1988-09-14'
        },
        {
          first_name: 'Pavel',
          last_name: 'Durov',
          img: 'https://pp.userapi.com/c836333/v836333001/31189/8To0r3d-6iQ.jpg',
          url: 'https://vk.com/id1',
          birthday: '1984-10-10'
        },
        {
          first_name: 'Super',
          last_name: 'User',
          img: 'https://pp.userapi.com/c608920/v608920297/4b2b/EnbZfPw2eLQ.jpg',
          url: 'https://vk.com/superuser',
          birthday: '1988-03-31'
        },
        {
          first_name: 'Unknown',
          last_name: 'User',
          url: 'https://vk.com/id2',
          birthday: '1900-01-01'
        },
        {
          first_name: 'Igor',
          last_name: 'Popov',
          img: 'https://pp.userapi.com/c836736/v836736223/830e7/Qk_2DXgaGjk.jpg',
          url: 'https://vk.com/id17',
          birthday: '1982-10-21'
        },
        {
          first_name: 'Oleg',
          last_name: 'Konev',
          img: 'https://pp.userapi.com/c846418/v846418784/a54b6/eOqrbZs8XeY.jpg',
          url: 'https://vk.com/id62',
          birthday: '1900-01-01'
        }
      ]
    };
  }

  render() {
    return (
      <div className="row">
        {this.state.profiles.map((profile, i) => (
          <Profile key={`profile_${i}`} {...profile}/>
        ))}
      </div>
    );
  }
};
