
import React , {useContext} from 'react';
import NoteContext from '../Context/NoteContext';

const About = ()=> {
  const d = useContext(NoteContext)
  return (
    <div>
      This  about {d.name} whose weight is {d.weight};
    </div>
  )
}

export default About
