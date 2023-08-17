const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;

app.set('view engine', 'ejs');  //EJSをテンプレートエンジンとして設定
app.set('views', __dirname + '/views'); //テンプレートファイルの場所
app.use(express.static('public')); //staticディレクトリ内のファイルを静的ファイルとして認識
app.use(bodyParser.urlencoded({extended: true}));//リクエストオブジェクトのフォームのbody部分を解析。extend:trueでより柔軟にデータを扱える
// app.use(bodyParser.json()); //bodyをjsonで扱う


// TodoListを格納する配列
todoSet = new Set();
app.get('/', (req, res) => {
    res.render('index');
})

app.post('/', (req, res) => {

    // なにも選択されずにdeleteボタンを押したとき
    deleteError = null;
    // 押されたボタンのvalueの値を取得
    const buttonType = req.body.b;

    if(buttonType === 'insert') {
        //入力された値を取得
        let todo = req.body.name;
        todoSet.add(todo);

    }else if(buttonType === 'delete') {
        // チェックがつけられたinput:checkbox要素のvalueをすべて取得
        let checkedTodo = req.body.todo;
        // 取得した値が複数あったか
        if(Array.isArray(checkedTodo)) {
            // 取得したvalue値を持つ要素を一つずつtodoSetから削除
            checkedTodo.forEach(element => {
                todoSet.delete(element);
            });
        }else if(typeof checkedTodo !== 'undefined'){
            // 取得した値が一つだった時,取得したvalue値を持つ要素をtodoSetから削除
            todoSet.delete(checkedTodo);
            console.log(checkedTodo);
        }else {
            deleteError = '要素が選択されていません';
            console.log('要素が選択されていません');
        }
        // console.log(typeof checkedTodo);

        // console.log(todoSet);

    }
    res.render('index', {data: todoSet, error: deleteError});
})
app.listen(PORT, () => {
    console.log('サーバーを起動しました');
})