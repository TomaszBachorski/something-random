import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationPanelComponent } from './translation-panel.component';

describe('TranslationPanelComponent', () => {
  let component: TranslationPanelComponent;
  let fixture: ComponentFixture<TranslationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslationPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
