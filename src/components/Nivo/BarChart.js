import React from 'react';
import { ResponsiveBar } from '@nivo/bar'

const theme = {
    background: 'transparent',
    fontFamily: 'sans-serif',
    fontSize: 11,
    textColor: '#fff',
    axis: {
      domain: {
        line: {
          stroke: 'transparent',
          strokeWidth: 1
        }
      },
      ticks: {
        line: {
          stroke: '#fff',
          strokeWidth: 1
        },
        text: {}
      },
      legend: {
        text: {
          fontSize: 12
        }
      }
    },
    grid: {
      line: {
        stroke: '#141b2d',
        strokeWidth: 1
      }
    },
    legends: {
      text: {
        fill: '#fff'
      }
    },
    labels: {
      text: {}
    },
    markers: {
      lineColor: '#000000',
      lineStrokeWidth: 1,
      text: {}
    },
    dots: {
      text: {}
    },
    tooltip: {
      container: {
        background: 'white',
        color: 'inherit',
        fontSize: 'inherit',
        borderRadius: '2px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
        padding: '5px 9px'
      },
      basic: {
        whiteSpace: 'pre',
        display: 'flex',
        alignItems: 'center'
      },
      table: {},
      tableCell: {
        padding: '3px 5px'
      }
    },
    crosshair: {
      line: {
        stroke: '#ccc',
        strokeWidth: 1,
        strokeOpacity: 0.75,
        strokeDasharray: '6 6'
      }
    },
    annotations: {
      text: {
        fontSize: 13,
        outlineWidth: 2,
        outlineColor: '#ffffff'
      },
      link: {
        stroke: '#fff',
        strokeWidth: 1,
        outlineWidth: 2,
        outlineColor: '#ffffff'
      },
      outline: {
        fill: 'none',
        stroke: '#fff',
        strokeWidth: 2,
        outlineWidth: 2,
        outlineColor: '#ffffff'
      },
      symbol: {
        fill: '#fff',
        outlineWidth: 2,
        outlineColor: '#ffffff'
      }
    }
}
export const MyResponsiveBar = ({ data, myKeys, colors /* see data tab */ }) => (
    <ResponsiveBar
        data={data}
        keys={myKeys}
        indexBy="month"
        valueFormat=" >-$0c"
        groupMode="grouped"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
       
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={colors}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#ecd5c3',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#ECD5C3',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
         /*    {
                match: {
                    id: 'others'
                },
                id: 'dots'
            }, */
            {
                match: {
                    id: 'health'
                },
                id: 'lines'
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'months',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'amount',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="white"
          legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                itemTextColor: "#fff",
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        theme={theme}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)