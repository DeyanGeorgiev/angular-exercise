import {
  Component,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  map,
  startWith
} from 'rxjs/operators';



export interface Countries {
  name: string;
  alpha3Code: string;
}

@Component({
  selector: 'app-m2b-rest-autocomplete',
  templateUrl: './m2b-rest-autocomplete.component.html',
  styleUrls: ['./m2b-rest-autocomplete.component.scss']
})
export class M2bRestAutocompleteComponent implements OnInit { 
  @Output() formUpdated = new EventEmitter();

  myForm: FormGroup;
  countriesArray: Countries[] = [];
 
  myControl = new FormControl();
  filteredOptions: Observable < string[] > ;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    
    this.getCountries();

    this.reactiveForm();

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.countriesArray.map(({
      name
    }) => name).filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  getCountries() {

    this.httpClient
      .get < Countries[] > ('https://restcountries.eu/rest/v2/all')
      .subscribe((data) => {
          data.forEach(e => {
            this.countriesArray.push({
              name: e.name,
              alpha3Code: e.alpha3Code
            });
          });
      })

  };

  reactiveForm() {
    this.myForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required,
        Validators.email
      ]],
      country: [''],

    })
  }

  get f() {
    return this.myForm.controls;
  }


  submitForm() {

    let hasCountry;

    if(this.myControl.value != null){
      hasCountry = this.countriesArray.find(val => val.name.toLowerCase() === this.myControl.value.toLowerCase());
    }
    
   
    this.myForm.value.country = hasCountry ? hasCountry.alpha3Code : 'undefined';


    if (this.myForm.invalid) {
      return;
    }

    this.formUpdated.emit(this.myForm.value);
    
  }




}
