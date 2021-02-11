import React from 'react'

const usersInfo = [
  {
    name: 'Azriel Goldman',
    gitHub: 'https://github.com/azrielg20',
    linkedIn: 'https://www.linkedin.com/in/azriel-goldman-67193b77/',
    photo: '/images/user-img.jpg'
  },
  {
    name: 'Gabriel Smith',
    gitHub: 'https://github.com/gabesmithp',
    linkedIn: 'https://www.linkedin.com/in/gabesmithp/',
    photo: '/images/user-img.jpg'
  },
  {
    name: 'Spencer Collins',
    gitHub: 'https://github.com/spibcol',
    linkedIn: 'https://www.linkedin.com/in/smcollins36/',
    photo: '/images/user-img.jpg'
  },
  {
    name: 'Alfred Meng',
    gitHub: 'https://github.com/alfredfmeng',
    linkedIn: 'http://www.linkedin.com/in/alfredfmeng',
    photo: '/images/user-img.jpg'
  }
]

const About = () => {
  return (
    <div className="about-container">
      {usersInfo.map(user => (
        <div key={user.id} className="team-member">
          <div>Name: {user.name}</div>
          <a href={user.gitHub} target="_blank" rel="noreferrer">
            Github Profile
          </a>
          <a href={user.linkedIn} target="_blank" rel="noreferrer">
            LinkedIn Profile
          </a>
          <img src={user.photo} alt="" />
        </div>
      ))}
    </div>
  )
}

export default About
