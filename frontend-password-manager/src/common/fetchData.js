
export const fetchDataPromise = (req, resolve, reject) => {
  fetch(req)
    .then((response) => {
      resolve(response)
    }).catch((err) => {
    reject(err);
  });
}

export const register = (resolve, reject, reqBodyObj) => {
  let req = new Request("http://127.0.0.1:8080/account/register", {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(reqBodyObj)
  });

  fetchDataPromise(req,  resolve, reject);
}

export const login =  (resolve, reject, reqBodyObj) => {
  let req = new Request("http://127.0.0.1:8080/account/login", {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(reqBodyObj)
  });

  fetchDataPromise(req,  resolve, reject);
}

export const validateOtpLogin =  (resolve, reject, reqBodyObj) => {
  let req = new Request("http://127.0.0.1:8080/account/login/validate", {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(reqBodyObj)
  });

  fetchDataPromise(req,  resolve, reject);
}


export const getSalt =  (resolve, reject, reqBodyObj) => {
  let req = new Request("http://127.0.0.1:8080/account/register/validate", {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(reqBodyObj)
  });

  fetchDataPromise(req,  resolve, reject);
}

export const getOtp =  (resolve, reject, token) => {
  let req = new Request("http://127.0.0.1:8080/user/getOtp", {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Authorization' : token,
      'Content-Type' : 'application/json'
    },
  });

  fetchDataPromise(req,  resolve, reject);
}


