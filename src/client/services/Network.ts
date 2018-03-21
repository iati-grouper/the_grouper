export const getStudents = (): Promise<any> => {
  return new Promise((res, rej) => {
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
    }
    xhr.send();
  });
};