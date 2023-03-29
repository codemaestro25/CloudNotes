import React, { useContext } from 'react'
import Notes from './Notes'
import AddNotes from './AddNotes';

const Home = (props) => {
 const{showAlert, theme}=props
  return (
    <div className='container md-3'>
      <AddNotes showAlert={showAlert} theme={theme}/>
      <Notes showAlert = {showAlert} theme={theme}/> 
      {/* using props using destructuring */}
    </div>
  )
}

export default Home
