import authApi from './authApi';

export const fileApi = {
  uploadImage,
  getFiles,
  getFile,
};

function uploadImage(file) {
  const formData = new FormData();
  formData.append('inputFile', file);
  // eslint-disable-next-line no-console
  console.log('file', file);

  const requestOptions = {
    method: 'POST',
    body: formData,
    headers: authApi.authHeader(),
  };

  return fetch(
    `http://whatssub-dev.azurewebsites.net/upload_file/`,
    requestOptions,
  ).then(handleResponse);
}

function getFiles() {
  const requestOptions = {
    method: 'GET',
    headers: authApi.authHeader(),
  };

  return fetch(`/files/get-all/`, requestOptions).then(handleResponse);
}

function getFile(id) {
  const requestOptions = {
    method: 'GET',
    headers: authApi.authHeader(),
  };

  return fetch(`/files/get/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    // eslint-disable-next-line no-console
    console.log('handleResponse: text', text);
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        alert('not authorized 401 error');
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
