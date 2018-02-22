// ВОПРОС - есть ли разница между .then(ok, fail) VS .then(ok).catch(fail) ?

new Promise( function(resolve, reject) {
  // ...

}).then( function(result) {
  // ...
}).catch( function(err) {
  // ...
});

// vs

new Promise( function(resolve, reject) {
  // ...
}).then(
   function(result) { /*...*/ },
   function(err) { /* ... */ }
);
