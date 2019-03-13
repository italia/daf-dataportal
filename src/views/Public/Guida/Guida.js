import React, { Component } from 'react';

import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';
import Steps, { Step } from 'rc-steps';
import { messages } from '../../../i18n-ita';

const container = document.getElementById('__react-content');
// const description = 'Prova';


class Guida extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.state = {
      currentStep: 0,
      stepTitolo: messages.lineeGuida[0].titolo,
      stepDescrizione: messages.lineeGuida[0].descrizione

    }
  }

  nextStep(event) {
    // console.log('event.target', event.target)

    this.setState({
      currentStep: event,
      stepDescrizione: messages.lineeGuida[event].descrizione

    });
  }

  render() {
    const cs = this.state.currentStep;

    return (


      <div className="container p-4 mt-2">
        <div className="row mt-4">
        <div className="paragrafo col-12 mx-0"><h1 className="ml-0">{messages.label.gettingStarted}</h1></div>
          <div className="col-ms-3 mx-auto p-0">

            <Steps direction="vertical" current={cs}>

              {
                messages.lineeGuida.map((e, i) => {
                  return (<Step key={i} title={messages.lineeGuida[i].titolo} onClick={() => this.nextStep(i)} />)
                })

              }

            </Steps>

          </div>
          <div className="paragrafo col-7 mx-0" dangerouslySetInnerHTML={{ __html: this.state.stepDescrizione }} >
          </div>
        </div>
      </div>   

    )

  }
}


export default Guida