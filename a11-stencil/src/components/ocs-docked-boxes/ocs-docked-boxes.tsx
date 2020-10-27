import { Element, Component, Host, Prop, h, Method } from '@stencil/core';
import { select } from 'd3-selection';

@Component({
  tag: 'ocs-docked-boxes',
  styleUrl: 'ocs-docked-boxes.css',
  shadow: true,
})
export class DockedBoxesComponent {
  @Element() element: HTMLElement;
  // @Prop() windowSize: string;
  @Prop() data: string = JSON.stringify([
    { x: 0, y: 0, height: 40 , color:'red'},
    { x: 0, y: 0, height: 120 , color:'green'},
    { x: 0, y: 0, height: 70 , color:'rgb(26, 199, 194)'},
    { x: 0, y: 0, height: 50 , color:'navy'},
  ]);
  private width: number = 400;
  private height: number = 400;
  private chartData: Array<Item>;
  public canvasDiv: HTMLDivElement;
  private svg: any;

  constructor() {
    this.chartData = JSON.parse(this.data);
    let previous: number = 0;
    this.chartData.forEach((item: Item)=>{
      item.y = previous;
      previous += item.height;
    })
  }

  componentDidLoad() {
    this.svg = select(this.element.shadowRoot.querySelectorAll('.chart')[0])
    this.drawChart();
  }

  // @Watch('windowSize')
  // watchHandler(newValue: string, oldValue: string) {
  //   if(newValue && newValue !== oldValue) {
  //     console.log(newValue);
  //     this.drawChart();
  //   }
  // }

  @Method()
  async drawChart(){
    this.getCanvasSize()
    this.drawBars();
  }

  drawBars() {
    this.svg.selectAll("*").remove();
    this.svg.attr('width', this.width).attr('height', this.height);
    this.svg.selectAll('rect')
      .data(this.chartData)
      .enter()
      .append('rect')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('width', this.width/5)
      .attr('height', d => d.height)
      .attr('fill', d => d.color)
      .attr('stroke-width', 1)
      .attr('stroke', 'white');
      // .on('mouseenter', function () {
      //   select(this).attr('class', select(this).classed('selected') ? null : 'selected');
      // })
      // .on('mouseleave', function () {
      //   select(this).attr('class', select(this).classed('selected') ? null : 'selected');
      // });

    // svg
    //   .append('g')
    //   .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)
    //   .attr('font-family', 'sans-serif')
    //   .attr('font-size', 14)
    //   .attr('font-weight', 800)
    //   .attr('text-anchor', 'middle')
    //   .selectAll('text')
    //   .data(this.chartData)
    //   .join('text')
    //   .attr('transform', d => `translate(${arcShapeLabels.centroid(d)[0] * 0.8},${arcShapeLabels.centroid(d)[1] * 0.8})`)
    //   .call(text => text.append('tspan').text(d => d.data.tag));
  }

  getCanvasSize() {
    this.width = this.canvasDiv.offsetWidth;
  }

  render() {
    console.log('width', this.width);
    return (
      <Host>
        <div ref={(el) => this.canvasDiv = el as HTMLDivElement}>
          <svg class="chart" />
        </div>
      </Host>
    );
  }
}


type Item ={x: number, y: number, height: number , color: string}