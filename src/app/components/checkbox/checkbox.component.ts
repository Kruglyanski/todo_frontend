import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  checkboxForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.checkboxForm = this.formBuilder.group({
      isChecked: [false],
    });

    this.checkboxForm
      .get('isChecked')
      ?.valueChanges.subscribe((value: boolean) => {
        console.log('Checkbox value:', value);
        // Дополнительные действия при изменении состояния чекбокса
      });
  }
}
