import React from 'react';

const CherishDesign = () => (
  <div style={{
    width: '100%',
    height: '100%',
    position: 'relative',
    background: 'linear-gradient(360deg, #000B2D 0%, #14318F 100%)',
    borderRadius: 20,
    overflow: 'hidden'
  }}>
    {/* Title */}
    <div style={{
      width: 203,
      height: 53,
      left: 58,
      top: 49,
      position: 'absolute',
      color: 'white',
      fontSize: 40,
      fontFamily: 'Inter',
      fontWeight: '800',
      wordWrap: 'break-word'
    }}>
      CHERISH.
    </div>

    {/* Circles */}
    <div style={{
      width: 1153,
      height: 1153,
      left: -717.30,
      top: 1410.18,
      position: 'absolute',
      transform: 'rotate(-62.91deg)',
      transformOrigin: '0 0',
      borderRadius: 9999,
      border: '2px white solid'
    }} />
    
    <div style={{
      width: 596,
      height: 596,
      left: 490,
      top: -79,
      position: 'absolute',
      borderRadius: 9999,
      border: '2px white solid'
    }} />

    <div style={{
      width: 900.22,
      height: 894.43,
      left: 535,
      top: -301.15,
      position: 'absolute',
      transform: 'rotate(-16.45deg)',
      transformOrigin: '0 0',
      background: 'radial-gradient(83.84% 83.73% at 37.16% 188.95%, #B0C8F4 0%, #6074B9 100%)',
      boxShadow: '400px 400px 400px ',
      filter: 'blur(400px)'
    }} />

    <div style={{
      width: 434.71,
      height: 431.92,
      left: 919,
      top: 557.07,
      position: 'absolute',
      transform: 'rotate(-16.45deg)',
      transformOrigin: '0 0',
      background: 'radial-gradient(83.84% 83.73% at 37.16% 188.95%, #B0C8F4 0%, #6074B9 100%)',
      boxShadow: '400px 400px 400px ',
      filter: 'blur(400px)'
    }} />

    {/* White Box */}
    <div style={{
      width: 895,
      height: 289,
      left: 416,
      top: 439,
      position: 'absolute',
      background: 'white',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.90)',
      borderRadius: 100
    }} />

    {/* More Circles */}
    <div style={{
      width: 796,
      height: 796,
      left: 1426,
      top: 209,
      position: 'absolute',
      borderRadius: 9999,
      border: '1px white solid'
    }} />

    <div style={{
      width: 455.90,
      height: 455.90,
      left: 643.95,
      top: 783,
      position: 'absolute',
      transform: 'rotate(30deg)',
      transformOrigin: '0 0',
      borderRadius: 9999,
      border: '1px white solid'
    }} />

    {/* "Add a Memory..." Text */}
    <div style={{
      width: 697,
      height: 99,
      left: 515,
      top: 558,
      position: 'absolute',
      textAlign: 'center',
      color: 'black',
      fontSize: 40,
      fontFamily: 'Inter',
      fontWeight: '800',
      wordWrap: 'break-word'
    }}>
      ADD A MEMORY...
    </div>

    {/* Faded Circle */}
    <div style={{
      width: 863.02,
      height: 857.47,
      left: -365,
      top: 901.32,
      position: 'absolute',
      transform: 'rotate(-16.45deg)',
      transformOrigin: '0 0',
      opacity: 0.40,
      background: 'radial-gradient(83.84% 83.73% at 37.16% 188.95%, #B0C8F4 0%, #6074B9 100%)',
      boxShadow: '200px 200px 200px ',
      filter: 'blur(200px)'
    }} />

    {/* Image */}
    <img
      style={{
        width: 100,
        height: 101,
        left: 1563,
        top: 49,
        position: 'absolute',
        boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.90)'
      }}
      src="https://via.placeholder.com/100x101"
      alt="Placeholder"
    />
  </div>
);

export default CherishDesign;
