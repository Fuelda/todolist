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
  $.each(list, (index, element) => {
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
function show() {
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
function checkTrue(obj) {
  todoArray.forEach((element) => {
    element.check = $(`#list${element.id}`).children("input").prop("checked");
    midline(element);
  });

  /*
  const listID = obj.parentNode.id.slice(4);
  todoArray[listID].check = $(`#list${listID}`)
    .children("input")
    .prop("checked");
  */
  newArray();
  leftNum();
  clearButton();
  show();
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
  const listID = obj.parentNode.id.slice(4);
  console.log(listID);
  todoArray = todoArray.filter((element) => element.id != Number(listID));
  newArray();
  show();
  leftNum();
}

//チェック付きを消す
function clearCompleted() {
  $.each(todoArray, (index, element) => {
    if (element.check === true) {
      todoArray = active;
    }
    makeList(todoArray);
  });
  optionDelete();
  $("#allselect").prop("checked", false);
  console.log(todoArray);
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
  show();
  leftNum();
  $(".option").show();
  console.log(test);
});

//activeボタンを押した時
$("#active").on("click", (event) => {
  event.preventDefault();
  mode = "active";
  show();
  console.log(mode);
  console.log(test);
});

//completedボタンを押した時
$("#completed").on("click", (event) => {
  event.preventDefault();
  mode = "completed";
  show();
  console.log(mode);
});

//allボタンを押した時
$("#all").on("click", (event) => {
  event.preventDefault();
  mode = "all";
  show();
  console.log(mode);
  console.log(test);
});

//allselectボタンを押した時
$("#allselect").on("change", (event) => {
  event.preventDefault();
  allselect();
  show();
  leftNum();
  clearButton();
});

//一つでもcompletedあったらclearCompleted出す
function clearButton() {
  $.each(todoArray, (index, element) => {
    if (element.check === true) {
      $("#clearCompleted").show();
      return false;
    } else {
      $("#clearCompleted").hide();
    }
  });
}

//clearCompletedボタン押した時
$("#clearCompleted").on("click", (event) => {
  clearCompleted();
});
