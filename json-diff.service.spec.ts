import { TestBed, async } from '@angular/core/testing';
import { FindJsonDiff } from './json-diff.service';
describe('JsonDiffService', () => {
 
  it('should detect difference in values', async(() => {
    var secondobject = JSON.parse(JSON.stringify(firstobject))
    secondobject.name="foxnews"
    secondobject.address.city="houston"
    firstobject["father"]={firstname:"me",lastname:"uou"}
    var finddiff=new FindJsonDiff();
    console.log(finddiff.findiff(firstobject,secondobject))
  }));
});



var firstobject = { 
  first:"hello",
  name:"cnn",
  address:{
    address:"1609 Concord St",
    city:"",
    state:"texas",
    phone:{
      number:"123-455-6666",
      name:"home"
    }
  },
  occupation:{
    job:"Software Engineer"
  }
}