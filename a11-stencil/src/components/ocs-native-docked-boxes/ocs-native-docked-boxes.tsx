import { Element, Component, Host, Prop, h, Method, State } from '@stencil/core';

const GAP = 160;
const MIN_WITH = 25;
const GRID_COLOR = '#808ca4';


@Component({
  tag: 'ocs-native-docked-boxes',
  styleUrl: 'ocs-native-docked-boxes.css',
  shadow: true,
})
export class DockedBoxesComponent {
  @Element() element: HTMLElement;
  // @Prop() windowSize: string;
  @Prop() data: string = JSON.stringify([
    {
      date:new Date('2020-03-01T00:00:00'),
      values:[
        { x: 0, y: 0, height: 40, color: '#c83964', name:'A3 tv' },
        { x: 0, y: 0, height: 120, color: '#ff9a4c', name:'Telecinco' },
        { x: 0, y: 0, height: 70, color: '#0987db', name:'Cuatro' },
        { x: 0, y: 0, height: 50, color: '#9cc101', name:'La sexta' },
      ]
    },
    {
      date:new Date('2020-04-01T00:00:00'),
      values:[
        { x: 0, y: 0, height: 20, color: '#c83964', name:'A3 tv' },
        { x: 0, y: 0, height: 100, color: '#ff9a4c', name:'Telecinco' },
        { x: 0, y: 0, height: 90, color: '#0987db', name:'Cuatro' },
        { x: 0, y: 0, height: 60, color: '#9cc101', name:'La sexta' },
      ]
    },
    {
      date:new Date('2020-05-01T00:00:00'),
      values:[
        { x: 0, y: 0, height: 10, color: '#c83964', name:'A3 tv' },
        { x: 0, y: 0, height: 20, color: '#ff9a4c', name:'Telecinco' },
        { x: 0, y: 0, height: 170, color: '#0987db', name:'Cuatro' },
        { x: 0, y: 0, height: 40, color: '#9cc101', name:'La sexta' },
      ]
    },
  ]);

  @State()
  private width: number = 400;
  private height: number = 400;
  private chartData: Bar[];
  public canvasDiv: HTMLDivElement;

  constructor() {
    this.chartData = JSON.parse(this.data);
  }

  componentDidLoad() {
    this.getCanvasSize();
  }

  @Method()
  async getCanvasSize() {
    this.width = this.canvasDiv.offsetWidth;
  }

  

  calculateBarsPosition(){
    let previousX: number = 0.75 * GAP;
    const barsCount = this.chartData.length;
    this.chartData.forEach((bar:Bar) => {
      let previousY: number = 0;
      bar.values.forEach((item: Item) => {
        item.x = previousX;
        item.y = previousY;
        previousY += item.height;
      });
      previousX += this.width/barsCount
    })
  }

  renderGrid(bars:Bar[]) {
    const maxValue = this.getMaxHeight(bars);
    const inc = maxValue / 5;
    const lineHeigths: number[] = [];
    let n = 0;
    while(n <= maxValue){
      lineHeigths.push(n);
      n += inc;
    }
    return lineHeigths.map((d: number) => (<line x1={GAP/2} y1={d} x2={this.width} y2={d}
      stroke-width="1" stroke={GRID_COLOR} />));
  }

  getMaxHeight(bars:Bar[]) {
    return bars.map((bar:Bar) => {
      const n = bar.values.length - 1;
      return bar.values[n].y + bar.values[n].height;
    }).reduce((max:number, current:number) => (Math.max(max,current)), 0);
  }

  renderBars(bars:Bar[]): any[]{
    const barsCount = this.chartData.length;
    const result = [];
    bars.forEach((bar:Bar) => {
      result.push(...this.renderBar(bar.values, barsCount))
    });
    return result;
  }

  renderBar(items: Item[], barsCount: number): any[] {
    return items.map((d: Item) => (<rect x={d.x} y={d.y} 
                    width={Math.max((this.width / barsCount) - GAP, MIN_WITH)} height={d.height} 
                    fill={d.color} stroke-width="0" stroke="white" />));
  }
  
  render() {
    this.calculateBarsPosition();
    console.log('width', this.width);
    return (
      <Host>
        <div ref={el => (this.canvasDiv = el as HTMLDivElement)}>
          <svg class="chart" width={this.width} height={this.height}>
            <g transform={`translate(0,${this.height}) scale(1,-1)`}>
              {this.renderGrid(this.chartData)}
            </g>
            <g transform={`translate(0,${this.height}) scale(1,-1)`}>
              {this.renderBars(this.chartData)}
            </g>
          </svg>
        </div>
      </Host>
    );
  }
}

type Item = { x: number; y: number; height: number; color: string };
type Bar = { date: Date; values:Item[] };
