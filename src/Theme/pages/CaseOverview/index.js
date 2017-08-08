import React from 'react';
import { Link } from 'react-router';
import Case from '../../blocks/Case'
import styles from './index.module.css'
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import {DBText, fetcher} from 'cude-cms'
import { connect } from 'react-redux';
import * as a from './actions'
import {init, keyframes} from './scrollAnimation'
import Button from '../../components/Button/index'

var endReached = false

class CaseOverview extends React.Component {

  scrollContainer = null

  componentDidMount(){
    init(this.scrollContainer)
  }

  renderCases = () => {
    return this.props.data
      .sort((a,b)=>a.sortOrder-b.sortOrder)
      .map((theCase, ndx) =>
          
          <div 
          key={theCase._id}
          className={styles.caseItem}>
       
            <Case 
            case={theCase}
            fullyEnterViewport={() => {
              this.props.pushCaseInfo(theCase)
            }}
             />
          </div>
          
   );
  }

  render() {


    return (
      <section 
      id="case-overview"
     >  
     
        
        <h2 className={styles.header}>
          Work
        </h2>
        
        <div 
        ref={con=>{
          this.scrollContainer = con
        }}
        className={styles.casesContainer}>
            
              <section id="case-frame"
             
              >
                <Grid fluid className="container">
                <Row>
                  <Col xs={12} >
                  <div className="frame">
                    <div className="case-type">
                      <h4>
                        Website
                      </h4>
                    </div>
                  </div>
                  </Col>
                </Row>
                </Grid>
              </section>
            
            <section 
            ref={sec=>{
              
              keyframes.push({
                'wrapper' : sec,
                'duration' : '100%',
                'animations' :  [

                    {
                    'selector'    : '#case-frame',
                    'translateY'  : ['50%', '-50%'],
                    'easing'      : 'linear',
                    'opacity'     : [1, 1] 
                  },
              
                  {
                    'selector'    : '#case-text',
                    'translateY'  : ['80%', '0%'],
                    'easing'      : 'linear',
                    
                    'opacity'     : [-1, 1] 
                  },
                  {
                    'selector'    : '#case-image-1',
                    'translateY'  : ['30%', '0%'],
                    'easing'      : 'linear',
                    'opacity'     : [-1, 1] 
                  },
                  {
                    'selector'    : '#case-image-2',
                    'translateY'  : ['40%', '0%'],
                    'easing'      : 'linear',
                    'opacity'     : [-1, 1] 
                  },
                  {
                    'selector'    : '#case-image-3',
                    'translateY'  : ['50%', '0%'],
                    'easing'      : 'linear',
                    'opacity'     : [-1, 1] 
                  }
                ]
              })
        
               keyframes.push({
                'wrapper' : sec,
                'duration' : '100%',
                'animations' :  [
                  {
                    'selector'    : '#case-text',
                    'translateY'  : ['0%','-80%'] ,
                    'opacity'     : [1, 0] 
                  },
                  {
                    'selector'    : '#case-image-1',
                    'translateY'  : ['0%', '-10%'],
                    'opacity'     : [1, 0] 
                  },
                  {
                    'selector'    : '#case-image-2',
                    'translateY'  : ['0%', '-20%'],
                    'opacity'     : [1, 0] 
                  },
                  {
                    'selector'    : '#case-image-3',
                    'translateY'  : ['0%', '-30%'],
                    'opacity'     : [1, 0] 
                  }
                ]
              })

            }}
            id="case" className={styles.wrapper}>
            <Grid fluid className="container">
              <Row middle="xs">
                <Col sm={5} smOffset={1}  >
                  <div id="case-text">
                    <h3>
                    California Kitchen
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  <Button
                  
                  mainColor={"#F9CD45"}
                  hoverTextColor={"#ffffff"}
                  >
                    READ MORE
                  </Button>
                   <Button
                  mainColor={"#F9CD45"}
                  hoverTextColor={"#ffffff"}
                  >
                    VISIT
                  </Button>
                  </div>
                </Col>
                <Col
                  sm={5}
                  smOffset={1}
                >
                  <div id="case-images">
                    <img id="case-image-1" src="" alt=""/>
                    <img id="case-image-2" src="" alt=""/>
                    <img id="case-image-3" src="" alt=""/>
                  </div>
                </Col>
              </Row>
             </Grid>
            </section>
            <section id={styles.explosion} className={styles.wrapper}
              ref={ref=>{
                keyframes.push(
                  {
                  'wrapper' : ref,
                  'duration' : '150%',
                  'animations' :  [
                    {
                      'selector'    : '.explosion-byline',
                      'translateY'  : '-25%',
                      'opacity'     : [0, 1.75] // hack to accelrate opacity speed
                    } , {
                      'selector'    : '#domExplosionList',
                      'translateY'  : '-70%',
                      'opacity'     : [0, 1] // hack to accelrate opacity speed
                    }
                  ]
                } )
                keyframes.push( {
                  'wrapper' : ref,
                  'duration' : '150%',
                  'animations' :  [
                    {
                      'selector'    : '.dei-1',
                      'translateY'  : '-15%',
                      'translateX'  : '-10%',
                      'opacity'     : [1, 0],
                      'scale'       : 2,
                    } , {
                      'selector'    : '.dei-2',
                      'translateY'  : '-5%',
                      'translateX'  : '-4%',
                      'opacity'     : [1, 0] // hack to decelrate opacity speed
                    } , {
                      'selector'    : '.dei-3',
                      'translateY'  : '-9%',
                      'translateX'  : '2%',
                      'opacity'     : [1, 0], // hack to accelrate opacity speed
                      'scale'       : 1.2,
                    } , {
                      'selector'    : '.dei-4',
                      'translateY'  : '-17%',
                      'translateX'  : '8%',
                      'opacity'     : [1, 0], // hack to accelrate opacity speed
                      'scale'       : 1.5,
                    } , {
                      'selector'    : '.dei-5',
                      'translateY'  : '-2%',
                      'translateX'  : '-15%',
                      'opacity'     : [1, 0],
                      'scale'       : 2,
                    } , {
                      'selector'    : '.dei-6',
                      'translateY'  : '-1%',
                      'translateX'  : '-7%',
                      'opacity'     : [1, 0], // hack to decelrate opacity speed
                      'scale'       : 1.2,
                    } , {
                      'selector'    : '.dei-7',
                      'translateY'  : '-4%',
                      'translateX'  : '2%',
                      'opacity'     : [1, 0], // hack to accelrate opacity speed
                      'scale'       : 1.1,
                    } , {
                      'selector'    : '.dei-8',
                      'translateY'  : '-3%',
                      'translateX'  : '12%',
                      'opacity'     : [1, 0], // hack to accelrate opacity speed
                      'scale'       : 1.8,
                    } , {
                      'selector'    : '.dei-9',
                      'translateY'  : '3%',
                      'translateX'  : '-12%',
                      'opacity'     : [1, 0],
                      'scale'       : 1.5,
                    } , {
                      'selector'    : '.dei-10',
                      'translateY'  : '5%',
                      'translateX'  : '-4%',
                      'opacity'     : [1, 0] // hack to decelrate opacity speed
                    } , {
                      'selector'    : '.dei-11',
                      'translateY'  : '8%',
                      'translateX'  : '6%',
                      'opacity'     : [1, 0], // hack to accelrate opacity speed
                      'scale'       : 1.4,
                    } , {
                      'selector'    : '.dei-12',
                      'translateY'  : '1%',
                      'translateX'  : '20%',
                      'opacity'     : [1, 0], // hack to accelrate opacity speed
                      'scale'       : 1.9,
                    } , {
                      'selector'    : '.dei-13',
                      'translateY'  : '8%',
                      'translateX'  : '-12%',
                      'opacity'     : [1, 0],
                      'scale'       : 1.8,
                    } , {
                      'selector'    : '.dei-14',
                      'translateY'  : '4%',
                      'translateX'  : '-3%',
                      'opacity'     : [1, 0], // hack to decelrate opacity speed
                      'scale'       : 1.3,
                    } , {
                      'selector'    : '.dei-15',
                      'translateY'  : '14%',
                      'translateX'  : '5%',
                      'opacity'     : [1, 0], // hack to accelrate opacity speed
                      'scale'       : 1.7,
                    } , {
                      'selector'    : '.dei-16',
                      'translateY'  : '6%',
                      'translateX'  : '9%',
                      'opacity'     : [1, 0], // hack to accelrate opacity speed
                      'scale'       : 2,
                    }
                  ]
                } )
                keyframes.push( {
                  'wrapper' : ref,
                  'duration' : '100%',
                  'animations' :  [
                    {
                      'selector'    : '.explosion-byline',
                      'translateY'  : ['-25%', '-40%'],
                      'opacity'     : [1, 0] // hack to accelrate opacity speed
                    }
                  ]
                }
                )
              }}
            
            >
              <p className="explosion-byline">Here's an example of 16 elements scaling, fading and moving at once.</p>
              <ul id="domExplosionList">
                <li className="dom-explosion-item dei-1"></li>
                <li className="dom-explosion-item dei-2"></li>
                <li className="dom-explosion-item dei-3"></li>
                <li className="dom-explosion-item dei-4"></li>
                <li className="dom-explosion-item dei-5"></li>
                <li className="dom-explosion-item dei-6"></li>
                <li className="dom-explosion-item dei-7"></li>
                <li className="dom-explosion-item dei-8"></li>
                <li className="dom-explosion-item dei-9"></li>
                <li className="dom-explosion-item dei-10"></li>
                <li className="dom-explosion-item dei-11"></li>
                <li className="dom-explosion-item dei-12"></li>
                <li className="dom-explosion-item dei-13"></li>
                <li className="dom-explosion-item dei-14"></li>
                <li className="dom-explosion-item dei-15"></li>
                <li className="dom-explosion-item dei-16"></li>
              </ul>
            </section>
        </div>

      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => {  
      return { pushCaseInfo: (theCase) => dispatch(a.pushCaseInfo(theCase)) }
}


CaseOverview = connect(state=>state, mapDispatchToProps)(CaseOverview)


export default fetcher(CaseOverview, '/api/cases')



