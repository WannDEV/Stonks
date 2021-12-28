import { ListItemSecondaryAction } from "@mui/material";
import { styled } from "@mui/material/styles";

const FullSizeBox = styled("div")(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "40rem",
  overflow: "hidden",
  top: "-3rem",
  left: "0",
  padding: "5rem 0 0 5rem",
}));

const PerspectiveBox = styled("div")(({ theme }) => ({
  position: "relative",
  width: "30rem",
  perspective: "70rem",
  height: "25rem",
}));

const GraphicStartBox = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  transform: "rotate3d(0.5, -0.866, 0, 15deg) rotateZ(-1deg)",
  borderRadius: "4px",
  position: "relative",
}));

const GraphicBox = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  backgroundColor: theme.palette.background.main,
  outline: "1px solid transparent",
  border: `2px solid ${theme.palette.grey.main}`,
  position: "relative",
}));

const GraphicTitleBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.grey.main,
  boxShadow: "0 0 5px 0 black",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  height: "2rem",
  fontSize: "1.2rem",
  flex: "0 0 auto",
  position: "relative",
  borderBottom: `2px solid ${theme.palette.grey.main}`,
}));

const GraphicTitleSpan = styled("span")(({ theme }) => ({
  color: theme.palette.text.primary,
  margin: "0 0 0 1rem",
}));

const GraphicContentBox = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1",
  flexDirection: "column",
  padding: theme.spacing(2),
}));

const GraphBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexGrow: "1",
  justifyContent: "center",
  alignItems: "center",
}));

const GraphOuterBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  justifyContent: "center",
  backgroundColor: theme.palette.background.light,
  borderRadius: "4px",
  height: "16.5rem",
}));

const ContentColorBox = styled("div")(({ theme }) => ({
  padding: "1rem",
  margin: `${theme.spacing(2)} 0`,
  backgroundColor: theme.palette.background.light,
}));

const ColorSpan = styled("span")(({ theme }) => ({
  display: "inline-block",
  height: "1rem",
  borderRadius: "4px",
  margin: "0 4px 0 0",
}));

const HeroSectionGraphic = () => {
  window.$ = window.jQuery = require("jquery");

  let colorBoxes = [];
  const colors = ["#dc3c4d", "#F6D912", "#21ABA5", "#00BBF0"];

  const getRandomColor = (colorList) => {
    return colorList[Math.floor(Math.random() * colorList.length)];
  };

  const getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const generateColorBoxes = () => {
    for (let i = 0; i < 4; ++i) {
      colorBoxes.push(
        <ColorSpan
          sx={{
            backgroundColor: getRandomColor(colors),
            width: `${getRandomNumberBetween(5, 24)}%`,
          }}
          key={i}
        />
      );
    }
  };

  generateColorBoxes();

  const graphBoxWidth = 400;
  const graphBoxHeight = 225;

  let line1Data = [
    [0, 0.5],
    [0.1, 0.4],
    [0.2, 0.3],
    [0.3, 0.25],
    [0.4, 0.45],
    [0.5, 0.6],
    [0.6, 0.7],
    [0.7, 0.4],
    [0.8, 0.22],
    [0.9, 0.1],
    [1, 0.15],
  ];
  let line2Data = [
    [0, 0.7],
    [0.1, 0.8],
    [0.2, 0.75],
    [0.3, 0.5],
    [0.4, 0.3],
    [0.5, 0.35],
    [0.6, 0.42],
    [0.7, 0.7],
    [0.8, 0.75],
    [0.9, 0.65],
    [1, 0.55],
  ];

  // Generate an svg path
  function generateSvgPath(data, colorClass) {
    let svgPath = `<path class="chart-line ${colorClass}" d="`;
    let startCP;
    let endCP;
    data.forEach((dot, i) => {
      if (i !== 0) {
        startCP = controlPoint(data[i - 1], data[i - 2], dot);
        endCP = controlPoint(dot, data[i - 1], data[i + 1], true);
      }
      svgPath += i === 0 ? "M " : "C ";
      svgPath +=
        i === 0
          ? `${dot[0]},${dot[1]} `
          : `${startCP.x},${startCP.y} ${endCP.x},${endCP.y} ${dot[0]},${dot[1]} `;
    });
    // Close the chart for filling color
    svgPath += `L ${graphBoxWidth} ${graphBoxHeight} L 0 ${graphBoxHeight} L ${data[0][0]},${data[0][1]} "></path>`;
    return svgPath;
  }

  // Get length and angle between two points
  // Reference: https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
  const line = (pointA, pointB) => {
    const lengthX = pointB[0] - pointA[0];
    const lengthY = pointB[1] - pointA[1];
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX),
    };
  };

  // Get a control point for curve line
  // Reference: https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
  const controlPoint = (current, previous, next, reverse) => {
    const p = previous || current;
    const n = next || current;
    const smoothing = 0.15;
    const o = line(p, n);
    const angle = o.angle + (reverse ? Math.PI : 0);
    const length = o.length * smoothing;
    const x = current[0] + Math.cos(angle) * length;
    const y = current[1] + Math.sin(angle) * length;
    return { x, y };
  };

  const addLineToSVG = (data, color) => {
    // scale the data
    data = data.map((item) => [
      item[0] * graphBoxWidth,
      item[1] * graphBoxHeight,
    ]);
    let line = generateSvgPath(data, color);
    $("#chart-container").append(line);
    $("#chart-container").html($("#chart-container").html());
    // append doesn't refresh svg, this is why:
    // https://stackoverflow.com/questions/3642035/jquerys-append-not-working-with-svg-element
  };

  $(document).ready(async () => {
    addLineToSVG(line1Data, "primary");
    addLineToSVG(line2Data, "secondary");
  });

  return (
    <FullSizeBox>
      <PerspectiveBox>
        <GraphicStartBox>
          <GraphicBox>
            <GraphicTitleBox>
              <GraphicTitleSpan>Aktier</GraphicTitleSpan>
            </GraphicTitleBox>
            <GraphicContentBox>
              <GraphOuterBox>
                <GraphBox>
                  <svg
                    viewBox={`0 0 ${graphBoxWidth} ${graphBoxHeight}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width={graphBoxWidth}
                    height={graphBoxHeight}
                    version="1.1"
                    className="svg-container"
                  >
                    <defs>
                      <pattern
                        id="p"
                        patternUnits="userSpaceOnUse"
                        width="21"
                        height="21"
                      >
                        <rect
                          className="grid-back"
                          width="20"
                          height="20"
                          x="0"
                          y="0"
                        ></rect>
                      </pattern>
                    </defs>
                    <rect
                      className="grid-front"
                      width={graphBoxWidth}
                      height={graphBoxHeight}
                    />
                    <rect
                      width={graphBoxWidth}
                      height={graphBoxHeight}
                      fill="url(#p)"
                    />
                    <g id="chart-container"></g>
                    <rect
                      className="overlay-border"
                      width={graphBoxWidth}
                      height={graphBoxHeight}
                    />
                  </svg>
                </GraphBox>
              </GraphOuterBox>
              <ContentColorBox>{colorBoxes}</ContentColorBox>
            </GraphicContentBox>
          </GraphicBox>
        </GraphicStartBox>
      </PerspectiveBox>
    </FullSizeBox>
  );
};

export default HeroSectionGraphic;
