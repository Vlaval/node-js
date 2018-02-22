const form = document.getElementById('loginForm')''

form.onsubmit = function() {
  fetch("/login", {
    method: "POST",
    credentials: "include", // "omit" by default, for cookies to work
    body: new FormData(this)
  })
    .then(response => response.json())
    .then(response => {
      if (response.error) {
        alert(response.error.message);
      } else if (response.user) {
        alert("Welcome, " + response.user.displayName);
        window.location.reload(true);
      } else {
        throw new Error("Invalid response from the server");
      }
    })
    .catch(function(err) {
      alert("Error: " + err.message);
    })

  return false;
}
