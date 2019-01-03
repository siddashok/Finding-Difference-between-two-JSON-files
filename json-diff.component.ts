import { FindJsonDiff } from './json-diff.service';
@Component({
  selector: 'json-diff',
  templateUrl: './json-diff.component.html',
  styleUrls: ['./json-diff.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JsonDiffComponent {
  @Input() object1:any;
  @Input() object2:any;
  object1html:string;
  object2html:string;
  ngOnChanges(){
    if(!this.object1||!this.object2) return 
    var jsondiff:FindJsonDiff = new FindJsonDiff();
    const [object1html,object2html]=jsondiff.findiff(this.object1,this.object2)
    this.object1html=object1html
    this.object2html=object2html
  }
}
