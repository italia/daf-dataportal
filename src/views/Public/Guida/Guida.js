import React, { Component } from 'react';

import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';
import Steps, { Step } from 'rc-steps';
import { messages } from '../../../i18n-ita';

const container = document.getElementById('__react-content');


class Guida extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.state = {
      currentStep: 0,
      stepTitolo: messages.gettingStarted[0].titolo,
      stepDescrizione: messages.gettingStarted[0].descrizione,
      step: 0
    }
  }

  nextStep(index) {
    console.log('event.target', index)
    if (index >= 0 && index <= messages.gettingStarted.length - 1) {

      this.setState({
        currentStep: index,
        stepDescrizione: messages.gettingStarted[index].descrizione

      });
    }
  }

  render() {

    const cs = this.state.currentStep;

    return (


      <div className="container p-4 mt-2">
        <div className="row mt-4">
          <div className="col-12 mx-0"><h1 className="ml-0">{messages.label.gettingStarted}</h1></div>
          <div className="col-3 mx-0">

            <Steps direction="vertical" current={this.state.currentStep} className="pointer">

              {
                messages.gettingStarted.map((e, i) => {
                  return (<Step key={i} title={messages.gettingStarted[i].titolo} onClick={() => this.nextStep(i)} />)
                })

              }

            </Steps>

          </div>
          <div dangerouslySetInnerHTML={{ __html: this.state.stepDescrizione }} className="col-8 mx-0 paragrafoG" >
          </div>

        </div>
        <div className="row mt-4">
          <div className="col-3 mx-0">

          </div>
          <div className="col-8 mx-0" >


            {this.state.currentStep < messages.gettingStarted.length - 1 && <button className="btn btn-primary float-right" onClick={() => this.nextStep(this.state.currentStep + 1)}>Avanti</button>}

            {this.state.currentStep > 0 && <button className="btn btn-primary float-left" onClick={() => this.nextStep(this.state.currentStep - 1)}>Indietro</button>}

          </div>
        </div>
      </div>

    )

  }
}


export default Guida