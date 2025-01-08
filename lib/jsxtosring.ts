

import fs from "fs";

export const readComponentSourceCode = async (fileUrl: string): Promise<string> => {
    try {
      const response = await fetch(fileUrl);
      const sourceCode = await response.text();
      console.log('sourceCode:', sourceCode);
      return sourceCode;
    } catch (error) {
      console.error('Error reading the component file:', error);
      return '';
    }
  };
