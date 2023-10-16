import React, { Component } from 'react';



class Spinner extends Component {
  render() {
    return (
      <div className='text-center m-3 '>
        
        <img src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87_w200.webp" style={{ width: '50px', height: '50px' }} className='vh-10' alt="Loading" />
        
      </div>
    );
  }
}

export default Spinner;
