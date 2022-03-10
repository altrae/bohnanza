import "./BeanField.css";
import Card from "../classes/Card.js";
import leftField from "../Images/1stBeanField.PNG";
import rightField from "../Images/2ndBeanField.PNG";
import coinImage from "../Images/coin.jpg";
import { useState } from 'react';
//import { useState } from 'react';

function BeanField(props) {
  //initialize variable based on beanField properties
  let x = props.x;
  let y = props.y;
  const [cardType, setCardType] = useState(props.type);
  const [cardCount, setCardCount] = useState(props.cardCount);
  let addCoins = props.addCoins;
  //initialize fieldImage based on fieldNum
  let fieldImage;
  if (props.fieldNum === 1) {
    fieldImage = leftField;
  } else if (props.fieldNum === 2) {
    fieldImage = rightField;
  }
  //initialize coinReq based on bean type
  let temp = [null];
  switch (cardType) {
    case "cocoa":
      temp = [2, 2, 3, 4];
      break;
    case "garden":
      temp = [2, 2, 3];
      break;
    case "red":
      temp = [2, 3, 4, 5];
      break;
    case "blackEyed":
      temp = [2, 4, 5, 6];
      break;
    case "soy":
      temp = [2, 4, 6, 7];
      break;
    case "green":
      temp = [3, 5, 6, 7];
      break;
    case "stink":
      temp = [3, 5, 7, 8];
      break;
    case "chili":
      temp = [3, 6, 8, 9];
      break;
    case "blue":
      temp = [4, 6, 8, 10];
      break;
    case "wax":
      temp = [4, 7, 9, 11];
      break;
    case "coffee":
      temp = [4, 7, 10, 12];
      break;
    default:
  }
    const [coinReq, setCoinReq] = useState(temp);
    //set coinCount based on cardCount and beanType
    let i = 0;
    while (cardCount >= coinReq.at(i) && i < coinReq.length) {
        i++;
    }
    const [coinCount, setCoinCount] = useState(i);
    //set coinTarget based on coinCount and beanType
    let coinTarget = 0;
    if (coinCount < coinReq.length) {
        coinTarget = coinReq.at(coinCount)
    } else {
        coinTarget = coinReq.at(coinReq.length - 1)
    }
    function harvest() {
        addCoins(coinCount);
        setCardType("")
        setCardCount(0);
        setCoinCount(0);
        setCoinReq([null]);
    }
    return (
        <div className="BeanField" style={{position:"absolute", left: 50+x+"vw", top: 50+y+"vh", width: "6.5vw", height: cardCount + 17.1 + "vw" }}>
            <button id="harvestButton" 
            style={{position:"absolute", left: 0, top: 0, width: "6.5vw", height: "2vw" }}
            onClick={harvest}>
                Harvest
            </button>

            <img id="fieldImage" alt="" src={fieldImage} style={{ left: 0, top: 2 + "vw" }} />
            {(() => {
                const cards = [];
                for (let i = 0; i < cardCount; i++) {
                    cards.push(<Card type={cardType} x={0} y={5 + i + "vw"} />);
                }
                return cards;
            })()}
            
            {(() => {
                const coinImgs = [];
                for (let i = 0; i < coinCount; i++) {
                  coinImgs.push(<img id="coinImage" alt="" src={coinImage} style={{ left: 1.6*i+"vw", top: cardCount + 15.5 + "vw"}} />);
                }
                return coinImgs;
            })()}

            <text id="coinProgress"  style={{ position: "absolute", textAlign: "center", left: 0, width: "6.5vw", top: cardCount + 14 + "vw", height: "1.5vw" }}>
                {cardCount}/{coinTarget}
            </text>
        </div>
    );
}

export default BeanField;
