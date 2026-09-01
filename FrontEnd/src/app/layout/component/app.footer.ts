import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        Meex by
        <a href="https://www.meex.be/" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">Alexandre Pugliese</a>
    </div>`
})
export class AppFooter {}
