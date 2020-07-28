import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'superbonus';
  jsonIn: any = [
    {
      importo: 50000 + 30000,
      percentuale: 110,
      anni: 5
    }, {
      importo: 65000,
      percentuale: 110,
      anni: 10
    }, {
      importo: 96000,
      percentuale: 50,
      anni: 10
    }
  ];

  newRow: {
    importo?: number,
    percentuale?: number,
    anni?: number,
  } = {

  };

  tassoInteresse = 5;

  montante;
  tasso;
  sommaAttualizzata;
  totaleDetrazioni;

  constructor() {
    this.calcola();
  }

  reset() {
    delete this.montante;
    delete this.sommaAttualizzata;
    delete this.totaleDetrazioni;
    delete this.tasso;
  }


  add() {
    this.reset();
    this.jsonIn.push(this.newRow);
    this.newRow = {};
  }

  remove(i) {
    this.reset();
    this.jsonIn.splice(i, 1);
  }

  calcola() {
    this.sommaAttualizzata = 0;
    this.totaleDetrazioni = 0;
    this.montante = 0;
    const r = this.tassoInteresse / 100;
    const q = 1 + r;

    this.jsonIn.forEach(riga => {

// ( riga.importo * q^riga.anni) / ( r * q^n)
      const importo = riga.importo / riga.anni * (riga.percentuale / 100);
      this.totaleDetrazioni += riga.importo * (riga.percentuale / 100) ;
      const parziale = (importo * (Math.pow(q, riga.anni) - 1)) / ( r * Math.pow(q, riga.anni)  );
      this.montante += parziale;
      console.log(this.totaleDetrazioni);
      riga.importoAttualizzato = parziale.toFixed(0);
      this.sommaAttualizzata += riga.importo;
    });
    this.montante = Math.ceil(this.montante);
    this.tasso = 1 - this.totaleDetrazioni / this.sommaAttualizzata;
    this.tasso = (this.tasso * 100).toFixed(0);

  }
}
