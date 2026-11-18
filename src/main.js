import './style.css'
// ===== 暗色模式 =====
const themeBtn = document.getElementById('themeBtn');
if(localStorage.getItem('theme') === 'dark'){
  document.body.classList.add('dark');
  themeBtn.innerText = '☀️';
}
themeBtn.onclick = function(){
  document.body.classList.toggle('dark');
  if(document.body.classList.contains('dark')){
    localStorage.setItem('theme','dark');
    themeBtn.innerText = '☀️';
  }else{
    localStorage.setItem('theme','light');
    themeBtn.innerText = '🌙';
  }
}

// ===== 留言表单 =====
const form = document.getElementById('msgForm');
form.onsubmit = function(e){
  e.preventDefault();
  alert('✅ 发送成功！我会尽快查看留言');
  form.reset();
}

// ===== 待办清单 =====
const input = document.querySelector("#taskInput");
const btn = document.querySelector("#addBtn");
const list = document.querySelector("#list");

let todos = JSON.parse(localStorage.getItem("todos") || "[]");

function save(){
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render(){
  list.innerHTML = "";
  todos.forEach(function(item, index){
    const li = document.createElement("li");
    li.textContent = item.text;
    if(item.done){
      li.style.textDecoration = "line-through";
      li.style.color = "var(--text-sub)";
    }

    li.addEventListener("click", function(){
      todos[index].done = !todos[index].done;
      save();
      render();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "删除";
    delBtn.addEventListener("click", function(e){
      e.stopPropagation();
      todos.splice(index, 1);
      save();
      render();
    });

    li.appendChild(delBtn);
    list.appendChild(li);
  })
}

btn.addEventListener("click", function(){
  const text = input.value.trim();
  if(text === "") return;
  todos.push({text, done: false});
  save();
  render();
  input.value = "";
})

render();
