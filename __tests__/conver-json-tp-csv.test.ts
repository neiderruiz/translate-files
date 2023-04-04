import { describe, expect, test } from "@jest/globals";
import { createConversion } from "../src/utils/convert-json-to-csv";

describe("createConversion", () => {
  test("should convert JSON to CSV", () => {
    const jsonObj = {
      show_more: "Ver Más",
      notification: {
        news: "nueva(s) notificacion(es)",
      },
      alerts: {
        delete_note: {
          description: "¿Estas seguro de que deseas eliminar esta nota?",
        },
      },
    };
    const expectedCsv = `"key","base"\n"show_more","Ver Más"\n"notification&&news","nueva(s) notificacion(es)"\n"alerts&&delete_note&&description","¿Estas seguro de que deseas eliminar esta nota?"\n`;

    expect(createConversion(jsonObj)).toBe(expectedCsv);
  });
});
