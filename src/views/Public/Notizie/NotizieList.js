import React, { Component } from "react";
import { Link } from "react-router-dom";
import { serviceurl } from "../../../config/serviceurl.js";
import { connect } from "react-redux";
import { Container, Row, Col, CardImg } from "reactstrap";
import $ from "jquery";

class NotizieList extends Component {
  constructor(props) {
    super(props);
    this.state = { feed: undefined };
  }

  componentDidMount() {
    // ORIG URL  https://medium.com/feed/team-per-la-trasformazione-digitale
    // FINAL URL https://datipubblici.daf.teamdigitale.it/dati-gov/medium/medium.com/feed/team-per-la-trasformazione-digitale
    let url = serviceurl.apiMedium + this.props.properties.notizieURL;
    this.load(url);
  }

  getImg(input) {
    var image = undefined;

    var html = $.parseHTML(input);

    html.map((element, index) => {
      if (element.tagName == "FIGURE")
        if (element.getElementsByTagName("img").length > 0) {
          if (!image) image = element.getElementsByTagName("img")[0].src;
        }
    });

    return image;
  }
  load(url) {
    fetch(url)
      .then(response => response.text())
      .then(xmlText => {
        var extractedData = "";
        var parseString = require("xml2js").parseString;
        parseString(xmlText, function(err, result) {
          console.dir(result);
          extractedData = result["rss"]["channel"][0];
        });
        this.setFeedRss(extractedData);
      })
      .catch(error => {
        console.log("error: " + error);
      });
  }

  setFeedRss(xml) {
    this.setState({ feed: xml });
  }

  trunc(text, size) {
    if (text) {
      if (text.length > size) {
        text = text.substr(0, size);
        text += "...";
      }
    } else {
      text = "---";
    }

    return text;
  }

  render() {
    return (
      <Container className="py-4">
        <h1
          className="display-4"
          style={{
            font: "700 40px/48px Titillium Web",
            color: "rgb(21, 27, 30)"
          }}
        >
          Notizie
        </h1>
        {this.state.feed ? (
          <Row>
            {this.state.feed.item.map((newsFeed, index, newsFeeds) => (
              <Row key={index} >
                <Col sm={4}>
                  <CardImg
                    className="p-3"
                    width="90%"
                    src={this.getImg(newsFeed["content:encoded"][0])}
                  />
                </Col>
                <Col sm={8} className="py-3">
                  <Link to={"/notizie/" + index}>
                    <h2
                      className="font-weight-bold"
                      style={{
                        color: "rgb(21, 27, 30)"
                      }}
                    >
                      {
                        this.trunc(newsFeed.title[0], 80)}
                    </h2>
                  </Link>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: this.trunc(newsFeed["content:encoded"][0], 100)
                    }}
                  />
                  <hr />
                  <span>
                    <span className="font-weight-bold">
                      {new Date(
                        newsFeed["atom:updated"][0]
                      ).toLocaleDateString()}
                    </span>
                    <span className="px-2">-</span>
                    <span className="lead">{newsFeed["dc:creator"][0]}</span>
                  </span>
                  {/* {newsFeeds.length !== index + 1 ? <hr /> : null} */}
                </Col>
              </Row>
            ))}
          </Row>
        ) : (
          <h3>
            <i className="fa fa-spin fa-circle-notch mr-2" />Caricamento...
          </h3>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { properties } = state.propertiesReducer["prop"] || {};
  return { properties };
}

export default connect(mapStateToProps)(NotizieList);
