export class Dialog{

    static input(options: {title: string, message: string}, callback){
        // Overlay DOM
        const overlayDom = document.createElement('div');
        overlayDom.classList.add('modal-overlay');
        overlayDom.style.zIndex = '100';

        // Dialog DOM
        const dialogDom = document.createElement('div');
        dialogDom.classList.add('modal');
        dialogDom.style.zIndex = '101';

        // Section DOMs
        const headDom = document.createElement('div');
        headDom.classList.add('modal-head');

        const bodyDom = document.createElement('div');
        bodyDom.classList.add('modal-body');

        const actionsDom = document.createElement('div');
        actionsDom.classList.add('modal-actions');

        // Element DOMs
        const titleDom = document.createElement('h3');
        titleDom.classList.add('modal-title');
        titleDom.innerHTML = options.title;

        const messageDom = document.createElement('span');
        messageDom.classList.add('modal-message');
        messageDom.innerHTML = options.message;

        const inputDom = document.createElement('input');
        inputDom.classList.add('modal-input');
        inputDom.type = 'text';

        const okBtnDom = document.createElement('button');
        okBtnDom.classList.add('modal-btn');
        okBtnDom.classList.add('modal-btn-ok');
        okBtnDom.innerHTML = 'Ok';

        // Structure
        headDom.append(titleDom);
        bodyDom.append(messageDom);
        bodyDom.append(inputDom);
        actionsDom.append(okBtnDom);

        dialogDom.append(headDom);
        dialogDom.append(bodyDom);
        dialogDom.append(actionsDom);

        document.body.append(overlayDom);
        document.body.append(dialogDom);

        // Animation
        overlayDom.classList.add('fade-in');
        dialogDom.classList.add('fade-in');

        // "Ok" Clicked
        okBtnDom.addEventListener('click', () => {
            callback(inputDom.value);
            dialogDom.remove();
            overlayDom.remove();
        });

        // Overlay Clicked
        overlayDom.addEventListener('click', () => {
            dialogDom.remove();
            overlayDom.remove();
        });
    }

    static confirm(options: {title: string, message: string}, callback){
        // Overlay DOM
        const overlayDom = document.createElement('div');
        overlayDom.classList.add('modal-overlay');
        overlayDom.style.zIndex = '100';

        // Dialog DOM
        const dialogDom = document.createElement('div');
        dialogDom.classList.add('modal');
        dialogDom.style.zIndex = '101';

        // Section DOMs
        const headDom = document.createElement('div');
        headDom.classList.add('modal-head');

        const bodyDom = document.createElement('div');
        bodyDom.classList.add('modal-body');

        const actionsDom = document.createElement('div');
        actionsDom.classList.add('modal-actions');

        // Element DOMs
        const titleDom = document.createElement('h3');
        titleDom.classList.add('modal-title');
        titleDom.innerHTML = options.title;

        const messageDom = document.createElement('span');
        messageDom.classList.add('modal-message');
        messageDom.innerHTML = options.message;

        const yesBtnDom = document.createElement('button');
        yesBtnDom.classList.add('modal-btn');
        yesBtnDom.classList.add('modal-btn-yes');
        yesBtnDom.innerHTML = 'Yes';

        const noBtnDom = document.createElement('button');
        noBtnDom.classList.add('modal-btn');
        noBtnDom.classList.add('modal-btn-no');
        noBtnDom.innerHTML = 'No';

        // Structure
        headDom.append(titleDom);
        bodyDom.append(messageDom);
        actionsDom.append(noBtnDom);
        actionsDom.append(yesBtnDom);

        dialogDom.append(headDom);
        dialogDom.append(bodyDom);
        dialogDom.append(actionsDom);

        document.body.append(overlayDom);
        document.body.append(dialogDom);

        // Animation
        overlayDom.classList.add('fade-in');
        dialogDom.classList.add('fade-in');

        // "Yes" Clicked
        yesBtnDom.addEventListener('click', () => {
            callback(true);
            dialogDom.remove();
            overlayDom.remove();
        });

        // "No" Clicked
        noBtnDom.addEventListener('click', () => {
            callback(false);
            dialogDom.remove();
            overlayDom.remove();
        });

        // Overlay Clicked
        overlayDom.addEventListener('click', () => {
            callback(false);
            dialogDom.remove();
            overlayDom.remove();
        });
    }

    static alert(options: {title: string, message: string}){
        // Overlay DOM
        const overlayDom = document.createElement('div');
        overlayDom.classList.add('modal-overlay');
        overlayDom.style.zIndex = '100';

        // Dialog DOM
        const dialogDom = document.createElement('div');
        dialogDom.classList.add('modal');
        dialogDom.style.zIndex = '101';

        // Section DOMs
        const headDom = document.createElement('div');
        headDom.classList.add('modal-head');

        const bodyDom = document.createElement('div');
        bodyDom.classList.add('modal-body');

        const actionsDom = document.createElement('div');
        actionsDom.classList.add('modal-actions');

        // Element DOMs
        const titleDom = document.createElement('h3');
        titleDom.classList.add('modal-title');
        titleDom.innerHTML = options.title;

        const messageDom = document.createElement('span');
        messageDom.classList.add('modal-message');
        messageDom.innerHTML = options.message;

        const okBtnDom = document.createElement('button');
        okBtnDom.classList.add('modal-btn');
        okBtnDom.classList.add('modal-btn-ok');
        okBtnDom.innerHTML = 'Ok';

        // Structure
        headDom.append(titleDom);
        bodyDom.append(messageDom);
        actionsDom.append(okBtnDom);

        dialogDom.append(headDom);
        dialogDom.append(bodyDom);
        dialogDom.append(actionsDom);

        document.body.append(overlayDom);
        document.body.append(dialogDom);

        // Animation
        overlayDom.classList.add('fade-in');
        dialogDom.classList.add('fade-in');

        // "Ok" Clicked
        okBtnDom.addEventListener('click', () => {
            dialogDom.remove();
            overlayDom.remove();
        });

        // Overlay Clicked
        overlayDom.addEventListener('click', () => {
            dialogDom.remove();
            overlayDom.remove();
        });
    }

