import fs from 'fs';
import { saveWithLevels } from '../src/utils/save-with-levels';

describe('saveWithLevels', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create files for each language and save the expected contents', () => {
    const jsonObj = [
      { base: 'en', key: 'greeting', en: 'Hello', es: 'Hola' },
      { base: 'en', key: 'farewell', en: 'Goodbye', es: 'Adiós' },
      { base: 'es', key: 'greeting', en: 'Hello', es: 'Hola' },
      { base: 'es', key: 'farewell', en: 'Goodbye', es: 'Adiós' },
    ];

    const folderSave = 'testFolder';

    const mockWriteFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    saveWithLevels(jsonObj, folderSave);

    expect(mockWriteFileSync).toHaveBeenCalledTimes(2);

    const expectedEnContents = {
      greeting: 'Hello',
      farewell: 'Goodbye',
    };
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      `${folderSave}/en.json`,
      JSON.stringify(expectedEnContents, null, 4)
    );

    const expectedEsContents = {
      greeting: 'Hola',
      farewell: 'Adiós',
    };
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      `${folderSave}/es.json`,
      JSON.stringify(expectedEsContents, null, 4)
    );
  });
});
