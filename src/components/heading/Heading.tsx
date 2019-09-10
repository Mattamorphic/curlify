import './css/Heading.css';

import React from 'react';

interface HeadingProps {
  imageSrc: string;
}

const Heading: React.FunctionComponent<HeadingProps> = props => {
  return (
    <div className="Heading">
      <img alt="curlify logo" src={props.imageSrc} />
    </div>
  );
};

export default Heading;
