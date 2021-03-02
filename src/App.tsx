import React, {Component, createRef, useState} from 'react';
import './App.css';
//@ts-ignore
import  sound from "./assets/sound/mus.mp3"

function App() {

    const [cellData, setCellData] = useState <any> (Array(9).fill(null));
    const [turn, setTurn] = useState (0);
    const [inteleg, setInteleg] = useState (false);
    const [count, setCount] = useState (0);

    const combination:Array<any>=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

    let mark:any
    if (turn % 2 == 0) { mark = "X"}
    if (turn % 2 != 0) { mark = "O"}

         const RadioHandler=(e:any)=>{
            if (e.currentTarget.value==="X") {
                setTurn(0)}

            if (e.currentTarget.value==="O") {
                setTurn(1)}
         }

        const handler=(e:any)=>{
        let cellIndex=e.currentTarget.getAttribute("data")
              let copyCellData=[...cellData]
              let newCellData = copyCellData.map((cell:any, key,i) => {
                    if (cellIndex == key && cell==null) {
                                setCount(count+1)
                        setTimeout(()=>{setInteleg(!inteleg)},300)
                                setTurn(turn+1)
                                return mark}
                    else {return cell}     })
            setCellData(newCellData)
            checkWinner(newCellData)
            const beep=document.getElementById("sound") as HTMLAudioElement
            beep.play()
           }

                                                      // let result:any
                                                      // let title:any
          let checkWinner=(cellData:any)=>{
          for (let i=0; i<8; i++) {
              if ( cellData[combination[i][0]]===cellData[combination[i][1]] &&
                   cellData[combination[i][1]]===cellData[combination[i][2]] &&
                   cellData[combination[i][1]]!= null
                  )
              {alert(cellData[combination[i][1]] + " win")
               window.location.reload() }
              //      result = confirm("question")
              //   result = prompt(title,"you")

             }

    }

          if (inteleg){

             let i=1
             while (i<999) {
                        let randomTurn=Math.floor(Math.random()*8)
                            if (cellData[randomTurn]==null){
                                let newCellData=[...cellData]
                                    newCellData[randomTurn]=mark
                                    setInteleg(!inteleg)
                                    setCellData(newCellData)
                                    setTurn(turn+1)
                                    i=999
                            }
                        i++
                    }
          }





    let resetGame=()=>{window.location.reload()}

    let saveGame=()=>{
        const dataAsString = JSON.stringify(cellData);
        localStorage.setItem("keyTicToc", dataAsString)
    }
   let loadGame=()=>{
       const dataAsString = localStorage.getItem("keyTicToc");
       if (dataAsString !== null) {let dataAsJson = JSON.parse(dataAsString);
        setCellData (dataAsJson)}
    }

    let fulScreen = ()=> {
        if (document.fullscreenElement===null) {
            document.documentElement.requestFullscreen()
        }else{document.exitFullscreen()}
    }


    let cellArea = cellData.map((cell:any,i:any)=> <div className={"game_cell"}
                                                    //@ts-ignore
                                                    data={i}
                                                    onClick={(e)=>handler(e)}>
                                                    <p className={"mark"}>{cell}</p>
                                                    </div>)



    return (
        <div className="App">

            <audio id='sound' src={sound} />

              <div className="main_container">
                <div className="header">TIC TOC GAME</div>
                    <div className="header_option">
                        <button className="header_button" onClick={resetGame}>Reset</button>
                        <div className="display">
                            <span>Сделано ходов</span>
                            <span className="score_window">{count}</span>
                        </div>
                        <div className="store_container">
                            <button className="store_button" onClick={saveGame}>Save</button>
                            <button className="store_button" onClick={loadGame}>Restore</button>
                        </div>
                        <button className="header_button" onClick={()=>fulScreen()}>fulScr</button>
                    </div>
                <div className="choice_menu">
                    <input type="radio" id="tic" name="contact" value="X" onClick={(e) => RadioHandler(e)}
                           checked={true}/>
                    <label htmlFor="tic">Играть крестиками</label>
                    <input type="radio" id="toc" name="contact" value="O" onClick={(e) => RadioHandler(e)}/>
                    <label htmlFor="toc">Играть ноликами</label>
                </div>
                <div id={"testarea"} className="game_box_container">
                    {cellArea}
                </div>
                <div className="footer">
                    <a href={"https://rs.school/js/"}>
                      <img src={"https://rs.school/images/rs_school_js.svg"} style={ {width: "40px" }  }   />
                    </a>
                    <a href={"https://github.com/AMmetro/"}>
                    <span className={"git_link"}>Github.com/AMmetro</span>
                    </a>
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"} style={ {width: "20px"}} />


                </div>
            </div>
        </div>
    );
}

export default App;
