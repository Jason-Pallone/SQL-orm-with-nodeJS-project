const input = document.getElementById('test');
const btn = document.getElementById('btn');


let inputValue;

btn.addEventListener('click', async(e) => {
    e.preventDefault()
  inputValue = input.value;
  await axios.post('http://localhost:5000/test/test1', {inputValue})
          .then(res => console.log(res.data));
});

