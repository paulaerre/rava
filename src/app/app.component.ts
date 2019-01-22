import { Component, OnInit, Input, TemplateRef } from '@angular/core';

export class Sarasa {
  constructor( public codigo: string ,
               public nombre: string ,
               public volumen: string ,
               public porcientoDia: string ,
               public porcientoMes: string,
               public porcientoAnio: string ) {

  }
  public pct: number;
  public width: number;
  public height: number | string;
  public bgColor: number | string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rava';
  arr: Array<Sarasa> = new Array<Sarasa>();
  total = 0;
  w = 400;
  h = 200;
  // tslint:disable-next-line:no-input-rename
  @Input('box') box: TemplateRef<any>;
  ngOnInit() {
    this.arr.push( new Sarasa('DIA', 'Dow Jones (ETF)', '247,050', '1,4', '5,9', '5,9'));
    this.arr.push( new Sarasa('QQQ', 'Nasdaq 100 (ETF)', '165,250', '1,0', '7,1', '7,1'));
    this.arr.push( new Sarasa('SPY', 'S&P 500 (ETF)', '266,460', '1,3', '6,6', '6,6'));
    this.arr.push( new Sarasa('EEM', 'Mercados Emergentes (ETF)', '41,550', '0,5', '6,4', '6,4'));
    this.arr.push( new Sarasa('EWZ', 'Brasil (ETF)', '43,200', '0,4', '13,1', '13,1'));
    this.arr.push( new Sarasa('FXI', 'China (ETF)', '41,370', '1,0', '5,9', '5,9'));
    this.arr.push( new Sarasa('IBB', 'Biotecnológicas (ETF)', '110,470', '0,6', '14,6', '14,6'));
    this.arr.push( new Sarasa('XLF', 'Servicios Financieros (ETF)', '26,000', '1,7', '9,2', '9,2'));
    this.arr.push( new Sarasa('XLV', 'Salud (ETF)', '90,080', '1,2', '4,1', '4,1'));
    this.arr.push( new Sarasa('GLD', 'Oro (ETF)', '121,020', '-0,9', '-0,2', '-0,2'));
    this.arr.push( new Sarasa('USO', 'Petróleo (ETF)', '11,310', '2,5', '17,1', '17,1'));
    this.arr.push( new Sarasa('FXE', 'Euro (ETF)', '108,580', '-0,2', '-0,8', '-0,8'));
    this.arr.push( new Sarasa('AAPL', 'Apple Computer Inc.', '156,820', '0,6', '-0,6', '-0,6'));
    this.arr.push( new Sarasa('BAC', 'Bank of America Corporation', '29,300', '1,1', '18,9', '18,9'));
    this.arr.push( new Sarasa('C', 'Citigroup Inc.', '63,120', '1,0', '21,2', '21,2'));
    this.arr.push( new Sarasa('DIS', 'Walt Disney Co.', '111,040', '0,0', '1,3', '1,3'));
    this.arr.push( new Sarasa('HD', 'Home Depot Inc.', '179,580', '2,7', '4,5', '4,5'));
    this.arr.push( new Sarasa('V', 'Visa Inc.', '138,500', '0,9', '5,0', '5,0'));
    this.arr.push( new Sarasa('PBR', 'Petroleo Brasileiro (Petrobras)', '15,400', '-0,1', '18,4', '18,4'));
    this.arr.push( new Sarasa('TS', 'ADR Tenaris', '24,300', '2,6', '14,0', '14,0'));
    this.arr.push( new Sarasa('YPF', 'ADR YPF', '15,400', '2,9', '15,0', '15,0'));

    // Hacer magia
    this.arr.forEach( (item: Sarasa) => {
      item.volumen = item.volumen.replace(',', '.');
      this.total += Number(item.volumen);
    } );
    this.arr.forEach( (item: Sarasa) => {
      item.pct = (Number(item.volumen) * 100) / this.total;
      item.width = (Number(item.volumen) * 100) / 400;
      item.height = (Number(item.volumen) * 100) / 200;
    });

    this.arr = this.arr.sort(( a , b ) =>  Number(b.volumen) - Number(a.volumen) );
    // this.arr = this.arr.slice(0, 4);

    // this.total = 0 ;
    // this.arr.map(i => this.total += Number(i.volumen));
    const st = this.w * this.h;
    let wi = 0 , he = 0;
    this.arr.forEach((item: Sarasa) => {
      item.pct = (Number(item.volumen) * 100) / this.total;
      // item.height = (((item.pct * st ) / this.total ) * this.h) / st;
      // item.height = (((item.pct * 100 ) / st) * 100 ) / this.h;
      // he += item.height;
      item.height = '100';
      // item.width = (((item.pct * st ) / this.total ) * this.w) / st;
      item.width =  (( item.pct ) * this.w ) / 100 ; // (( (item.pct * 100 ) / st) * 100 ) / this.w;
      wi += item.width;
      item.bgColor = '#' + (Math.floor( Math.random () * 16777215 )).toString(16);
    });

    console.log(wi , he);
// console.log(this.box.elementRef.nativeElement.width);

  }



}


/**
 * de los 80k , tengo
 * 10% -> 8k
 * 200 * 40
 * 80
 * 40% , 20%
 *
 */
