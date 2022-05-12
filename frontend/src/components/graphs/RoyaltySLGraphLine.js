import React from "react";
import { ResponsiveLine } from "@nivo/line";

let dataTemplate = [
  {
    id: "japan",
    color: "hsl(259, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 1,
      },
      {
        x: "helicopter",
        y: 297,
      },
      {
        x: "boat",
        y: 77,
      },
      {
        x: "train",
        y: 290,
      },
      {
        x: "subway",
        y: 39,
      },
      {
        x: "bus",
        y: 13,
      },
      {
        x: "car",
        y: 239,
      },
      {
        x: "moto",
        y: 269,
      },
      {
        x: "bicycle",
        y: 28,
      },
      {
        x: "horse",
        y: 266,
      },
      {
        x: "skateboard",
        y: 184,
      },
      {
        x: "others",
        y: 229,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(81, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 117,
      },
      {
        x: "helicopter",
        y: 84,
      },
      {
        x: "boat",
        y: 118,
      },
      {
        x: "train",
        y: 132,
      },
      {
        x: "subway",
        y: 141,
      },
      {
        x: "bus",
        y: 190,
      },
      {
        x: "car",
        y: 192,
      },
      {
        x: "moto",
        y: 187,
      },
      {
        x: "bicycle",
        y: 25,
      },
      {
        x: "horse",
        y: 93,
      },
      {
        x: "skateboard",
        y: 29,
      },
      {
        x: "others",
        y: 21,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(329, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 14,
      },
      {
        x: "helicopter",
        y: 209,
      },
      {
        x: "boat",
        y: 178,
      },
      {
        x: "train",
        y: 243,
      },
      {
        x: "subway",
        y: 273,
      },
      {
        x: "bus",
        y: 284,
      },
      {
        x: "car",
        y: 23,
      },
      {
        x: "moto",
        y: 198,
      },
      {
        x: "bicycle",
        y: 64,
      },
      {
        x: "horse",
        y: 207,
      },
      {
        x: "skateboard",
        y: 100,
      },
      {
        x: "others",
        y: 300,
      },
    ],
  },
];

function transformData(managerData) {
  let transformedData = [];
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  if (managerData.length != 0) {
    for (let k = 0; k < managerData.length; k++) {
      transformedData.push({
        id: managerData[k].managerAddress,
        data: [],
      });
      
      for (let i = 0; i < managerData[k].royaltyData.length - 2; i = i + 3) {
        // let month = months[new Date(managerData[k].royaltyData[i + 1] *1000).getMonth()];
        transformedData[k].data.push({
          x: new Date(managerData[k].royaltyData[i + 1] *1000),//.toISOString().slice(0,10),
          y: managerData[k].royaltyData[i],
        });
      }
      transformedData[k].data.sort((a, b) => a.x - b.x);
      for (let i = 0; i < transformedData[k].data.length; i++) {
        transformedData[k].data[i].x = transformedData[k].data[i].x.toISOString().slice(0,10);
      }
    }
  }
  console.log("gr data", transformedData );
  return transformedData;
}
export const RoyaltySlGraphLine = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    data={transformData(data)}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    // xScale={{ type: "point" }}
    xScale={{
        type: "time",
        format: "%Y-%m-%d"
      }}
    xFormat="time:%Y-%m-%d"
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: false,
      reverse: false,
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      format: "%b %d",
      legend: "Royalty Issue Date",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Royalty Value (in $)",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);
