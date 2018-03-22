///<reference path="../../grouper.d.ts" />

export const getStudents = (): Promise<any> => {
  return new Promise((res: (value: IStudent[]) => void, rej: (error: any) => void) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/students');
    xhr.onreadystatechange = (e: Event) => {
      if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
        const response: any = xhr.response;
        try {
          res(JSON.parse(response));
        }
        catch (e) {
          res(response);
        }
      }
    };
    xhr.onerror = (e: Event) => {
      rej(xhr.statusText);
    };
    xhr.send();
  });
};

export const makeQuery = (query: IGrouperQuery) => {
  return new Promise((res: (value: string[][]) => void, rej: (error: any) => void) => {
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/group_form');
    xhr.onreadystatechange = (e: Event) => {
      if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
        const response: any = xhr.response;
        try {
          const result = JSON.parse(response) as string[][];
          if (!result || !Array.isArray(result[0])) {
            throw Error('e');
          }
          res(result);
        }
        catch (e) {
          const result = [
            ['1', '3', '7', '10', '13'],
            ['2', '5', '6', '11', '14'],
            ['4', '8', '9', '12'],
          ];
          res(result);
        }
      }
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onerror = (e: Event) => {
      rej(xhr.statusText);
    };
    xhr.send(JSON.stringify({groupQuery: query}));
  });
};
(window as any).makeQuery = makeQuery;
