import React, { Component } from "react";
import "./App.css";
import * as d3 from "d3"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {wordFrequency:[]};
  }
  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  getWordFrequency = (text) => {
    const stopWords = new Set(["the", "and", "a", "an", "in", "on", "at", "for", "with", "about", "as", "by", "to", "of", "from", "that", "which", "who", "whom", "this", "these", "those", "it", "its", "they", "their", "them", "we", "our", "ours", "you", "your", "yours", "he", "him", "his", "she", "her", "hers", "it", "its", "we", "us", "our", "ours", "they", "them", "theirs", "I", "me", "my", "myself", "you", "your", "yourself", "yourselves", "was", "were", "is", "am", "are", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "as", "if", "each", "how", "which", "who", "whom", "what", "this", "these", "those", "that", "with", "without", "through", "over", "under", "above", "below", "between", "among", "during", "before", "after", "until", "while", "of", "for", "on", "off", "out", "in", "into", "by", "about", "against", "with", "amongst", "throughout", "despite", "towards", "upon", "isn't", "aren't", "wasn't", "weren't", "haven't", "hasn't", "hadn't", "doesn't", "didn't", "don't", "doesn't", "didn't", "won't", "wouldn't", "can't", "couldn't", "shouldn't", "mustn't", "needn't", "daren't", "hasn't", "haven't", "hadn't"]);
    const words = text.toLowerCase().replace(/[.,/#!$%^&*;:{}=_`~()]/g, "").replace(/\s{2,}/g, " ").split(" ");
    const filteredWords = words.filter(word => !stopWords.has(word));
    return Object.entries(filteredWords.reduce((freq, word) => {
      freq[word] = (freq[word] || 0) + 1;
      return freq;
    }, {}));
  }


  renderChart() {
    const data = this.state.wordFrequency.sort((a,b)=>b[1]-a[1]).slice(0,5)
    console.log("renderChart called with data:", data)
    
    // svg w and h
    const width = 800;
    const height = 400;
    const svg = d3.select(".svg_parent").attr("width", width).attr("height", height);
    
    if (data.length === 0) {
      // if no data
      svg.selectAll(".word").remove();
      return;
    }
    
    // scaling
    const maxFreq = d3.max(data, d => d[1]);
    const minFreq = d3.min(data, d => d[1]);
    
    const fontSizeScale = d3.scaleLinear().domain([minFreq, maxFreq]).range([20, 60]);
    
    // word positions
    const positions = this.calculateWordPositions(data, width, height);
    
    // binding
    const words = svg.selectAll(".word").data(data, d => d[0]);
    
    // fade out
    words.exit().transition().duration(1000).style("opacity", 0).style("font-size", "0px").remove();
    
    // fade in
    const wordsEnter = words.enter().append("text").attr("class", "word").attr("x", width / 2)
      .attr("y", height / 2).style("opacity", 0).style("font-size", "0px")
      .style("text-anchor", "middle").style("dominant-baseline", "middle")
      .style("fill", "#333").style("font-family", "Arial, sans-serif")
      .style("font-weight", "bold").text(d => d[0]);
    
    // merge
    const wordsUpdate = wordsEnter.merge(words);
    
    // update words
    wordsUpdate
      .transition().duration(1000).delay((d, i) => i * 100).attr("x", (d, i) => positions[i].x)
      .attr("y", (d, i) => positions[i].y).style("font-size", d => fontSizeScale(d[1]) + "px")
      .style("opacity", 1);
  }
  
  calculateWordPositions(data, width, height) {
    const positions = [];
    const centerY = height / 2;
    const startX = 100; // left side
    const spacing = 150; // spacing
    
    // horizontal arrangement
    data.forEach((word, index) => {
      const x = startX + (index * spacing);
      const y = centerY;
      
      positions.push({
        x: x,
        y: y
      });
    });
    
    return positions;
  }

  render() {
    return (
      <div className="parent">
        <div className="child1" style={{width: 1000 }}>
        <textarea type="text" id="input_field" style={{ height: 150, width: 1000 }}/>
          <button type="submit" value="Generate Matrix" style={{ marginTop: 10, height: 40, width: 1000 }} onClick={() => {
                var input_data = document.getElementById("input_field").value
                console.log("Input text:", input_data)
                const wordFreq = this.getWordFrequency(input_data)
                console.log("Word frequency:", wordFreq)
                this.setState({wordFrequency: wordFreq})
              }}
            > Generate WordCloud</button>
        </div>
        <div className="child2"><svg className="svg_parent"></svg></div>
      </div>
    );
  }
}

export default App;
