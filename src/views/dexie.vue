<script lang="ts">
import { handleError } from "@vue/runtime-core";
const enum DBTable {
  Version = 1,
  User = "dexUser",
  Person = "DexPerson",
}
const enum HandleEvent {
  Success = "success",
  Error = "error",
  Upgradeneeded = "upgradeneeded",
  Complete = "complete",
}
const enum Message {
  Success = "连接成功",
  Error = "连接失败",
  Create = "创建成功",
}
const mock1 = {
  name: "包包1",
  isMen: true,
  age: 18,
  weight: 100,
};
const mock2 = {
  name: "包包2",
  isMen: true,
  age: 18,
  weight: 200,
};
const mock3 = {
  name: "包包3",
  isMen: false,
  age: 19,
  weight: 300,
};
import Dexie from "dexie";
export default {
  setup() {
    const handleCreateDB = () => {
      const db: any = new Dexie(DBTable.User);
      db.version(1).stores({
        [DBTable.Person]: "++userId,name,isMen,age,weight",
      });
      const person = db[DBTable.Person];
      person
        .add(mock1)
        .then(() => {
          person.add(mock2);
        })
        .then(() => {
          person.add(mock3);
        });
    };
    const hadnleReview = () => {
      const db: any = new Dexie(DBTable.User);
      db.version(1).stores({
        [DBTable.Person]: "++userId,name,isMen,age,weight",
      });
      const person = db[DBTable.Person];
      person
        .where("weight")
        .between(100, 200, true, true)
        .toArray()
        .then((res) => {
          console.log(res);
        });
      // db.transaction('rw', [])
      // const res = person
      // res.where("weight").between(100, 200, true, true).toArray();
      // console.log(res);
    };

    return {
      handleCreateDB,
      hadnleReview,
    };
  },
};
</script>

<template>
  <div class="app">
    <button class="primary" @click="handleCreateDB">创建并初始化</button>
    <button class="primary" @click="hadnleReview('weight')">索引weight</button>
    <!-- <button class="normal" @click="handleAdd(1)">添加1</button> -->
    <!-- <button class="normal" @click="handleAdd(2)">添加2</button> -->
    <!-- <button class="normal" @click="handleAdd(3)">添加3</button> -->
    <!-- <button class="normal" @click="handleReview">查看</button> -->
    <!-- <button class="delete" @click="hadnleDelete">删除</button> -->
    <!-- <button class="primary" @click="hadnleEach">遍历</button> -->
    <!-- <button class="primary" @click="handleIndex('name')">索引name</button> -->
    <!-- <button class="primary" @click="handleIndex('isMen')">索引isMen</button> -->
    <!-- <button class="primary" @click="handleIndex('age')">索引age</button> -->
    <!-- <button class="primary" @click="handleIndex('weight')">索引weight</button> -->
    <!-- <button class="primary" @click="handleIndex('age', 'all')">
      索引age all
    </button> -->
    <!-- <button class="primary" @click="hadnleEach">遍历</button> -->
    <!-- <button @click="handleUpdate">更新</button> -->
  </div>
</template>

<style lang="scss" scoped>
@import "./../scss/index.scss";
</style>
