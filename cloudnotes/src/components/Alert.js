import React from 'react'

function Alert(props) {
  return (
    // if props.alert == true i.e if it is not null then only alert will be shown
    <div style={{height : '70px'}} >
    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show fixed-top `} style={{margin:'56px 0px', borderRadius:'0px'}} role="alert">   
    <strong>  </strong> {props.alert.msg}.
    </div>}
    </div>
  )
}

export default Alert
