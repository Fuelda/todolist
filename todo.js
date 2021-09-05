"use strict";

let todoArray = [];
let active = [];
let completed = [];
let i = 0;
let mode = "all";

const test = document.querySelector("#list"); //煩雑だったら("#list")
// const test = $("#list"); <list情報以外も表示される

//リストにobject追加
function addTodo() {
  let object = { content: $("#todo").val(), check: false, id: i };
  todoArray.push(object);
  console.log(todoArray);
  i += 1;
}

//HTMLにリスト表示
function makeList(list) {
  $("#list").empty();
  list.forEach((element) => {
    $(
      `<li id=list${element.id} class=${
        element.check ? "checked" : "" //線引く用
      }><input type="checkbox" class="done" onChange="checkTrue(this)"   ${
        element.check ? "checked" : "" //決定押してもチェック維持
      }><input type="button" value="x" onClick="removeTodo(this)"></input></li>`
    )
      .append(element.content)
      .appendTo("#list");
  });
}

//modeをmakeListに反映
function changeView() {
  switch (mode) {
    case "all":
      makeList(todoArray);
      break;
    case "active":
      makeList(active);
      break;
    case "completed":
      makeList(completed);
      break;
  }
}

//checkボタン押されたとき
function checkTrue() {
  todoArray.forEach((element) => {
    element.check = $(`#list${element.id}`).children("input").prop("checked");
    midline(element);
  });
  newArray();
  leftNum();
  showClearButton();
  changeView();
  console.log(todoArray);
}

//線引く
function midline(element) {
  if (element.check === true) {
    $(`#list${element.id}`).addClass("checked");
  } else {
    $(`#list${element.id}`).removeClass("checked");
  }
}

//xボタンで要素消す
function removeTodo(obj) {
  // list id の前4文字(list)を消す
  const listID = obj.parentNode.id.slice(4)
  todoArray = todoArray.filter((element) => element.id !== Number(listID));
  newArray();
  changeView();
  leftNum();
}

//todoArray空ならoptionを消す
function optionDelete() {
  if (!todoArray.length) {
    $(".option").hide();
    $("#clearCompleted").hide();
  }
}

//配列切り替え
function newArray() {
  completed = todoArray.filter((element) => element.check === true);
  active = todoArray.filter((element) => element.check === false);
}

//残りactive表示
function leftNum() {
  $("#left").empty();
  $("#left").append(`${active.length} item left`);
}

//全てactiveに
function allselect() {
  if ($("#allselect").prop("checked") === true) {
    todoArray.forEach((element) => {
      element.check = true;
      midline(element);
    });
  } else {
    todoArray.forEach((element) => {
      element.check = false;
    });
  }
  newArray();
}

// 決定ボタン押した時
$("#decide").on("click", (event) => {
  event.preventDefault();
  addTodo();
  newArray();
  changeView();
  leftNum();
  $(".option").show();
  console.log(test);
});

//activeボタンを押した時
$("#active").on("click", (event) => {
  event.preventDefault();
  mode = "active";
  changeView();
  console.log(mode);
  console.log(test);
});

//completedボタンを押した時
$("#completed").on("click", (event) => {
  event.preventDefault();
  mode = "completed";
  changeView();
  console.log(mode);
});

//allボタンを押した時
$("#all").on("click", (event) => {
  event.preventDefault();
  mode = "all";
  changeView();
  console.log(mode);
  console.log(test);
});

//allselectボタンを押した時
$("#allselect").on("change", (event) => {
  event.preventDefault();
  allselect();
  changeView();
  leftNum();
  showClearButton();
});

//一つでもcompletedあったらclearCompleted出す
function showClearButton() {
  let flag = false
  todoArray.forEach((element) => {
    if (element.check === true) {
      flag = true
    }
  });
  if(flag) {
    $("#clearCompleted").show();
  } else {
    $("#clearCompleted").hide();
  }
}

//clearCompletedボタン押した時
$("#clearCompleted").on("click", (event) => {
  todoArray = active;
  completed = []
  makeList(todoArray);
  optionDelete();
  $("#allselect").prop("checked", false);
  console.log(todoArray);
});
