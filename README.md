# 🚀 Welcome translate files!

## Internationalize your website or app in a simple way 🇨🇴 🇺🇸 🇩🇪

## ✅ Let's speak in the same language!

- install in project

```
npm i @neiderruiz/translate-files
```
```
import { translateFileCsv } from "@neiderruiz/translate-files";
```

- or 

```
const { translateFileCsv } = require("@neiderruiz/translate-files");
```

- usign
```
translateFileCsv(idDocument,routeFolderSave)
```

##  🛑 If you already have a json with your translations you can use it as a base!

- separator [your key separator '&&' or '-', default is '.']
- langs [your langs translate website, default is empty ] [view list](https://github.com/neiderruiz/translate-files/blob/main/src/types/langs.ts){:target="_blank"}
    - example ['es', 'en', 'fr', 'gu']
- nameFile [name file result, default is 'result']

```javascript
    const { convertJsonToCsv } = require("@neiderruiz/translate-files");

    const data = require('../services/lang/languages/es.json')

    convertJsonToCsv(data, {
        separator: '.', 
        langs: ['es', 'en', 'fr', 'gu'],        
        nameFile: 'my_result'
    })
```

- import your result in Google Drive <a href="https://drive.google.com/drive/my-drive" target="_blank">open google drive</a>

    - after open file with google sheets
 
- after select keys and base, and copy in your copy of next document

<img src="https://github.com/neiderruiz/translate-files/assets/57574910/5e874c0f-f857-4a5b-bc15-de16112d9aa4" width="300" alt="image" />

## Open url and duplicate file  in your google drive.

🟢 <a href="https://docs.google.com/spreadsheets/d/1DP_xHUndNhb4900eaHwOZC03YhDO2LozwFUYOx89e7U/edit" target="_blank">document base spreadsheets translations</a>

- #### Share document
    - give read permission
    - copy link
    - get document ID from url


![image](https://user-images.githubusercontent.com/57574910/190467883-9f017028-a02f-4e78-b5a9-d279e277c4dd.png)

- duplicate document in your drive

![image](https://user-images.githubusercontent.com/57574910/190468094-03938268-16ca-44eb-97ee-91dd69e52ae8.png)


- we give our copy a name


![image](https://user-images.githubusercontent.com/57574910/190468304-ce8b847e-29f1-4e1e-9568-3765bed327db.png)


- We add our translations by editing the **base column**
    - **key:** the unique key we use in our app to translate text t('actions.save')
    - **base:** the text that we enter so that spreadsheets creates the translations automatically
    - **es,en,it,fr:** base languages ​​that the template has, you can add or remove languages
    
<img width="655" alt="image" src="https://github.com/neiderruiz/translate-files/assets/57574910/4d237997-0256-458d-bbf1-7757dcfa148a">

- we press share
  
![image](https://user-images.githubusercontent.com/57574910/190469921-27afec29-803c-4c05-aea4-00f5d0fcd039.png)

- brings the following as a base configuration

<img width="300" alt="" src="https://user-images.githubusercontent.com/57574910/190470384-da01ca56-6eef-463d-97ea-c19e6f9eafbc.png">

- we update it as follows and click on done

<img width="300" alt="" src="https://user-images.githubusercontent.com/57574910/190470736-6911f0a4-f1df-4ecb-963c-9fd39b919dc3.png">

- we extract the document id from our url

![image](https://user-images.githubusercontent.com/57574910/190471046-cbc02298-ca21-4291-acc2-3fc5398919e0.png)


```javascript
// src/utils/translate.js
const { translateFileCsv } = require("@neiderruiz/translate-files");

translateFileCsv('19sxdh1WE5RMXiuTWuMJonu81NWrewZbZ','./translations')

```
- add script in package.json
```json
// package.json
{
    "scripts": {
        "translate": "node src/utils/translate.js"
    }
}
```

- run script
```bash
npm run translate
```

- result

![image](https://user-images.githubusercontent.com/57574910/190472890-5a6d1d64-7cd7-4480-9ece-23a4906b008e.png)

- en

<img width="218" alt="image" src="https://github.com/neiderruiz/translate-files/assets/57574910/62e29d22-2f12-4f78-92a6-4627d538f3be">

- es

<img width="218" alt="image" src="https://github.com/neiderruiz/translate-files/assets/57574910/0020f998-75ac-4a23-9e8b-d027b5ae9114">

- fr

<img width="218" alt="image" src="https://github.com/neiderruiz/translate-files/assets/57574910/63a73927-8dd7-4072-b5c1-04b24773afb6">

- de
  
<img width="218" alt="image" src="https://github.com/neiderruiz/translate-files/assets/57574910/3cdc0dbe-f25a-49a0-97c9-9e63fc7a61aa">


# implement in React Js

## install package

```bash
npm i @neiderruiz/translate-files react-i18next i18next
```

- get translations spreadsheet id

```javascript
// src/utils/translate.js
import { translateFileCsv } from '@neiderruiz/translate-files'

translateFileCsv('1UwWGPdr8XDO29tNzFiJtPDTFVt1xCLG-gSVeQd-x5Oc', './src/locales/translations')

```

- add script in package.json


```json
// package.json
{
    "scripts": {
        ...more scripts,
        "translate": "node src/utils/translate.js"
    }
}
```

- make resources file

```javascript
// src/locales/index.js
import en from './translations/en.json'
import es from './translations/es.json'
import fr from './translations/fr.json'

export const resources = {
    en: {
        translation: en
    },
    es: {
        translation: es
    },
    fr: {
        translation: fr
    }
}

```

- create file i18n.js


```javascript
// src/locales/i18n.ts
import i18n from "i18next";

import { initReactI18next } from "react-i18next";
import { resources } from ".";

i18n.use(initReactI18next)
.init({
    resources,
    lng: "es",
    fallbackLng: "es",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
```

- add i18n in index.js

```javascript
// src/main.tsx or src/App.tsx
import './locales/i18n';
```

- make Hook useTranslate React Js

```javascript
// src/hooks/use-translate.tsx
import { useTypedTranslation } from '@neiderruiz/translate-files/dist/react'
import en from '../locales/translations/en.json'
import i18n from '../locales/i18n'

type Tylelang = typeof en

const useTranslation = () => {
    const { t } = useTypedTranslation<Tylelang>()
    return {
        t,
        i18n
    }
}

export default useTranslation
```

- how use hook

```Jsx
// src/components/Example.tsx
import React from 'react'
import useTranslation from '../hooks/use-translate'

const Example = () => {
    const { t } = useTranslation()
    return (
        <div>
            {t('actions.save')}
            {/* how pased params */}
            <span>
                {t('actions.save_items',  ['mi param', 'second param'])}
            </span>
        </div>
    )
}
