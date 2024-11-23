import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import styled from 'styled-components'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      yourChoice: null,
      opponentChoice: null,
      result: null,
      showResults: false,
    }
  }

  componentDidMount() {
    // Initialization if needed
  }

  handleChoiceClick = yourChoice => {
    const {score} = this.state
    const opponentChoice =
      choicesList[Math.floor(Math.random() * choicesList.length)]

    const result = this.getResult(yourChoice.id, opponentChoice.id)

    let newScore = score

    if (result === 'YOU WON') {
      newScore += 1
    } else if (result === 'YOU LOSE') {
      newScore -= 1
    }

    this.setState({
      yourChoice,
      opponentChoice,
      result,
      score: newScore,
      showResults: true,
    })
  }

  getResult = (yourChoice, opponentChoice) => {
    if (yourChoice === opponentChoice) return 'IT IS DRAW'

    const winningConditions = {
      ROCK: 'SCISSORS',
      PAPER: 'ROCK',
      SCISSORS: 'PAPER',
    }

    return winningConditions[yourChoice] === opponentChoice
      ? 'YOU WON'
      : 'YOU LOSE'
  }

  handlePlayAgain = () => {
    this.setState({
      yourChoice: null,
      opponentChoice: null,
      result: null,
      showResults: false,
    })
  }

  render() {
    const {score, yourChoice, opponentChoice, result, showResults} = this.state
    const Score = styled.p`
  margin-top: 0px;
  font-family: 'Roboto';
  font-size: 30px;
  color: #223a5f;
  text-align: center;
  font-weight: bolder;
  `
    return (
      <div className="App">
        <header className="App-header">
          <h1>ROCK PAPER SCISSORS</h1>
          <div>
            <p>Score</p>
            <Score>{score}</Score>
          </div>
        </header>
        <main>
          {!showResults ? (
            <div className="choices-container">
              {choicesList.map(choice => (
                <button
                  data-testid={`${choice.id.toLowerCase()}Button`}
                  key={choice.id}
                  onClick={() => this.handleChoiceClick(choice)}
                >
                  <img src={choice.imageUrl} alt={choice.id} />
                </button>
              ))}
            </div>
          ) : (
            <div className="results-container">
              <div className="results">
                <div>
                  <h2>You</h2>
                  <img src={yourChoice.imageUrl} alt="your choice" />
                </div>
                <div>
                  <h2>Opponent</h2>
                  <img src={opponentChoice.imageUrl} alt="opponent choice" />
                </div>
              </div>
              <p>{result}</p>
              <button onClick={this.handlePlayAgain}>PLAY AGAIN</button>
            </div>
          )}

          <div className="popup-container">
            <Popup
              modal
              trigger={<button className="rules-button">RULES</button>}
            >
              {close => (
                <>
                  <div className="rules-popup">
                    <button onClick={() => close()}>
                      <RiCloseLine className="close-icon" />
                    </button>
                    <div className="rules-content">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                        alt="rules"
                      />
                    </div>
                  </div>
                </>
              )}
            </Popup>
          </div>
        </main>
      </div>
    )
  }
}

export default App
