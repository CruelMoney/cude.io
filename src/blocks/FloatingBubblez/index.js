import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import fetcher from '../../higher-order-components/Fetcher/index'

import styles from './index.scss'

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

class Bubble extends React.Component {

  up = false
  animate(bubble){
    if(bubble){
        const amount = (this.up ? -1 : 1) * 3 + this.translateX*2
        const translate = `translateY(${amount}px)`
        bubble.style.transform = 
        translate + this.transform
        this.up = !this.up
    }
  }
    

  componentWillMount(){
    this.scale = 
      this.props.scale === 3 ? "2.2" :
      this.props.scale === 2 ? "1.7" :
      "1.1"
    
    this.translateLevel = 
      this.props.scale === 3 ? 1.5 :
      this.props.scale === 2 ? 2 :
      3
    
    this.translateX = 
      (Math.random() < 0.5 ? -1 : 1) * Math.random() * 10 * this.translateLevel

    

    this.transform = ` scale(${this.scale}) translateX(${this.translateX}px)`
   
  }

  bubble = null

  render() {
    

    return (
       <li
        {...this.props}
        ref={r=>{
            if(r){
              setTimeout(()=> {
              window.setInterval( () => this.animate(r), 1000 );
                }, Math.floor(Math.random() * 1000));
            }
          }}
        style={{transform: `scale(${this.scale})` }}
        className={styles.bubble}
       >
        {this.props.name}
      </li>
    );    
  }
}


class Bubblez extends React.Component {
  
  componentWillMount(){
    this.cells = this.generateCells()
  }

  generateCells(){
    const rows = 3
    const cols = 7

    const cellwidth = 100/cols  
    const cellHeight = 100/rows 
    
    const cells = createArray(rows,cols) // [rows][cols]

    var count = 0

    for (var i = 0; i < cols; i++) { 
       for (var j = 0; j < rows; j++) { 
            if(++count % 2 === 0){
            cells[j][i] =
            {
              left: i*cellwidth, 
              top: j*cellHeight,
              occupied: false,
              size: 0
            }
          }else{
            cells[j][i] =
            {
              left: i*cellwidth, 
              top: j*cellHeight,
              occupied: true,
              size: 0
            }
          }
       }
    }
    return cells
  }

  fillNextCell(cells, size){
    const rows = 3
    const cols = 7

    var colsCounts = []
    var rowsCounts = []
    
    for (var i = 0; i < rows; i++) {
      const occupiedCount = cells[i].reduce((a, b) => ({size: a.size + b.size})).size;
      rowsCounts[i] = occupiedCount

      //also count column 
      for (var j = 0; j < cols; j++) { 
      
          colsCounts[j] ? colsCounts[j] + cells[i][j].size :  colsCounts[j] = cells[i][j].size
        
      } 
    } 


    //Array of sorted priorities
    colsCounts = shuffleArray(colsCounts
      .map((v,idx)=>{return{idx:idx,val:v}}))
      .sort((a,b)=>a.val>b.val)
    rowsCounts = shuffleArray(rowsCounts
      .map((v,idx)=>{return{idx:idx,val:v}}))
      .sort((a,b)=>a.val>b.val)


    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) { 
        var r = rowsCounts[i].idx
        var c = colsCounts[j].idx
        if(!cells[r][c].occupied){
          cells[r][c].size = size
          cells[r][c].occupied = true
          return cells[r][c]
        }
      } 
    } 

   

  }


  render() {



    return (
      <ul className={styles.wrapper}> 
        {this.props.data
          .sort((a,b)=>a.level>b.level)
          .map(skill=>{
          
          var cell = this.fillNextCell(this.cells, skill.level)
          cell = {"top": cell.top + "%", "left": cell.left + "%"}

          return(
            <div
            className={styles.bubbleWrapper}
            style={cell}
            > 
          <Bubble
            key={skill._id}
            name={skill.name}
            scale={skill.level}
          / >
          </div>
          )
        })}
      </ul>
    );    
  }
}

export default fetcher(Bubblez, '/api/skills')

