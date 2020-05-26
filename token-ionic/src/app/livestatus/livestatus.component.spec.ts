import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LivestatusComponent } from './livestatus.component';

describe('LivestatusComponent', () => {
  let component: LivestatusComponent;
  let fixture: ComponentFixture<LivestatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivestatusComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LivestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
