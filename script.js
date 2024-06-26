
//  callback 

//  take button and callback_Content 
const callback_btn = document.getElementById('callbackButton');
const callback_Content = document.getElementById('callbackContent');

// add event litner on the button 
if (callback_btn) {
  callback_btn.addEventListener('click', function () {
    callback_Content.innerText = 'Callback executed after 5 seconds';
  });

  callback_btn.addEventListener('click', function () {
    setTimeout(function () {
      fetch('https://dummyjson.com/posts')
        .then(response => { return response.json(); })
        .then(data => {
          const titles = data.posts.map(post => post.title).join('<br>');
          callback_Content.innerHTML = titles;
        })
        .catch(error => {
          callback_Content.innerText = 'Error fetching data';
          console.error('Error:', error);
        });
    }, 5000);
  });
}

// Promise 

//  take button and promise_Content 
const promise_btn = document.getElementById('promiseButton');
const promise_Content = document.getElementById('promiseContent');

if (promise_btn) {
  // add event litner on the button 
  promise_btn.addEventListener('click', function () {
    promise_Content.innerText = 'Loading...';

    const fetchWithTimeout = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject('Operation timed out.');
      }, 5000);

      fetch('https://dummyjson.com/posts')
        .then(response => response.json())
        .then(data => {
          clearTimeout(timeout);
          resolve(data);
        })
        .catch(error => {
          clearTimeout(timeout);
          reject(error);
        });
    });

    fetchWithTimeout
      .then(data => {
        const titles = data.posts.map(post => post.title).join('<br>');
        promise_Content.innerHTML = titles;
      })
      .catch(error => {
        promise_Content.innerText = error;
        console.error('Error:', error);
      });
  });
}

// Async Await 

// take button and promise_Content 
const Async_btn = document.getElementById('asyncButton');
const Async_content = document.getElementById('asyncContent');

if (Async_btn) {
  //  take button and promise_Content 
  Async_btn.addEventListener('click', async function () {

    Async_content.innerText = 'Loading...';

    const fetchWithTimeout = async (url, timeout = 5000) => {
      // here use abort method for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      // try catch for error handling 
      try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response.json();
      } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
          throw new Error('Operation timed out.');
        }
        throw error;
      }
    };

    try {
      const data = await fetchWithTimeout('https://dummyjson.com/posts');
      const titles = data.posts.map(post => post.title).join('<br>');
      Async_content.innerHTML = titles;
    } catch (error) {
      Async_content.innerText = error.message;
      console.error('Error:', error);
    }
  });
}


