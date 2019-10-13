const radioEverything = document.querySelector('#everything');
const radioWorking = document.querySelector('#working');
const radioComplete = document.querySelector('#complete');
const lists = document.querySelector('#list');
const input = document.querySelector('#input');

const todoArray = []; // [{obj1}, {obj2}　...]

const TaskObj = function (todo, status) {
    this.todo = todo;
    this.status = status;
}

function addList() {
    // 新しいオブジェクトを生成して配列に入れる
    const newObj = new TaskObj(input.value, false);
    todoArray.push(newObj);

    // forループ内の削除ボタンでtrを消す作業をするため、forループ外に記載
    const tr = document.createElement('tr');
    lists.appendChild(tr);

    // for文内に入れると重複して表示されてしまうため、forループ外に記述
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = '作業中';
    const deleteBtn = document.createElement('button');

    todoArray.forEach((index, value) => {
        //IDを表示させる用のtd要素を生成
        td1.innerHTML = value;
        tr.appendChild(td1);

        //コメントを表示させる用のtd要素を生成
        td2.innerHTML = ` ${index.todo} `;
        tr.appendChild(td2);

        //ボタンを表示させる用のtd要素を生成
        tr.appendChild(td3);

        // 作業中/完了ボタンを表示 
        toggleBtn.addEventListener('click', () => {
            if (!index.status) {
                toggleBtn.textContent = '完了';
                index.status = true;
            } else {
                toggleBtn.textContent = '作業中';
                index.status = false;
            }
        });

        // 削除ボタンを表示
        deleteBtn.textContent = '削除'
        deleteBtn.addEventListener('click', () => {
            todoArray.splice(value, 1);
            tr.style.display = 'none';
        });
    });

    td3.appendChild(toggleBtn);
    td3.appendChild(deleteBtn);

    // inputの中身をリセット
    input.value = '';

    console.log(todoArray)
}

// inputエリアでクリックを押せばリストが追加される
input.addEventListener('keypress', e => {
  if(e.key === 'Enter') {
    addList();
  }
});

// ラジオボタンでソートかける

// 作業中アイテムのソート
// radioWorking,addEventListener('ckick', () => {
//     todoArray.filter( () => {
//         console.log(todoArray.status  === false)

//         return todoArray.status  === false;
//     })
// });