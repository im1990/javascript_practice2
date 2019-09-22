const radioEverything = document.querySelector('#everything');
const radioWorking = document.querySelector('#working');
const radioComplete = document.querySelector('#complete');
const lists = document.querySelector('#list');
const input = document.querySelector('#input');

let todoArray = []; // [{obj1}, {obj2}　...]

const Obj = function (todo, status) {
    this.todo = todo;
    this.status = status;
}

function addList() {
    // 新しいオブジェクトを生成して配列に入れる
    let newObj = new Obj(input.value, false);
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

    for (let i = 0; i < todoArray.length; i++) {

        //IDを表示させる用のtd要素を生成
        td1.innerHTML = i;
        tr.appendChild(td1);

        //コメントを表示させる用のtd要素を生成
        td2.innerHTML = ` ${todoArray[i].todo} `;
        tr.appendChild(td2);

        //ボタンを表示させる用のtd要素を生成
        tr.appendChild(td3);


        // 作業中/完了ボタンを表示 
        toggleBtn.addEventListener('click', () => {
            if (todoArray[i].status === false) {
                toggleBtn.textContent = '完了';
                // ↓ これでは i 以前の要素も true に代わってしまう
                todoArray[i].status = true;
            } else {
                toggleBtn.textContent = '作業中';
                todoArray[i].status = false;
            }
        });

        // 削除ボタンを表示
        deleteBtn.textContent = '削除'
        deleteBtn.addEventListener('click', () => {
            todoArray.splice(i, 1);
            tr.style.display = 'none';
            // リスト削除後にインデックスを付け直す
            // td1.innerHTML = i;
        });
    }

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