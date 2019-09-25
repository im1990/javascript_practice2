const lists = document.querySelector('#list');
const input = document.querySelector('#input');

let todoArray = []; // [{obj1}, {obj2}　...]

const Obj = function (id, todo, status) {
    this.id = id;
    this.todo = todo;
    this.status = status;
}

/********************
* 　リスト追加機能　　*
********************/
function addList() {

    let status = false;
    let text = input.value;
    let ID;

    // IDをつける
    if(todoArray.length > 0) {
        ID = todoArray.length;
    } else {
        ID = 0;
    }

    // 新しいオブジェクトを生成して配列に入れる
    let newObj = new Obj(ID , text, status);
    todoArray.push(newObj);

    // 作業中/完了ボタンを表示 
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = '作業中';
    // 作業中/完了ボタンのイベント
    toggleBtn.addEventListener('click', e => {
        let currentID = parseInt(e.target.parentElement.parentElement.firstElementChild.textContent);
        if (todoArray[currentID].status === false) {
            e.target.textContent = '完了';
            todoArray[currentID].status = true;
        } else {
            e.target.textContent = '作業中';
            todoArray[currentID].status = false;
        }
    });

    // 削除ボタンを表示
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除'
    // 削除ボタンのイベント
    deleteBtn.addEventListener('click', e => {
        let currentID = parseInt(e.target.parentElement.parentElement.firstElementChild.textContent);
        todoArray.splice(currentID, 1);
        tr.style.display = 'none';
    });

    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');

    // td1 : ID表示
    td1.innerHTML = ID;

    // td2 : コメント表示
    td2.innerHTML = ` ${todoArray[ID].todo} `;

    // td3 : ボタン表示
    td3.appendChild(toggleBtn);
    td3.appendChild(deleteBtn);

    // 全部ひとまとめ
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    lists.appendChild(tr);

    // inputの中身をリセット
    input.value = '';
}

// クリックすればリスト追加
input.addEventListener('keypress', e => {
  if(e.key === 'Enter') {
    addList();
  }
});

/********************
* 　　ソート機能　　　*
********************/
// 非表示アイテム格納用配列
let sortArray = [];

// ラジオボタン「すべて」ですべて表示に戻す
function everything() {
    sortArray = []; // 配列の中をクリア

    // すべて表示する
    for(let i = 0; i < todoArray.length; i++) {
        const listChildren = lists.children[i];
        listChildren.style.display = 'table-row';
    }
}

// ラジオボタン「作業中」によるソート
function working() {
    // ソート用配列の初期化
    everything();

    // 「作業中」以外の要素（完了ボタン）のみ抽出
    const inactiveTodo = todoArray.filter(x => x.status); // status:true のものだけ抽出
    sortArray.push(inactiveTodo);

    // 「作業中」以外の要素（完了ボタン）を非表示にする 
    sort();
}

// ラジオボタン「完了」によるソート
function complete() {
    // ソート用配列の初期化
    everything();

    // 「完了」以外の要素（作業中ボタン）のみ抽出
    const inactiveTodo = todoArray.filter(x => !x.status);
    sortArray.push(inactiveTodo);

    // 「完了」以外の要素（作業中ボタン）を非表示にする 
    sort();
}

// 非表示にするアイテムを隠す
function sort() {
    for(let i = 0; i < sortArray[0].length; i++) {
        let hideID = sortArray[0][i].id;
        let hideElement = lists.children[hideID]
        hideElement.style.display = 'none';
    } 
}
