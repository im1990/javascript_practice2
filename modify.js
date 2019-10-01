const lists = document.querySelector('#list');
const input = document.querySelector('#input');

const todoArray = []; // [{obj1}, {obj2}　...]

const TaskObj = function (id, todo, status) {
    this.id = id;
    this.todo = todo;
    this.status = status;
}

/**************************
*  　トグルボタン追加機能　　*
***************************/
const createToggleBtn = () => {

    const toggleBtn = document.createElement('button');
    // 作業中/完了ボタンを表示 
    
    todoArray.forEach( index => {
        if(!index.status) {
            toggleBtn.textContent = '作業中';
        } else {
            toggleBtn.textContent = '完了';
        }
    });
    
    // 作業中/完了ボタンのイベント
    toggleBtn.addEventListener('click', e => {
        let currentID = parseInt(e.target.parentElement.parentElement.firstElementChild.textContent);
        if (!todoArray[currentID].status) {
            e.target.textContent = '完了';
            todoArray[currentID].status = true;
        } else {
            e.target.textContent = '作業中';
            todoArray[currentID].status = false;
        }        
        displayTodos(todoArray);
    });
    return toggleBtn;
}

/*************************
*  　削除ボタン追加機能　　*
**************************/
const createDeleteBtn = () => {
    // 削除ボタンを表示
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除'
    // 削除ボタンのイベント
    deleteBtn.addEventListener('click', e => {
        let currentID = parseInt(e.target.parentElement.parentElement.firstElementChild.textContent);
        todoArray.splice(currentID, 1);
        //配列の再生成
        createTodos(todoArray);
    });
    return deleteBtn;
}

/********************
* 　リスト作成機能　　*
********************/
const createTodos = array => {
        lists.textContent = '';
        array.forEach((index, value) => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');

        // td1 : ID表示
        td1.innerHTML = value;

        // td2 : コメント表示
        td2.innerHTML = ` ${index.todo} `;

        // td3 : ボタン表示
        const toggleButton = createToggleBtn();
        const deleteButton = createDeleteBtn();
        td3.appendChild(toggleButton);
        td3.appendChild(deleteButton);

        // 全部ひとまとめ
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        lists.appendChild(tr);
    });
}

/********************
* 　リスト表示機能　　*
********************/
const displayTodos = array => {
    let status = false;
    let text = input.value;
    let id = 0;

    if(text) {
        // IDをつける
        if(array.length) {
            id = array.length;
        } else {
            id = 0;
        }

        // 表示を初期化
        lists.textContent = '';

        // 新しいオブジェクトを生成して配列に入れる
        const newTaskObj = new TaskObj(id, text, status);
        array.push(newTaskObj);

        array.forEach((index, value) => {
            createTodos(array);
        });
    }    
}

/********************
* 　リスト追加機能　　*
********************/
const addList = function() {

    displayTodos(todoArray);

    input.value = '';
}

// 「追加」ボタンをクリックするとリスト追加
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', addList);

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
// ここはconstにするとエラー：Assignment to constant variable
let sortArray = [];

// ラジオボタン「すべて」ですべて表示に戻す
const everything = function() {
    sortArray = []; // 配列の中をクリア

    createTodos(todoArray);
    displayTodos(todoArray);
}
const everyButton = document.getElementById('everyButton');
everyButton.addEventListener('click', everything);


// ラジオボタン「作業中」によるソート
const workButton = document.getElementById('workButton');
workButton.addEventListener('click', () => {
    // ソート用配列の初期化
    everything();

    // 「作業中」以外の要素（完了ボタン）のみ抽出
    const inactiveTodo = todoArray.filter(x => !x.status); // status:true のものだけ抽出
    sortArray.push(inactiveTodo);

    // 「作業中」のみ表示させる
    if(inactiveTodo) {
        createTodos(sortArray[0]);
        displayTodos(sortArray[0]);
    }
});


// ラジオボタン「完了」によるソート 
const completeButton = document.getElementById('completeButton');
completeButton.addEventListener('click', () => {
    // ソート用配列の初期化
    everything();

    // 「完了」以外の要素（作業中ボタン）のみ抽出
    const inactiveTodo = todoArray.filter(x => x.status);
    sortArray.push(inactiveTodo);

    // 「完了」のみ表示させる
    if(inactiveTodo) {
        createTodos(sortArray[0]);
        displayTodos(sortArray[0]);
    }
});
