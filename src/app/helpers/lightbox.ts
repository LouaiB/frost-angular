export class Lightbox{

    static show(src: string){
        // Overlay DOM
        const overlayDom = document.createElement('div');
        overlayDom.classList.add('lightbox-overlay');
        overlayDom.style.zIndex = '100';

        // Lightbox DOM
        const dialogDom = document.createElement('div');
        dialogDom.classList.add('lightbox');
        dialogDom.style.zIndex = '101';

        // Section DOMs
        const controlsDom = document.createElement('div');
        controlsDom.classList.add('lightbox-controls');

        const bodyDom = document.createElement('div');
        bodyDom.classList.add('lightbox-body');

        // Element DOMs
        const xBtnDom = document.createElement('button');
        xBtnDom.classList.add('lightbox-control');
        xBtnDom.classList.add('lightbox-control-x');
        xBtnDom.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i>`;

        const dlBtnDom = document.createElement('button');
        dlBtnDom.classList.add('lightbox-control');
        dlBtnDom.classList.add('lightbox-control-dl');
        dlBtnDom.innerHTML = `<i class="fa fa-download" aria-hidden="true"></i>`;

        const imgDom = document.createElement('img');
        imgDom.classList.add('lightbox-img');
        imgDom.src = src;

        // Structure
        controlsDom.append(xBtnDom);
        controlsDom.append(dlBtnDom);
        bodyDom.append(imgDom);

        dialogDom.append(controlsDom);
        dialogDom.append(bodyDom);

        document.body.append(overlayDom);
        document.body.append(dialogDom);

        // Animation
        overlayDom.classList.add('fade-in');
        dialogDom.classList.add('fade-in');

        // "X" Clicked
        xBtnDom.addEventListener('click', () => {
            dialogDom.remove();
            overlayDom.remove();
        });

        // Overlay Clicked
        overlayDom.addEventListener('click', () => {
            dialogDom.remove();
            overlayDom.remove();
        });

        // DL Clicked
        dlBtnDom.addEventListener('click', () => {
            download(src, src.slice(-8));
        });
    }

    
}

function download(dataurl, filename) {
    var a = document.createElement("a");
    a.href = dataurl;
    a.target = '_blank';
    a.click();
  }