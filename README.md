# 🚀 Welcome translate files!

## Internationalize your website or app in a simple way 🇨🇴 🇺🇸 🇩🇪

## ✅ Let's speak in the same language!

<img width="389" alt="image" src="https://github.com/neiderruiz/translate-files/assets/57574910/8dfed716-9ca1-4901-af20-c0b4f4919aaa">

## 📖 Table of Contents
- [🚀 Getting started](#-getting-started)
  - [1. Install](#1-install)
  - [2. Config base Translations](#2-configure-translations)
- [📦 Convert JSON to CSV](#-convert-json)
- [🔵 Implement in React Js](#implement-in-react-js)
- [🟠 Implement in Astro](#implement-in-astro)
- [🟢 Implement in NextJs](#implement-in-nextjs)

### 1. Install

```bash
npm i @neiderruiz/translate-files
```

```javascript
import { translateFileCsv } from "@neiderruiz/translate-files";
```

- or 

```javascript
const { translateFileCsv } = require("@neiderruiz/translate-files");
```

- usign
```javascript
translateFileCsv(idDocument,routeFolderSave)
```

## generate

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
### 2. configure translations

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
import { useTypedTranslation, FlattenKeys } from '@neiderruiz/translate-files/react'
import en from '../locales/translations/en.json'
import i18n from '../locales/i18n'

type Tylelang = typeof en

export type KeysTranslation = FlattenKeys<Tylelang>

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
```

# implement in Astro

## install packages

```bash
npm i @neiderruiz/translate-files astro-i18next @types/i18next -D
```

- config astro-i18next

<a href="https://www.npmjs.com/package/astro-i18next#1-install" target="_blank">view documentation</a>

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";

export default defineConfig({
  integrations: [astroI18next()],
});
```

- make file config
    
```javascript
//astro-i18next.config.mjs
export default {
  defaultLocale: "en",
  locales: ["en", "fr"],
};

```

- get translations spreadsheet id

```javascript
// src/utils/translate.js
const { makeTranslations } = require("@neiderruiz/translate-files/astro");

makeTranslations('1UwWGPdr8XDO29tNzFiJtPDTFVt1xCLG-gSVeQd-x5Oc')
```

- add script in package.json

```json
// package.json
{
    "scripts": {
        ...more scripts,
        "translate": "node ./src/utils/translate.js && npx astro-i18next generate"
    }
}
```

- example use in astro

```jsx
// src/pages/index.astro
---
import { t } from "i18next";
---

<h1>{t('actions.save')}</h1>
```

- example interpolate params

```jsx
// src/pages/index.astro
---
import { t } from "i18next";
---

<h1>{t('test.counting',['1','20'])}</h1>
// result <h1>counting 1 of 20</h1>
```
# implement in NextJs

## install packages
```bash
npm i @neiderruiz/translate-files @types/i18next next-i18n-router -D
```

- config next.js


```javascript
// ./src/utils/translate.js
const { translateFileCsv } = require("@neiderruiz/translate-files");

const documentId = 'documentId spreadsheets';
const folderSave = './src/service/languages';

translateFileCsv(documentId, folderSave, {
    separator: '.',
});
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

- run get translations

```bash
npm run translate
```

- export all translations in index.ts

```javascript
// in folderSave create (index.ts) and export your translation json

import en from './en.json';
import es from './es.json';
import fr from './fr.json';


export const resources = {
	en: {
		translation: en,
	},
	es: {
		translation: es,
	},
	fr: {
		translation: fr,
	},
};
```

- create i18nConfig.js ot i18nConfig.ts

```javascript
// ./i18nConfig.ts
export const i18nConfig = {
    locales: ['en', 'es','fr'], // add your translations
    defaultLocale: 'es', // add your default translation
    localeDetection: true
}
```

- add middleware

```javascript
// ./src/middleware.ts
import { i18nRouter } from "next-i18n-router";
import i18nConfig from'../i18nConfig'

export function middleware(req: any){
    return i18nRouter(req, i18nConfig)
}

export const config = {
    matcher:  "/((?!api|static|.*\\..*|_next).*)"
}
```

- make folder [locale] in folder app

    - basic structure
        src/app/[locale]

- move all files in folder [locale]
  
    src/app/[locale]
    
    src/app/[locale]/layout.tsx
    
    src/app/[locale]/page.tsx
    
    src/app/[locale]/about/page.tsx

    src/app/[locale]... and more pages...


- implement Provider

```javascript
// src/app/[locale]/layout.tsx

import { TranslationsProvider } from "@neiderruiz/translate-files/next-js";
//const folderSave = './src/service/languages';
// import of folderSave resources
import { resources } from "./src/service/languages"
//or
import { resources } from "@/service/languages"

import i18nConfig from "../../../i18nConfig";

type Props ={
  children: React.ReactNode;
  params: {
    locale: string
  }
}

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<Props>) {
  return (
    <html lang={locale}>
      <body>
        <TranslationsProvider
          locale={locale}
          fallbackLng={i18nConfig.locales}
          resources={resources}
        >
          {children}
        </TranslationsProvider>
      </body>
    </html>
  );
}
```

- Create custom hook autocomplete

```javascript
// ./src/hooks/useTranslation.tsx
import { FlattenKeys, useTypedTranslation } from '@neiderruiz/translate-files/next-js/hooks';
import en from '@/service/languages/en.json';
type Tylelang = typeof en

export type KeysTranslation = FlattenKeys<Tylelang>

const useTranslation = () => {
    return {
        ...useTypedTranslation<Tylelang>()
    }
}

export default useTranslation
```

- how use

```javascript
// ./src/[locale]/about/page.tsx
"use client"
import useTranslation from '@/hooks/useTranslation';
import Link from 'next/link';

const Page = () => {
    const { t, i18n } = useTranslation();

    return <div>
        <h1>{t('actions.welcome')}</h1>     
            <Link href={`/${i18n.language}/home`}>
                frances
            </Link>

            <Link href={`/fr/home`}>
                frances
            </Link>
            <Link href={'/en/home'}>
                ingles
            </Link>
            <Link href={'/es/home'}>
                Español
            </Link>
    </div>
}
```