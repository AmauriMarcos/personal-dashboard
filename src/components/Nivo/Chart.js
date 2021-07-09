import React from 'react';
import { ResponsivePie } from '@nivo/pie'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const theme = {
    background: 'transparent',
    fontFamily: 'sans-serif',
    fontSize: 15,
    textColor: '#fff',
    grid: {
      line: {
        stroke: '#fff',
        strokeWidth: 1
      }
    },
    legends: {
      text: {
        fill: '#fff'
      }
    },
    labels: {
      text: {
          fill: '#fff'
      }
    }
}
export const MyResponsivePie = ({ data /* see data tab */ }) => (
    <ResponsivePie
        data={data}
        colors={{ datum: 'data.color' }}
     /*    colors={{ scheme: 'nivo' }} */
        valueFormat=" >-$0c"
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        /* innerRadius={0.5} */
        padAngle={3}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#fff"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLinkLabelsDiagonalLength={4}
        theme={theme}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'brighter', '15' ] ] }}
      /*   defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'Food'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'Others'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'Health'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'Transport'
                },
                id: 'lines'
            },
          
        ]} */
        legends={[
            {
                anchor: 'bottom',
                direction: 'column',
                justify: false,
                translateX: 200,
                translateY: 73,
                itemWidth: 83,
                itemHeight: 18,
                itemsSpacing: 0,
                symbolSize: 15,
                itemDirection: 'right-to-left',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#fff'
                        }
                    }
                ]
            }
        ]}
    />
)