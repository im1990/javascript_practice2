'use strict';

// ---------------------------------------------------------
// 　グローバル変数
// ---------------------------------------------------------
const todoArray = []; // リストを格納する配列　

const TaskObj = function (task, status) {  
    this.task = task;      
    this.status = status;  
}

// --------------------------------------------------------
// 【createToggleBtn】
// 　作業中/完了ボタンを生成する関数
// [引数]
//    index: 配列のインデックス 
//    array: 対象の配列
// [戻り値]
//    toggleBtn: タスクの「作業中」と「完了」を切り替えるボタン
// ---------------------------------------------------------
const createToggleBtn = (index, array) => {
    // ボタンを生成（リスト生成時）
    const toggleBtn = document.createElement('button');
    if(!array[index].status) { // status = falseのとき
        toggleBtn.textContent = '作業中';
    } else { // status = trueのとき
        toggleBtn.textContent = '完了';
    }
    
    // クリックイベント：「作業中」⇔「完了」
    toggleBtn.addEventListener('click', e => { 
        const currentID = parseInt(e.target.parentElement.parentElement.firstElementChild.textContent);
        if (!array[currentID].status) {
            e.target.textContent = '完了';
            array[currentID].status = true;
        } else {
            e.target.textContent = '作業中';
            array[currentID].status = false;
        }             
        displayTodos(array);
    });
    return toggleBtn;
}

// ---------------------------------------------------------
// 【createDeleteBtn】
// 　削除ボタンを生成する関数
// [引数]
// 　array: 通常はtodoArray、ソート中はtodoArrayとactiveTodo
// [戻り値]
// 　deleteBtn: 削除ボタン
// ---------------------------------------------------------
const createDeleteBtn = array => {
    // ボタンを生成
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除'

    // クリックイベント：リストの削除
    deleteBtn.addEventListener('click', e => {
        const currentID = parseInt(e.target.parentElement.parentElement.firstElementChild.textContent);

        if(array === todoArray){ // 通常時
            todoArray.splice(currentID, 1);
        } else { // ソート時
            array.splice(currentID, 1);
            todoArray.splice(currentID, 1);
        }
        
        //配列の再生成
        createTodos(array);
        displayTodos(array);
    });
    return deleteBtn;
}

// ---------------------------------------------------------
// 【createTodos】
//  TO DO LISTを生成する関数
// [引数]
//   array: 対象の配列
// [戻り値]
// 　なし（グローバル変数を操作）
// ---------------------------------------------------------
const createTodos = array => {
    const status = false;
    const text = input.value;

    // 新しいオブジェクトを生成して配列に入れる
    if(text) {
        const newTaskObj = new TaskObj(text, status);
        array.push(newTaskObj);
    }

    // インデックスを割り振る
    array.forEach((todo, index) => {
        todo.id = index;
    });
}

// --------------------------------------------------------- 
// 【displayTodos】
//  TO DO LISTを表示させる関数
// [引数]
//  indicatedArray: 対象の配列(todoArray/activeTodo)
// [戻り値]
//  なし
// --------------------------------------------------------- 
const displayTodos = indicatedArray => {
    // リストエリアの初期化
    const lists = document.querySelector('#list');
    lists.textContent = '';

    indicatedArray.forEach((task, index) => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');

        // td1 : ID表示
        td1.innerHTML = index;

        // td2 : やること表示
        td2.innerHTML = task.task;

        // td3 : ボタン表示
        const toggleButton = createToggleBtn(index, indicatedArray);
        const deleteButton = createDeleteBtn(indicatedArray);
        td3.appendChild(toggleButton);
        td3.appendChild(deleteButton);

        // td1, td2, td3をtrにネストする
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        lists.appendChild(tr);
    });
}

// --------------------------------------------------------- 
// 【addList】
// TO DO LISTを追加する関数
// [引数]
//  なし
// [戻り値]
// 　なし（グローバル変数(オブジェクト)を操作）
// --------------------------------------------------------- 
const addList = function() {
    const taskinput = document.querySelector('#input');
    const task = taskinput.value;

    // タスクを追加
    if(task) {
        createTodos(todoArray);
    }

    // タスクを表示
    displayTodos(todoArray);

    // inputをクリア
    taskinput.value = '';
}

// 「追加」ボタンをクリックするとリスト追加
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', addList);

// クリックするとリスト追加
input.addEventListener('keypress', e => {
  if(e.key === 'Enter') {
    addList();
  }
});

// --------------------------------------------------------- 
// 　ラジオボタンを押したときの処理：「すべて」
// --------------------------------------------------------- 
const everything = () => {
    createTodos(todoArray);
    displayTodos(todoArray);
}
const everyButton = document.getElementById('everyButton');
everyButton.addEventListener('click', everything);

// --------------------------------------------------------- 
// 　ラジオボタンを押したときの処理：「作業中」
// --------------------------------------------------------- 
const workButton = document.getElementById('workButton');
workButton.addEventListener('click', () => {
    // ソート用配列の初期化
    everything();

    // 「作業中」のみ抽出
    const activeTodo = todoArray.filter(x => !x.status); // status:false のものだけ抽出
 
    // 「作業中」のみ表示させる
    if(activeTodo) {
        createTodos(activeTodo);
        displayTodos(activeTodo);
    }
});

// --------------------------------------------------------- 
// 　ラジオボタンを押したときの処理：「完了」
// --------------------------------------------------------- 
const completeButton = document.getElementById('completeButton');
completeButton.addEventListener('click', () => {
    // ソート用配列の初期化
    everything();

    // 「完了」のみ抽出
    const activeTodo = todoArray.filter(x => x.status); // status:true のものだけ抽出

    // 「完了」のみ表示させる
    if(activeTodo) {
        createTodos(activeTodo);
        displayTodos(activeTodo);
    }
});