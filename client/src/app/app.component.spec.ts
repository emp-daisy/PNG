import {
  TestBed,
  async,
  ComponentFixture,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AppComponent } from './app.component';
import { PhonenumberService } from './../services/phonenumber.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let debugElement: DebugElement;
  let phonenumberService: PhonenumberService;
  const dummyNumbersResponse = {
    min: '0133629454',
    max: '0911745894',
    size: 10,
    phonenumbers: [
      '0911745894',
      '0575521077',
      '0422192687',
      '0505714277',
      '0133629454',
      '0269499339',
      '0163517707',
      '0261687023',
      '0343196326',
      '0360845711'
    ],
    message: 'Success'
  };
  const dummyNumbersService = {
    generateNumber: () => of(dummyNumbersResponse),
    getAllNumbers: () => of(dummyNumbersResponse)
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: PhonenumberService, useValue: dummyNumbersService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    phonenumberService = debugElement.injector.get(PhonenumberService);
  }));

  it('should create the app', () => {
    const app = debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title class content', () => {
    fixture.detectChanges();
    const compiled = debugElement.query(By.css('.title')).nativeElement;
    expect(compiled.textContent).toContain('Phone Number Generator 1.0');
  });

  it('should update limit on change', async () => {
    spyOn(component, 'setLimit').and.callThrough();
    fixture.detectChanges();
    const limitElement = fixture.debugElement.query(By.css('#limit'))
      .nativeElement;
    limitElement.value = 10;
    limitElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.setLimit).toHaveBeenCalled();
    expect(component.limit).toBe(10);
    expect(component.invalidLimit).toBe(false);
  });

  it('should show error if invalid on change', async () => {
    spyOn(component, 'setLimit').and.callThrough();
    fixture.detectChanges();
    const limitElement = debugElement.query(By.css('#limit'));
    limitElement.nativeElement.value = 'invalid';
    limitElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.setLimit).toHaveBeenCalled();
      expect(component.invalidLimit).toBe(true);
    });
  });

  it('should show error if less than 1 on change', async () => {
    spyOn(component, 'setLimit').and.callThrough();
    fixture.detectChanges();
    const limitElement = debugElement.query(By.css('#limit'));
    limitElement.nativeElement.value = -10;
    limitElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.setLimit).toHaveBeenCalled();
      expect(component.invalidLimit).toBe(true);
    });
  });

  it('should show error if more than 100 on change', async () => {
    spyOn(component, 'setLimit').and.callThrough();
    fixture.detectChanges();
    const limitElement = debugElement.query(By.css('#limit'));
    limitElement.nativeElement.value = 100;
    limitElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.setLimit).toHaveBeenCalled();
      expect(component.invalidLimit).toBe(true);
    });
  });

  it('should emit sort function on change event', () => {
    spyOn(component, 'setSort').and.callThrough();
    fixture.detectChanges();
    const select = debugElement.query(By.css('#sortDropDown'))
      .nativeElement as HTMLSelectElement;

    select.selectedIndex = 1;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.setSort).toHaveBeenCalled();
    expect(component.sort).toEqual('desc');
  });

  it('should trigger onResize method when window is resized', () => {
    spyOn(component, 'onResize').and.callThrough();
    // window.innerWidth = 1026;
    (window as any).resizeTo(500, window.screen.availHeight);
    fixture.detectChanges();
    (window as any).screen = { innerWidth: 400, width: 400 };
    // window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(component.onResize).toHaveBeenCalled();
  });

  it('should call retrieve method', async(() => {
    spyOn(component, 'retrieve').and.callThrough();
    const btnRetrieveElement = debugElement.query(By.css('.retrieve'))
      .nativeElement;
    btnRetrieveElement.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.retrieve).toHaveBeenCalled();
      expect(component.max).toEqual('0911745894');
      expect(component.min).toEqual('0133629454');
      expect(component.size).toEqual(10);
      expect(component.phonenumbers.length).toEqual(10);
    });
  }));

  it('should call generate method', fakeAsync(() => {
    spyOn(component, 'generate').and.callThrough();
    const btnGenerateElement = debugElement.query(By.css('.generate'))
      .nativeElement;
    btnGenerateElement.click();

    tick();
    fixture.detectChanges();
    expect(component.generate).toHaveBeenCalled();
    expect(component.max).toEqual('0911745894');
    expect(component.min).toEqual('0133629454');
    expect(component.size).toEqual(10);
    expect(component.phonenumbers.length).toEqual(10);
  }));
});
