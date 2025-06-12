function login() {
  const enteredPhone = document.getElementById("num").value;
  const enteredPass = document.getElementById("pass").value;
  const result = document.getElementById("res");
  // below is database
  phone = 1234;
  pass = "test";
  checkPhone(enteredPhone)
    .then((isnum) => {
      if (isnum) {
        checkPass(enteredPass)
          .then((ispass) => {
            if (ispass) {
              alert("Login success");
            }
          })
          .catch(() => {
            alert("Invalid  pass");
          });
      }
    })
    .catch(() => {
      alert("Invalid  user");
    });
}
function checkPhone(n) {
  return new Promise((resolve, reject) => {
    if (n == phone) {
      resolve(true);
    } else {
      reject(false);
    }
  });
}

function checkPass(p) {
  return new Promise((resolve, reject) => {
    if (p == pass) {
      resolve(true);
    } else {
      reject(false);
    }
  });
}
