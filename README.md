# 🚀 Welcome translate files!

install in project

```
npm i translate-files
```
```
import { translateFileCsv } from "translate-files";
```

or 

```
const { translateFileCsv } = require("translate-files");
```

usign
```
translateFileCsv(idDocument,routeFolderSave)
```

- #### Open url and duplicate file  in your google drive.

- #### Share document
    - give read permission
    - copy link
    - get document ID from url

[document base spreadsheets translations](https://docs.google.com/spreadsheets/d/1Xz_no_pM1hFRYJg_k_-gVqIvdwBycBVF/edit)

![image](https://user-images.githubusercontent.com/57574910/190467883-9f017028-a02f-4e78-b5a9-d279e277c4dd.png)

- duplicate document in yout drive

![image](https://user-images.githubusercontent.com/57574910/190468094-03938268-16ca-44eb-97ee-91dd69e52ae8.png)


- we give our copy a name


![image](https://user-images.githubusercontent.com/57574910/190468304-ce8b847e-29f1-4e1e-9568-3765bed327db.png)


- We add our translations by editing the **base column**
    - **key:** the unique key we use in our app to translate text
    - **base:** the text that we enter so that spreadsheets creates the translations automatically
    - **es,en,it,fr:** base languages ​​that the template has, you can add or remove languages
    

![image](https://user-images.githubusercontent.com/57574910/190469051-5d389298-25ab-440c-a54e-285b90ef05a6.png)


- we press share

![image](https://user-images.githubusercontent.com/57574910/190469921-27afec29-803c-4c05-aea4-00f5d0fcd039.png)

- brings the following as a base configuration

![image](https://user-images.githubusercontent.com/57574910/190470384-da01ca56-6eef-463d-97ea-c19e6f9eafbc.png)

- we update it as follows and click on done

![image](https://user-images.githubusercontent.com/57574910/190470736-6911f0a4-f1df-4ecb-963c-9fd39b919dc3.png)


- we extract the document id from our url

![image](https://user-images.githubusercontent.com/57574910/190471046-cbc02298-ca21-4291-acc2-3fc5398919e0.png)


```
translateFileCsv('19sxdh1WE5RMXiuTWuMJonu81NWrewZbZ','./translations')
```

- results

![image](https://user-images.githubusercontent.com/57574910/190472890-5a6d1d64-7cd7-4480-9ece-23a4906b008e.png)

- en

![image](https://user-images.githubusercontent.com/57574910/190473010-0448614f-f168-424c-b114-b037777a3682.png)

- es

![image](https://user-images.githubusercontent.com/57574910/190473049-f82a1aa0-10fc-4eda-b855-13df42d73267.png)

- fr

![image](https://user-images.githubusercontent.com/57574910/190473106-eb9dcceb-95b3-4420-81f9-69a8e982ddd8.png)



