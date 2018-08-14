class ProgressBar extends React.Component {
  
  componentDidMount() {
    this.progess.width = 200;
    this.progess.height = 135;
    this.drawCircles();
  }

  componentDidUpdate() {
    this.drawCircles();
  }
  
  drawCircles() {
    const width = this.progess.width;
    const height = this.progess.height;
    const x = width / 2;
    const y = height / 2;
    const percent = 360 / 100;
    const readed = 100 * this.props.completed / this.props.total;
    const result = percent * readed;
    const ctx = this.progess.getContext('2d');
    for (let degree = 0; degree <= result; degree++) {
      ctx.clearRect(0,0,width,height);

      ctx.beginPath();
      ctx.arc(x,y,45,(Math.PI/180) * 270,(Math.PI/180) * (270 + degree) );
      ctx.strokeStyle = '#96d6f4';
      ctx.lineWidth = '7';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x,y,52,(Math.PI/180) * 270,(Math.PI/180) * (270 + 360) );
      ctx.strokeStyle = '#4ca89a';
      ctx.lineWidth = '7';
      ctx.stroke();

      ctx.fillStyle = 'black';
      ctx.font = '35px Helvetica';
      ctx.textAlign = "center";
      ctx.fillText(`${readed.toFixed()}%`, x + 5, y + 10)
    }
  }

  render () {
    return <canvas id="progressCanvas" className="progress" ref={canvas => this.progess = canvas} />
  }
}
