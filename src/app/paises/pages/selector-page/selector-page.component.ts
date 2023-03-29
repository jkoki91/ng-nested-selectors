import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { Pais, PaisSmall } from '../../interfaces/paises.interface';
import { PaisesServiceService } from '../../services/paises-service.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region  : ['', Validators.required ],
    pais    : ['', Validators.required ],
    frontera: ['', Validators.required ]
  })

  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: string[] = [];

  constructor( private fb: FormBuilder,
               private paisesService: PaisesServiceService ) {}

  guardar() {
    console.log( this.miFormulario.value );
  }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    //Cuando cambie la región
    // this.miFormulario.get('region')?.valueChanges //ESTO SE VE FEO LO PONEMOS CON EXPRESIONES DE RXJS
    //   .subscribe( region => {
    //     console.log(region);

    //     this.paisesService.getPaisesPorRegion( region )
    //       .subscribe( paises => {
    //         console.log(paises);
    //         this.paises = paises;
    //       })
    //   })

    this.miFormulario.get('region')?.valueChanges 
      .pipe(
        tap( (_) => {
          this.miFormulario.get('pais')?.reset('')
        }),
        switchMap( region => this.paisesService.getPaisesPorRegion(region) )
      )
      .subscribe( paises => {
        this.paises = paises;
      })
      
    this.miFormulario.get('pais')?.valueChanges 
      .pipe(
        tap( (_) => {
          this.miFormulario.get('frontera')?.reset('')
        }),
        switchMap( pais => this.paisesService.getPaisePorCode(pais) )
      )
      .subscribe( pais => {
        console.log('PAIS',pais);

        pais ? this.fronteras = pais[0].borders : [] ;
      })

  }


}
