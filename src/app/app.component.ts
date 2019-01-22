import { Component, OnInit, Input, TemplateRef } from '@angular/core';

export class Sarasa {
  constructor( public codigo: string ,
               public nombre: string ,
               public volumen: string ,
               public variacionDia: string ,
               public variacionMes: string,
               public variacionAnio: string ) {

  }
  public pct: number;
  public width: number;
  public height: number | string;
  public bgColor: number | string;
  public pctForView: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rava';
  arr: Array<Sarasa> = new Array<Sarasa>();

  uno: Array<Sarasa> = new Array<Sarasa>();
  dos: Array<Sarasa> = new Array<Sarasa>();
  tres: Array<Sarasa> = new Array<Sarasa>();

  tot1 = 0;
  tot2 = 0;
  tot3 = 0;
  total = 0;
  w = 800;
  h = 400;
  aux = 0;
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
    this.arr.push( new Sarasa('FXE', 'Euro (ETF)', '108,580', '-1,2', '-0,8', '-0,8'));
    this.arr.push( new Sarasa('AAPL', 'Apple Computer Inc.', '156,820', '0,6', '-0,6', '-0,6'));
    this.arr.push( new Sarasa('BAC', 'Bank of America Corporation', '29,300', '1,1', '18,9', '18,9'));
    this.arr.push( new Sarasa('C', 'Citigroup Inc.', '63,120', '1,0', '21,2', '21,2'));
    this.arr.push( new Sarasa('DIS', 'Walt Disney Co.', '111,040', '0,0', '1,3', '1,3'));
    this.arr.push( new Sarasa('HD', 'Home Depot Inc.', '179,580', '2,7', '4,5', '4,5'));
    this.arr.push( new Sarasa('V', 'Visa Inc.', '138,500', '0,9', '5,0', '5,0'));
    this.arr.push( new Sarasa('PBR', 'Petroleo Brasileiro (Petrobras)', '15,400', '-0,1', '18,4', '18,4'));
    this.arr.push( new Sarasa('TS', 'ADR Tenaris', '24,300', '2,6', '14,0', '14,0'));
    this.arr.push( new Sarasa('YPF', 'ADR YPF', '15,400', '2,9', '15,0', '15,0'));
    // 21

    // Hacer magia
    this.arr.forEach( (item: Sarasa) => {
      item.volumen = item.volumen.replace(',', '.');
      item.variacionAnio = item.variacionAnio.replace(',', '.');
      item.variacionMes = item.variacionMes.replace(',', '.');
      item.variacionDia = item.variacionDia.replace(',', '.');
      this.total += Number(item.volumen);

      this.SetColor(item);
    } );
    this.arr.forEach( (item: Sarasa) => {
      item.pct = (Number(item.volumen) * 100) / this.total;
      item.width = (this.w / 100) * item.pct;
      item.height = (this.h / 100) * item.pct;

    });

    this.arr = this.arr.sort(( a , b ) =>  Number(b.volumen) - Number(a.volumen) );


    this.arr.forEach((item: Sarasa, i: number) => {
      const a = 33.3;

      this.aux += item.pct;
      if (this.aux <= 33.3) {

        this.uno.push(item);
        this.tot1 += item.pct;

      } else if (this.aux <= 66.6) {
        if (this.tot1 < a && (this.tot1 + item.pct) <= a) {

          this.uno.push(item);
          this.tot1 += item.pct;

        } else {
          this.dos.push(item);
          this.tot2 += item.pct;
        }
      } else if (this.aux <= 100.0) {

        if (this.tot1 < a && (this.tot1 + item.pct) <= a) {
          this.uno.push(item);
          this.tot1 += item.pct;
        } else if (this.tot2 < a && (this.tot2 + item.pct) <= a) {
          this.dos.push(item);
          this.tot2 += item.pct;
        } else {
          this.tres.push(item);
          this.tot3 += item.pct;
        }
      }
    });


    this.total = 0;
    this.uno.forEach((item: Sarasa) => {
      item.volumen = item.volumen.replace(',', '.');
      this.total += Number(item.volumen);
    });
    this.uno.forEach((item: Sarasa) => {
      item.pctForView = (Number(item.volumen) * 100) / this.total;
      item.width = (this.w / 100) * item.pctForView;
    });

    this.total = 0;
    this.dos.forEach((item: Sarasa) => {
      item.volumen = item.volumen.replace(',', '.');
      this.total += Number(item.volumen);
    });
    this.dos.forEach((item: Sarasa) => {
      item.pctForView = (Number(item.volumen) * 100) / this.total;
      item.width = (this.w / 100) * item.pctForView;
    });

    this.total = 0;
    this.tres.forEach((item: Sarasa) => {
      item.volumen = item.volumen.replace(',', '.');
      this.total += Number(item.volumen);
    });
    this.tres.forEach((item: Sarasa) => {
      item.pctForView = (Number(item.volumen) * 100) / this.total;
      item.width = (this.w / 100) * item.pctForView;
    });




  }
  ChangeColor() {

    this.uno.forEach((item: Sarasa) => {
      item.bgColor = '#' + (Math.floor(Math.random() * 16777215)).toString(16);
    });
    this.dos.forEach((item: Sarasa) => {
      item.bgColor = '#' + (Math.floor(Math.random() * 16777215)).toString(16);
    });
    this.tres.forEach((item: Sarasa) => {
      item.bgColor = '#' + (Math.floor(Math.random() * 16777215)).toString(16);
    });
  }
  SetColor(item: Sarasa) {
     if (Number(item.variacionDia) > 1.5) {
      item.bgColor =  this.rgbMaker('00', 255, '00');
    } else if (Number(item.variacionDia) > 0.4) {
      item.bgColor =  this.rgbMaker('00', 200, '00');
    } else if (Number(item.variacionDia) < (-0.9)) {
      item.bgColor = this.rgbMaker(255, '00', '00');
    } else if (Number(item.variacionDia) < (-0.4)) {
      item.bgColor = this.rgbMaker(200, '00', '00');
    } else {
      item.bgColor = this.rgbMaker(65, 69, 84);
    }
  }

  rgbMaker(r: number | string, g: number| string, b: number | string) {
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  }
}
