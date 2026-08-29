import { AfterViewInit, Component, ElementRef, OnDestroy, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-scroll-trigger',
  imports: [],
  templateUrl: './scroll-trigger.html',
  styleUrl: './scroll-trigger.css',
})
export class ScrollTrigger implements AfterViewInit, OnDestroy {
  trigger = viewChild.required<ElementRef<HTMLDivElement>>('trigger');
  visible = output<void>();

  private observer?: IntersectionObserver;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.visible.emit();
        }
      },
      { threshold: 0.1 },
    );

    this.observer.observe(this.trigger().nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
