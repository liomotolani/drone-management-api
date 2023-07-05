export const generateSerialNumber = (length: number): string  =>{
    const randomPart = Math.random().toString(36).substr(2, length);
    return `SER-${randomPart}`;
  }
  