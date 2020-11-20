export default {
    tree: {
        base: {
            listStyle: 'none',
            backgroundColor: '#21252B',
            margin: 0,
            padding: 0,
            color: '#9DA5AB',
            // fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
            fontSize: '14px'
        },
        node: {
            base: {
                position: 'relative',
                 padding:"6px 0px"  // 6px vertical space between two items
            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                 padding: '0px 4px', // left , right padding for each item
                display: 'block',
                
            },
            activeLink: {
                background: "#EBEBEB" , // active link color 
                padding: '8px 4px',  // active link padding 8px makes height, 4px should be equal to link padding 4px
            },
            toggle: {
                base: {
                    position: 'relative',
                    display: 'inline-block',
                    verticalAlign: 'center',
                    // marginLeft: '-5px',
                     // marginTop:"8px",
                    height: '8px',
                    width: '24px',
                    float:"right",
                    padding: '8px 4px',
                },
                wrapper: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: '-15px 0 0 -7px', // -15 px adjust arrow position
                  
                    color:"#000",  // arrpw font color
                     fontSize:"24px" // arrow font size
                },
                // height: 14,
                // width: 14,
                arrow: {
                    fill: 'black',
                    strokeWidth: 0
                }
            },
            header: {
                base: {
                    display: 'inline-block',
                    verticalAlign: 'top',
                    color: 'black'
                },
                connector: {
                    width: '2px',
                    height: '12px',
                    borderLeft: 'solid 2px black',
                    borderBottom: 'solid 2px black',
                    position: 'absolute',
                    top: '0px',
                    left: '-21px'
                },
                title: {
                    lineHeight: '8px',
                    verticalAlign: 'middle'
                }
            },
            subtree: {
                listStyle: 'none',
                paddingLeft: '19px'
            },
            loading: {
                color: '#E2C089'
            }
        }
    }
};
