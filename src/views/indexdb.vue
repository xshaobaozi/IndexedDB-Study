<script lang="ts">
const enum DBTable {
  Version = 1,
  User = "User",
  Person = "Person",
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
export default {
  setup() {
    const handleCreateDB = () => {
      const request = indexedDB.open(DBTable.User, 1);
      request.addEventListener(HandleEvent.Success, (e) => {
        console.log(Message.Create);
      });
      request.addEventListener(HandleEvent.Error, (e) => {
        console.log(Message.Error);
      });
    };
    const handleCreateStore = () => {
      const request = indexedDB.open(DBTable.User, 2);
      request.addEventListener(HandleEvent.Upgradeneeded, (e: any) => {
        console.log(HandleEvent.Upgradeneeded, e);
        const db = e.target.result;
        const store = db.createObjectStore(DBTable.Person, {
          keyPath: "userId",
          autoIncrement: false,
        });
        store.createIndex("name", "name", { unique: true });
        store.createIndex("isMen", "isMen", { unique: false });
        store.createIndex("age", "age", { unique: false });
        store.createIndex("weight", "weight", { unique: false });
        console.info(`设置keyPath: userId`);
      });
    };
    const handleAdd = (id: number) => {
      const request = indexedDB.open(DBTable.User, 2);
      request.addEventListener(HandleEvent.Success, (e: any) => {
        console.log(Message.Success);
        const db = e.target.result;
        const tx = db.transaction(DBTable.Person, "readwrite");
        const store = tx.objectStore(DBTable.Person);
        let reqAdd;
        if (id === 1) {
          reqAdd = store.add({ userId: id, ...mock1 });
        }
        if (id === 2) {
          reqAdd = store.add({ userId: id, ...mock2 });
        }
        if (id === 3) {
          reqAdd = store.add({ userId: id, ...mock3 });
        }
        reqAdd.addEventListener(HandleEvent.Success, () => {
          console.log("reqAdd.addEventListener", Message.Create);
        });
      });
      request.addEventListener(HandleEvent.Error, (e) => {
        console.log(Message.Error);
      });
    };
    const handleReview = () => {
      const request = indexedDB.open(DBTable.User, 2);
      request.addEventListener(HandleEvent.Success, (e: any) => {
        console.log(Message.Success);
        const db = e.target.result;
        const tx = db.transaction(DBTable.Person, "readonly");
        const store = tx.objectStore(DBTable.Person);
        const res = store.get(1);
        res.addEventListener(HandleEvent.Success, (e: any) => {
          console.log(`获取id：${1}成功`, e.target.result);
        });
      });
    };
    const hadnleDelete = () => {
      const request = indexedDB.open(DBTable.User, 2);
      request.addEventListener(HandleEvent.Success, (e: any) => {
        console.log(HandleEvent.Success, e);
        const db = e.target.result;
        const tx = db.transaction(DBTable.Person, "readwrite");
        const store = tx.objectStore(DBTable.Person);
        const res = store.delete(1);
        console.log(`正在删除id: ${1}...`);
        res.addEventListener(HandleEvent.Success, () => {
          console.log(`删除id: ${1}成功`);
        });
      });
    };
    const handleUpdate = () => {
      const request = indexedDB.open(DBTable.User, 2);
      request.addEventListener(HandleEvent.Success, (e: any) => {
        console.log(HandleEvent.Success, e);
        const db = e.target.result;
        const tx = db.transaction(DBTable.Person, "readwrite");
        const store = tx.objectStore(DBTable.Person);
        const res = store.put({
          userId: 1,
          age: 20,
        });
        console.log(`正在更新id: ${1}...`);
        res.addEventListener(HandleEvent.Success, () => {
          console.log(`更新id: ${1}成功`);
        });
      });
    };
    const hadnleEach = () => {
      const request = indexedDB.open(DBTable.User, 2);
      request.addEventListener(HandleEvent.Success, (e: any) => {
        console.log(HandleEvent.Success, e);
        const db = e.target.result;
        const tx = db.transaction(DBTable.Person, "readwrite");
        const store = tx.objectStore(DBTable.Person);
        const res = store.openCursor();
        res.addEventListener(HandleEvent.Success, (e: any) => {
          const cursor = e.target.result;
          if (cursor && cursor.value) {
            console.log(cursor.value);
            cursor.continue();
          }
        });
      });
    };
    const handleIndex = (keyName: string, mode?: string) => {
      const request = indexedDB.open(DBTable.User, 2);
      request.addEventListener(HandleEvent.Success, (e: any) => {
        console.log(HandleEvent.Success, e);
        const db = e.target.result;
        const tx = db.transaction(DBTable.Person, "readwrite");
        const store = tx.objectStore(DBTable.Person);
        const index = store.index(keyName);
        let res;

        // 遍历多个需要结果Cursor
        if (keyName === "age") {
          if (mode === "all") {
            // get all
            const allReq = index.getAll(18);
            allReq.addEventListener(HandleEvent.Success, (e: any) => {
              console.log(e.target.result);
            });
            return;
          }
          // get one
          const req = index.openCursor(IDBKeyRange.only(18));
          req.addEventListener(HandleEvent.Success, (e: any) => {
            const cursor = e.target.result;
            if (cursor && cursor.value) {
              console.log(cursor.value);
              cursor.continue();
            }
          });
          return;
        }
        if (keyName === "weight") {
          const req = index.getAll(IDBKeyRange.bound(100, 200, false, false));
          req.addEventListener(HandleEvent.Success, (e: any) => {
            console.log(e.target.result);
          });
          return;
        }
        if (keyName === "name") {
          res = index.get("包包1");
        }
        if (keyName === "isMen") {
          res = index.get(true);
        }
        res.addEventListener(HandleEvent.Success, (e: any) => {
          const result = e.target.result;
          console.log(`查找索引${keyName} result:`, result);
        });
      });
    };
    return {
      handleCreateDB,
      handleCreateStore,
      handleAdd,
      handleReview,
      hadnleDelete,
      hadnleEach,
      handleIndex,
      handleUpdate,
    };
  },
};
</script>

<template>
  <div class="app">
    <button class="primary" @click="handleCreateDB">创建DB</button>
    <button class="primary" @click="handleCreateStore">链接Store</button>
    <button class="normal" @click="handleAdd(1)">添加1</button>
    <button class="normal" @click="handleAdd(2)">添加2</button>
    <button class="normal" @click="handleAdd(3)">添加3</button>
    <button class="normal" @click="handleReview">查看</button>
    <button class="delete" @click="hadnleDelete">删除</button>
    <button class="primary" @click="hadnleEach">遍历</button>
    <button class="primary" @click="handleIndex('name')">索引name</button>
    <button class="primary" @click="handleIndex('isMen')">索引isMen</button>
    <button class="primary" @click="handleIndex('age')">索引age</button>
    <button class="primary" @click="handleIndex('weight')">索引weight</button>
    <button class="primary" @click="handleIndex('age', 'all')">
      索引age all
    </button>
    <button class="primary" @click="hadnleEach">遍历</button>
    <button @click="handleUpdate">更新</button>
  </div>
</template>

<style lang="scss" scoped>
@import "./../scss/index.scss";
</style>
