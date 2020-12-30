import { Component } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public options: IAngularMyDpOptions = {
		dateFormat : 'mm/dd/yyyy',
		disableUntil : this.getYesterdayDate()
	};

	demoForm : FormGroup;

	constructor(formBuilder: FormBuilder){
		this.demoForm = formBuilder.group({
			date: [null]
		});
		this.setPastDate();
	}

	getYesterdayDate(){
		let currentdate = new Date();
		currentdate.setDate(currentdate.getDate() - 1);
		let Month = (currentdate.getMonth() + 1);
		let Day = currentdate.getDate();
		let Year = currentdate.getFullYear();
		let date = {year: Year, month: Month, day: Day};
		return date;
	}

	setPastDate(){
		let currentDate = new Date();
		currentDate.setDate(currentDate.getDate() - 2);
		let Month = (currentDate.getMonth() + 1) < 10 ? '0'+(currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
		let Day = currentDate.getDate() < 10 ? '0'+currentDate.getDate() : currentDate.getDate();
		let Year= currentDate.getFullYear();
		let date = Month+'/'+Day+'/'+Year;
		let todayTimestamp = Date.parse(date)/1000;
		let model: IMyDateModel = {isRange: false, singleDate: {jsDate: new Date(todayTimestamp * 1000)}, dateRange: null};
		this.demoForm.controls['date'].setValue(model);
	}

	submitDemoForm(){
		if(this.demoForm.valid){
			alert('Form submit successfully!');
		}else{
			alert('Validation error');
		}
	}
}
