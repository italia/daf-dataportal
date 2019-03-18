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
      stepTitolo: messages.lineeGuida[0].titolo,
      stepDescrizione: messages.lineeGuida[0].descrizione,
      step: 0
    }
  }

  nextStep(index) {
    console.log('event.target', index)
    if (index >= 0 && index <= messages.lineeGuida.length - 1) {

      this.setState({
        currentStep: index,
        stepDescrizione: messages.lineeGuida[index].descrizione

      });
    }
  }

  render() {

    const cs = this.state.currentStep;

    return (


      <div className="container p-4 mt-2">
        <div className="row mt-4">
          <div className="col-12 mx-0"><h1 className="ml-0">{messages.label.gettingStarted}</h1></div>
          <div className="col-ms-3 mx-auto p-0">

            <Steps direction="vertical" current={this.state.currentStep}>

              {
                messages.lineeGuida.map((e, i) => {
                  return (<Step key={i} title={messages.lineeGuida[i].titolo} onClick={() => this.nextStep(i)} />)
                })

              }

            </Steps>

          </div>
          <div dangerouslySetInnerHTML={{ __html: this.state.stepDescrizione }} className="col-7 mx-0 paragrafoG" >
          </div>

        </div>
        <div>

          {this.state.currentStep < messages.lineeGuida.length - 1 && <button className="btn btn-primary float-right col-md-1" onClick={() => this.nextStep(this.state.currentStep + 1)}>Avanti</button>}

        </div>
        <div>

          {this.state.currentStep > 0 && <button className="btn btn-primary float-left offset-md-6 col-md-1" onClick={() => this.nextStep(this.state.currentStep - 1)}>Indietro</button>}
        </div>
      </div>

    )

  }
}


export default Guida