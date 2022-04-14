import { Component } from "@angular/core"
import { FormBuilder, FormGroup } from "@angular/forms"
import { map, Observable, of } from "rxjs"
import { HttpService } from "src/app/core/services/http.service"

@Component({
  selector: 'app-dynamic-filtering',
  templateUrl: './dynamic-filtering.component.html',
  styleUrls: ['./dynamic-filtering.component.scss'],
})
export class DynamicFilteringComponent {
  public data: Array<any>;
  public reactiveForm: FormGroup;
  public filteredData: Array<any>;

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder
  ) {
    this.data = [];
    this.filteredData = [];
    this.reactiveForm = this.formBuilder.group({
      location: [''],
    });
  }

  ngOnInit() {
    this.httpService.getData1().pipe(map(x => {
      // console.log(x);
      return x + 1;
    })).subscribe(response => {
      console.log(response);
    });


    this.httpService.getData().subscribe((response: any) => {
      this.data = response;
      // console.log(this.data.map(x => x+ 1))
      this.filteredData = this.data;
      // console.log(this.data);
    });
    this.reactiveForm.get('location')?.valueChanges.subscribe((value) => {
      // console.log(value);
      this.filteredData = this.data.filter(eachData => {
        // console.log(eachData[0])
        return eachData.startsWith(value.toUpperCase());
      })
    }); 
  }
  handleSubmit(){
    console.log(this.reactiveForm.get('location')?.value);
  }
}