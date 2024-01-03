import React from 'react'
import ReactDom from 'react-dom'
// for portal design

// style for the portal design
const MODAL_STYLES={
    position:'fixed',
    top:'50%',
    left:'50%',
    backgroundColor:'rgb(255,255,255)',
    transform:'translate(-50%,-50%)',
    zIndex:100,
    height:'90%',
    width:'90%'
}

// style for background of the portal
const OVERLAY_STYLES={
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgb(0,0,0,0.7)',
    zIndex:100, 
}

const Modal = ({children,onClose}) => {
  return ReactDom.createPortal(<>
    <div style={OVERLAY_STYLES}/>
    <div style={MODAL_STYLES}>
    <button className='bg-slate-900 text-white font-bold p-2'
    style={{marginLeft:'90%',marginTop:'-35px'}}
    onClick={onClose}>
        X</button>

        {children}
    </div>
    </>,
    document.getElementById('cart-root')
  )
}

export default Modal