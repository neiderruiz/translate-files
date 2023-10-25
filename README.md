# 🚀 Welcome translate files!

## Internationalize your website or app in a simple way 🇨🇴 🇺🇸 🇩🇪

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

## Open url and duplicate file  in your google drive.

🟢 <a href="https://docs.google.com/spreadsheets/d/1Xz_no_pM1hFRYJg_k_-gVqIvdwBycBVF/edit" target="_blank">document base spreadsheets translations</a>

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
    
<img width="658" alt="image" src="https://github.com/neiderruiz/translate-files/assets/57574910/5a77f813-0aef-4775-a6a2-b315eca42aac">

- we press share
  
![image](https://user-images.githubusercontent.com/57574910/190469921-27afec29-803c-4c05-aea4-00f5d0fcd039.png)

- brings the following as a base configuration

<img width="300" alt="" src="https://user-images.githubusercontent.com/57574910/190470384-da01ca56-6eef-463d-97ea-c19e6f9eafbc.png">

- we update it as follows and click on done

<img width="300" alt="" src="https://user-images.githubusercontent.com/57574910/190470736-6911f0a4-f1df-4ecb-963c-9fd39b919dc3.png">

- we extract the document id from our url

![image](https://user-images.githubusercontent.com/57574910/190471046-cbc02298-ca21-4291-acc2-3fc5398919e0.png)


```
translateFileCsv('19sxdh1WE5RMXiuTWuMJonu81NWrewZbZ','./translations')
```

- results

![image](https://user-images.githubusercontent.com/57574910/190472890-5a6d1d64-7cd7-4480-9ece-23a4906b008e.png)

- en

<img width="370" alt="image" src="https://github.com/neiderruiz/translate-files/assets/57574910/91cf277f-aa33-44c5-9293-8393c68c81be">

- es

<img width="370" alt="image" src="https://github.com/neiderruiz/translate-files/assets/57574910/ff6c5b81-680b-4303-8e95-8dd64c7b7dbf">

- fr

<img width="370" alt="image" src="https://github.com/neiderruiz/translate-files/assets/57574910/c7901287-dbc4-41b9-b7ce-789c7b5a5f05">

- de

<img width="370" alt="image" src="https://github.com/neiderruiz/translate-files/assets/57574910/4c0f85bc-ad7e-4a08-a539-e8a7d27eab87">


