const Logo = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      viewBox={`0 0 ${props.width} ${props.height}`}
      height={props.height}
      version="1.0"
    >
      <defs>
        <clipPath id="a">
          <path d="M 150 15.46875 L 375 15.46875 L 375 359.71875 L 150 359.71875 Z M 150 15.46875" />
        </clipPath>
        <clipPath id="b">
          <path d="M 0 96 L 281 96 L 281 359.71875 L 0 359.71875 Z M 0 96" />
        </clipPath>
      </defs>
      <g clipPath="url(#a)">
        <path
          fill="#DC3C4D"
          d="M 275.203125 286.855469 L 150.128906 283 L 374.976562 359.683594 L 187.480469 15.542969 L 157.832031 69.960938 L 187.480469 124.746094 L 275.203125 286.855469"
        />
      </g>
      <g clipPath="url(#b)">
        <path
          fill="#FFC2B4"
          d="M 86.136719 310.757812 L 145.667969 201.488281 L 172.886719 151.53125 L 143.226562 96.769531 L -0.015625 359.683594 L 280.238281 359.683594 L 86.136719 310.757812"
        />
      </g>
      <path
        fill="#ED7E79"
        d="M 172.886719 151.53125 L 145.667969 201.488281 L 181.046875 266.871094 L 236.277344 268.570312 L 172.886719 151.53125"
      />
    </svg>
  );
};

export default Logo;