    static custom(options: {title:string, fields: [{id:number, type:Dialog.FieldTypes, label:string, min, max}]}, callback){
        // Overlay DOM
        const overlayDom = document.createElement('div');
        overlayDom.classList.add('modal-overlay');
        overlayDom.style.zIndex = '100';

        // Dialog DOM
        const dialogDom = document.createElement('div');
        dialogDom.classList.add('modal');
        dialogDom.style.zIndex = '101';

        // Section DOMs
        const headDom = document.createElement('div');
        headDom.classList.add('modal-head');

        const bodyDom = document.createElement('div');
        bodyDom.classList.add('modal-body');

        const actionsDom = document.createElement('div');
        actionsDom.classList.add('modal-actions');

        // Element DOMs
        const titleDom = document.createElement('h3');
        titleDom.classList.add('modal-title');
        titleDom.innerHTML = options.title;

        ////////////// CUSTOM FIELDS ///////////////////
        const fields = [];

        options.fields.forEach(field => {
            const fieldDom = document.createElement('div');
            fieldDom.classList.add('custom-field');

            const labelDom = document.createElement('span');
            labelDom.classList.add('field-label');
            labelDom.innerHTML = field.label;

            
            if(field.type == this.FieldTypes.CheckBox){
                const inputDom = document.createElement('input');
                inputDom.classList.add('modal-input');
                inputDom.type = field.type;
                
                fieldDom.append(inputDom);
                fieldDom.append(labelDom);

                fieldDom.classList.add('checkbox-field');
            } 
            else if(field.type == this.FieldTypes.Number) {
                const inputDom = document.createElement('input');
                inputDom.classList.add('modal-input');
                inputDom.type = field.type;
                inputDom.min = field.min;
                inputDom.max = field.max;

                let curVal = field.min;
                inputDom.addEventListener('keydown', () => {
                    curVal = parseFloat(inputDom.value);
                })
                inputDom.addEventListener('keyup', () => {
                    setTimeout(() => {
                        if(parseFloat(inputDom.value) < field.min){
                            inputDom.value = field.min;
                        } else if(parseFloat(inputDom.value) > field.max){
                            inputDom.value = field.max;
                        }
                    }, 2000);
                })

                fieldDom.append(labelDom);
                fieldDom.append(inputDom);

                fieldDom.classList.add('input-field');
            } 
            else if(field.type == this.FieldTypes.Range) {
                const rangeDom = document.createElement('div');
                rangeDom.classList.add('range');

                const minLabel = document.createElement('span');
                minLabel.classList.add('min-lbl');
                minLabel.innerHTML = field.min;

                const maxLabel = document.createElement('span');
                maxLabel.classList.add('max-lbl');
                maxLabel.innerHTML = field.max;

                const inputDom = document.createElement('input');
                inputDom.classList.add('modal-input');
                inputDom.type = field.type;
                inputDom.min = field.min;
                inputDom.max = field.max;

                const curLabel = document.createElement('span');
                curLabel.classList.add('range-cur-lbl');
                curLabel.innerHTML = inputDom.value;
                inputDom.addEventListener('input', () => curLabel.innerHTML = inputDom.value);

                rangeDom.append(minLabel);
                rangeDom.append(inputDom);
                rangeDom.append(maxLabel);
                
                fieldDom.append(labelDom);
                fieldDom.append(rangeDom);
                fieldDom.append(curLabel);

                fieldDom.classList.add('input-field');
            } else {
                const inputDom = document.createElement('input');
                inputDom.classList.add('modal-input');
                inputDom.type = field.type;

                fieldDom.append(labelDom);
                fieldDom.append(inputDom);

                fieldDom.classList.add('input-field');
            }

            fields.push({
                id: field.id,
                type: field.type,
                fieldDom
            });
        });
        ///////////////////////////////////////////////

        const okBtnDom = document.createElement('button');
        okBtnDom.classList.add('modal-btn');
        okBtnDom.classList.add('modal-btn-ok');
        okBtnDom.innerHTML = 'Ok';

        // Structure
        headDom.append(titleDom);
        fields.forEach(field => {
            bodyDom.append(field.fieldDom);
        });
        actionsDom.append(okBtnDom);

        dialogDom.append(headDom);
        dialogDom.append(bodyDom);
        dialogDom.append(actionsDom);

        document.body.append(overlayDom);
        document.body.append(dialogDom);

        // Animation
        overlayDom.classList.add('fade-in');
        dialogDom.classList.add('fade-in');

        // "Ok" Clicked
        okBtnDom.addEventListener('click', () => {
            const result = [];

            fields.forEach(field => {
                const input = field.fieldDom.querySelector('input');
                let value;
                
                if(field.type == this.FieldTypes.CheckBox){
                    value = input.checked;
                } else {
                    value = input.value;
                }

                result.push({
                    id: field.id,
                    type: field.type,
                    value: value
                });
            })

            callback(result);
            dialogDom.remove();
            overlayDom.remove();
        });

        // Overlay Clicked
        overlayDom.addEventListener('click', () => {
            dialogDom.remove();
            overlayDom.remove();
        });
    }
}

export namespace Dialog
{
    export enum FieldTypes
    {
        Text = "text",
        Password = "password",
        Number = "number",
        CheckBox = "checkbox",
        Range = "range"
    }
}