import './css/Heading.css';

import React from 'react';

interface HeadingProps {
  imageSrc: string;
}

const Heading: React.FunctionComponent<HeadingProps> = props => {
  return (
    <div className="Heading">
      <img src={props.imageSrc} alt="curlify logo" />
    </div>
  );
};

export default Heading;
